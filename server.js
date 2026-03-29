const express = require('express');
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

// Serve static files from the React app (if built)
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // During local development, the 'build' folder might not exist yet
    // Respond with a simple message or 404
    res.status(404).json({ message: 'Static build files not found. Use npm start for frontend development.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Contact API is available at http://localhost:${port}/api/contact`);
});
