module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

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
    return res.status(200).json({ total, active });
  } catch (err) {
    console.error('Error fetching github contributions:', err);
    return res.status(200).json({ total: 112, active: [] });
  }
};
