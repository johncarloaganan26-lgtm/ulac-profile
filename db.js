const { Pool } = require('pg');

let pool = null;
let ready = false;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set. Neon connection string is required.');
    }
    pool = new Pool({ connectionString });
    pool.on('error', (err) => {
      console.error('Neon pool error:', err);
      ready = false;
    });
  }
  return pool;
}

async function query(sql, params = []) {
  const pg = getPool();
  const start = Date.now();
  try {
    const { rows } = await pg.query(sql, params);
    ready = true;
    return rows;
  } finally {
    console.log(`[db] ${sql.split(' ')[0]} (${Date.now() - start}ms)`);
  }
}

async function initSchema() {
  await query(`
    CREATE TABLE IF NOT EXISTS site_stats (
      id INTEGER PRIMARY KEY,
      views_count INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT DEFAULT '',
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      is_approved BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at DESC)`);
  await query(`CREATE INDEX IF NOT EXISTS idx_testimonials_created ON testimonials(created_at DESC)`);

  await query(`INSERT INTO site_stats (id, views_count, updated_at) VALUES (1, 0, NOW()) ON CONFLICT (id) DO NOTHING`);
  ready = true;
}

module.exports = {
  query,
  initSchema,

  createInquiry: async ({ name, email, subject, message }) => {
    const rows = await query(
      `INSERT INTO inquiries (name, email, subject, message, status) VALUES ($1, $2, $3, $4, 'Pending') RETURNING id, name, email, subject, message, status, created_at`,
      [name, email, subject, message]
    );
    return rows[0];
  },

  getInquiries: async () => {
    return query(`SELECT id, name, email, subject, message, status, created_at FROM inquiries ORDER BY created_at DESC`);
  },

  deleteInquiry: async (id) => {
    const rows = await query(`DELETE FROM inquiries WHERE id = $1 RETURNING id`, [id]);
    return rows.length > 0;
  },

  createTestimonial: async ({ name, email, role, content, rating }) => {
    const rows = await query(
      `INSERT INTO testimonials (name, email, role, content, rating, is_approved) VALUES ($1, $2, $3, $4, $5, FALSE) RETURNING id, name, email, role, content, rating, is_approved, created_at`,
      [name, email, role || '', content, rating || 5]
    );
    return rows[0];
  },

  getTestimonials: async () => {
    return query(`SELECT id, name, email, role, content, rating, is_approved, created_at FROM testimonials ORDER BY created_at DESC`);
  },

  getApprovedTestimonials: async () => {
    return query(`SELECT id, name, email, role, content, rating, created_at FROM testimonials WHERE is_approved = TRUE ORDER BY created_at DESC`);
  },

  toggleTestimonialApproval: async (id) => {
    const rows = await query(
      `UPDATE testimonials SET is_approved = NOT is_approved, updated_at = NOW() WHERE id = $1 RETURNING id, is_approved`,
      [id]
    );
    return rows.length > 0 ? rows[0].is_approved : null;
  },

  deleteTestimonial: async (id) => {
    const rows = await query(`DELETE FROM testimonials WHERE id = $1 RETURNING id`, [id]);
    return rows.length > 0;
  },

  siteStats: async () => {
    const rows = await query(`SELECT views_count FROM site_stats WHERE id = 1`);
    return rows.length > 0 ? rows[0].views_count : 0;
  },

  incrementViews: async () => {
    await query(`UPDATE site_stats SET views_count = views_count + 1, updated_at = NOW() WHERE id = 1`);
    return query(`SELECT views_count FROM site_stats WHERE id = 1`).then((rows) => rows.length > 0 ? rows[0].views_count : 0);
  },

  isReady: () => ready,
};
