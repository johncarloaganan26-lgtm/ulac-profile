const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Reuse the contact logic
const contactHandler = require('./api/contact');
app.post('/api/contact', contactHandler);

// View Counter Persistence
const VIEWS_FILE = path.join(__dirname, 'views.txt');

app.get('/api/views', (req, res) => {
  let count = 0;
  try {
    if (fs.existsSync(VIEWS_FILE)) {
      count = parseInt(fs.readFileSync(VIEWS_FILE, 'utf8')) || 0;
    }
  } catch (e) { console.error('Error reading views:', e); }

  count++;
  
  try {
    fs.writeFileSync(VIEWS_FILE, count.toString());
  } catch (e) { console.error('Error saving views:', e); }

  res.json({ views: count });
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
  console.log(`Server is running on port ${port}`);
  console.log(`Contact API is available at http://localhost:${port}/api/contact`);
});
