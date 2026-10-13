require('dotenv').config();
const contactHandler = require('../api/contact');

// Mock req and res objects
const req = {
  method: 'POST',
  body: {
    name: 'Guest Tester',
    email: 'johncarloaganan26@gmail.com', // Sending to yourself so you can see both emails in your inbox
    subject: 'Automated Guest Inquiry Test',
    message: 'Hello John Carlo! This is a test inquiry to confirm the dual email auto-reply works.'
  }
};

const res = {
  statusCode: 200,
  headers: {},
  setHeader(k, v) { this.headers[k] = v; },
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(data) {
    console.log(`Response [${this.statusCode}]:`, data);
    return this;
  }
};

async function test() {
  console.log('--- Triggering api/contact handler ---');
  await contactHandler(req, res);
  console.log('--- Finished test ---');
}

test();
