// Vercel Serverless Function for Groq Chat API
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Debug: Check if API key exists
  const apiKey = process.env.REACT_APP_GROQ_KEY || process.env.GROQ_API_KEY;
  console.log('API Key exists:', !!apiKey);
  console.log('API Key length:', apiKey ? apiKey.length : 0);

  if (!apiKey) {
    return res.status(500).json({ 
      error: 'GROQ API key not configured',
      debug: 'Environment variables not found'
    });
  }

  try {
    console.log('Making request to Groq API...');
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)
    });
    
    console.log('Groq API response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', errorData);
      return res.status(response.status).json(errorData);
    }
    
    const data = await response.json();
    console.log('Groq API success');
    res.status(200).json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      error: 'Failed to process chat request',
      details: error.message 
    });
  }
}
