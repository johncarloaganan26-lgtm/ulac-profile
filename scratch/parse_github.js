const https = require('https');

https.get('https://github.com/users/Ulacdev/contributions', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const totalMatch = data.match(/([0-9,]+)\s+contributions\s+in the last year/i);
    const total = totalMatch ? totalMatch[1] : 'unknown';
    console.log('TOTAL:', total);

    // Look for: data-date="...", id="contribution-day-component-ROW-COL", data-level="..."
    // Also tool-tip contains: "X contribution(s) on ..."
    const cellRegex = /<td[^>]*?data-date="([^"]+)"[^>]*?id="contribution-day-component-(\d+)-(\d+)"[^>]*?data-level="(\d+)"/g;
    let match;
    const active = [];
    let maxCol = 0;
    let maxRow = 0;
    while ((match = cellRegex.exec(data)) !== null) {
      const date = match[1];
      const row = parseInt(match[2], 10);
      const col = parseInt(match[3], 10);
      const level = parseInt(match[4], 10);
      if (col > maxCol) maxCol = col;
      if (row > maxRow) maxRow = row;
      if (level > 0) {
        active.push({ col, row, level, date });
      }
    }
    console.log('Max col:', maxCol, 'Max row:', maxRow);
    console.log('Active cells:', active);
  });
}).on('error', err => console.error(err));
