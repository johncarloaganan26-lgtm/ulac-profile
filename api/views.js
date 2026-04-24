const fs = require('fs');
const path = require('path');

const VIEWS_FILE = path.join('/tmp', 'views.txt'); // Use /tmp for writable storage on serverless

module.exports = async (req, res) => {
  try {
    // Using CounterAPI.dev for persistent global views across all devices/instances
    const response = await fetch('https://api.counterapi.dev/v1/johncarlo-portfolio/views/up');
    const data = await response.json();
    
    // Fallback if API fails
    if (data && data.count !== undefined) {
      res.json({ views: data.count });
    } else {
      throw new Error('Invalid response from CounterAPI');
    }
  } catch (e) {
    console.error('Error with global views:', e);
    // Return a dummy value instead of failing
    res.json({ views: 0 });
  }
};
