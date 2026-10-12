const { Pool } = require('pg');

const DEFAULT_LIMIT = 50;

let pool = null;
let poolReady = false;
let poolError = null;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set. Neon Postgres connection string is required.');
    }
    pool = new Pool({ connectionString });
    pool.on('error', (err) => {
      console.error('Neon Postgres pool error:', err);
      poolError = err;
    });
  }
  return pool;
}

function sanitizeText(val) {
  if (val == null) return '';
  return String(val).slice(0, 200000);
}

async function query(sql, params = []) {
  const pg = getPool();
  const start = Date.now();
  try {
    const { rows, rowCount } = await pg.query(sql, params);
    return { rows, rowCount };
  } finally {
    console.log(`[chat] query ${sql.split(' ')[0]} (${Date.now() - start}ms)`);
  }
}

async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      sessionid TEXT NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      metadata JSONB DEFAULT '{}',
      timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(sessionid)`);
  poolReady = true;
}

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Lazy-connect on first real request so the server can start even if Neon is
  // temporarily unavailable. If the pool is unhealthy, fail fast with a clear
  // log line instead of crashing the Express server.
  if (!poolReady && poolError) {
    console.error('Neon Postgres is unavailable, chat API will return 500 until it recovers.');
  }

  if (req.method === 'GET') {
    const { sessionId, limit = DEFAULT_LIMIT, offset = 0 } = req.query;

    let sql = 'SELECT id, sessionid, role, content, metadata, timestamp FROM chat_messages';
    const params = [];

    if (sessionId) {
      sql += ' WHERE sessionid = $1';
      params.push(sessionId);
    }

    const paramOffset = params.length + 1;
    const paramLimit = params.length + 2;
    sql += ` ORDER BY timestamp ASC LIMIT $${paramLimit} OFFSET $${paramOffset}`;
    params.push(parseInt(limit, 10) || DEFAULT_LIMIT, parseInt(offset, 10) || 0);

    try {
      const { rows, rowCount } = await query(sql, params);
      const total = rowCount != null ? rowCount : rows.length;
      return res.status(200).json({
        messages: rows,
        total,
        hasMore: (parseInt(offset, 10) || 0) + (parseInt(limit, 10) || DEFAULT_LIMIT) < total,
      });
    } catch (err) {
      console.error('Failed to fetch chat history:', err);
      return res.status(500).json({ message: 'Failed to load chat history' });
    }
  }

  if (req.method === 'POST') {
    const { sessionId, role, content, metadata } = req.body;

    if (!sessionId || !role || !content) {
      return res.status(400).json({
        message: 'Missing required fields: sessionId, role, content',
      });
    }

    if (!['user', 'assistant', 'system'].includes(role)) {
      return res.status(400).json({
        message: 'Invalid role. Must be: user, assistant, or system',
      });
    }

    const id = newId();
    const timestamp = new Date().toISOString();

    try {
      const { rows } = await query(
        `INSERT INTO chat_messages (id, sessionid, role, content, metadata, timestamp)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING id, sessionid, role, content, metadata, timestamp`,
        [id, sessionId, role, sanitizeText(content), JSON.stringify(metadata || {})]
      );

      return res.status(201).json({ message: rows[0] });
    } catch (err) {
      console.error('Failed to save chat message:', err);
      return res.status(500).json({ message: 'Failed to save chat message' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
};
