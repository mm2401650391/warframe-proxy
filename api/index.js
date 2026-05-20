const TARGET = 'https://api.warframestat.us/pc';

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(204).end();
  }

  try {
    const response = await fetch(TARGET, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Target HTTP ' + response.status);
    }

    const body = await response.text();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body);
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(502).json({ error: 'Proxy failed', message: err.message });
  }
};
