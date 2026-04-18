const fs = require('fs');
const path = require('path');

const VIEWS_FILE = path.join('/tmp', 'views.txt'); // Use /tmp for writable storage on serverless

module.exports = (req, res) => {
  let count = 0;
  try {
    if (fs.existsSync(VIEWS_FILE)) {
      count = parseInt(fs.readFileSync(VIEWS_FILE, 'utf8')) || 0;
    }
  } catch (e) {
    console.error('Error reading views:', e);
  }

  count++;

  try {
    fs.writeFileSync(VIEWS_FILE, count.toString());
  } catch (e) {
    console.error('Error saving views:', e);
  }

  res.json({ views: count });
};
