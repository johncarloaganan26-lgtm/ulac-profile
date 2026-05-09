const fs = require('fs');
const dotenv = require('dotenv');

// Load env vars
const envConfig = dotenv.parse(fs.readFileSync('.env'));

const GROQ_API_KEY = envConfig.REACT_APP_GROQ_KEY;

async function testGroq() {
  console.log('Testing Groq API key:', GROQ_API_KEY);
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 10,
        temperature: 0.7
      })
    });
    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

testGroq();
