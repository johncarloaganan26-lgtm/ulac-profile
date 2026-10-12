const http = require('http');

async function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5001,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function test() {
  console.log('Testing /api/chat-history...\n');

  // Test POST - save message
  console.log('1. POST /api/chat-history (save message)');
  const postRes = await request('POST', '/api/chat-history', {
    sessionId: 'test-session-1',
    role: 'user',
    content: 'Hello, this is a test message',
    metadata: { source: 'test-script' }
  });
  console.log(`   Status: ${postRes.status}`);
  console.log(`   Response:`, JSON.stringify(postRes.body, null, 2));

  // Test POST - save assistant reply
  console.log('\n2. POST /api/chat-history (save assistant reply)');
  await request('POST', '/api/chat-history', {
    sessionId: 'test-session-1',
    role: 'assistant',
    content: 'Hi there! How can I help you?'
  });

  // Test GET - fetch messages
  console.log('\n3. GET /api/chat-history?sessionId=test-session-1');
  const getRes = await request('GET', '/api/chat-history?sessionId=test-session-1');
  console.log(`   Status: ${getRes.status}`);
  console.log(`   Messages:`, JSON.stringify(getRes.body, null, 2));

  // Test GET - non-existent session
  console.log('\n4. GET /api/chat-history?sessionId=non-existent');
  const emptyRes = await request('GET', '/api/chat-history?sessionId=non-existent');
  console.log(`   Status: ${emptyRes.status}`);
  console.log(`   Response:`, JSON.stringify(emptyRes.body, null, 2));

  console.log('\n✅ Tests complete');
}

test().catch(console.error);