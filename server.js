const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = parseInt(process.env.PORT, 10) || 5001;

app.use(cors());
app.use(express.json());

// Reuse the contact logic
const contactHandler = require('./api/contact');
const testimonialHandler = require('./api/testimonial-thanks');
const approvalHandler = require('./api/testimonial-approved');
const chatHistoryHandler = require('./api/chat');
app.post('/api/contact', contactHandler);
app.post('/api/testimonial-thanks', testimonialHandler);
app.post('/api/testimonial-approved', approvalHandler);
app.post('/api/chat-history', chatHistoryHandler);
app.get('/api/chat-history', chatHistoryHandler);

// Admin APIs backed by Neon Postgres (dashboard, inquiries, testimonials, views)
const adminHandler = require('./api/admin');
app.use('/api/admin', adminHandler);

// View Counter Persistence
const VIEWS_FILE = path.join(__dirname, 'views.txt');

let githubCache = { data: null, timestamp: 0 };
app.get('/api/github-contributions', async (req, res) => {
  const now = Date.now();
  if (githubCache.data && now - githubCache.timestamp < 10 * 60 * 1000) {
    return res.json(githubCache.data);
  }
  try {
    const response = await fetch('https://github.com/users/Ulacdev/contributions');
    const html = await response.text();
    const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in the last year/i);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ''), 10) : 112;

    const cellRegex = /<td[^>]*?data-date="([^"]+)"[^>]*?id="contribution-day-component-(\d+)-(\d+)"[^>]*?data-level="(\d+)"/g;
    let match;
    const active = [];
    while ((match = cellRegex.exec(html)) !== null) {
      const date = match[1];
      const row = parseInt(match[2], 10);
      const col = parseInt(match[3], 10);
      const level = parseInt(match[4], 10);
      if (level > 0) {
        active.push({ col, row, level, date });
      }
    }
    const result = { total, active };
    githubCache = { data: result, timestamp: now };
    res.json(result);
  } catch (err) {
    console.error('Failed to fetch github contributions:', err);
    res.json({ total: 112, active: [] });
  }
});

app.get('/api/views', async (req, res) => {
  try {
    const response = await fetch('https://api.counterapi.dev/v1/johncarlo-portfolio/views/up');
    const data = await response.json();
    res.json({ views: data.count || 0 });
  } catch (e) {
    console.error('Error with global views:', e);
    res.json({ views: 0 });
  }
});

// Serve static files from the React app (if built)
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ message: 'Static build files not found. Use npm start for frontend development.' });
  }
});

let server;
async function start() {
  try {
    const db = require('./db');
    await db.initSchema();
  } catch (err) {
    console.warn('Neon admin table check skipped:', err.message);
  }

  server = app.listen(port, () => {
    console.log(`[server] ADMIN API: http://localhost:${port}/api/admin/inquiries`);
    console.log(`[server] ADMIN API: http://localhost:${port}/api/admin/testimonials`);
    console.log(`[server] ADMIN API: http://localhost:${port}/api/admin/inquiries/:id`);
    console.log(`[server] ADMIN API: http://localhost:${port}/api/admin/testimonials/:id/approval`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  if (server) server.close();
  process.exit(0);
});
