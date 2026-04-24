const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Reuse the contact logic
const contactHandler = require('./api/contact');
const testimonialHandler = require('./api/testimonial-thanks');
const approvalHandler = require('./api/testimonial-approved');
app.post('/api/contact', contactHandler);
app.post('/api/testimonial-thanks', testimonialHandler);
app.post('/api/testimonial-approved', approvalHandler);

// View Counter Persistence
const VIEWS_FILE = path.join(__dirname, 'views.txt');

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

app.listen(port, () => {
  console.log(`🚀 BACKEND ALIVE: Server is running on port ${port}`);
  console.log(`📧 Contact API: http://localhost:${port}/api/contact`);
  console.log(`📧 Testimonial API: http://localhost:${port}/api/testimonial-thanks`);
});
