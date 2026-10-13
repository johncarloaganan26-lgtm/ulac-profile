const nodemailer = require('nodemailer');

// We intercept nodemailer transporter.sendMail to inspect the generated payload
let capturedEmails = [];

const originalCreateTransport = nodemailer.createTransport;
nodemailer.createTransport = function(...args) {
  return {
    sendMail: async function(mailOptions) {
      capturedEmails.push(mailOptions);
      return { messageId: 'mock-test-id' };
    }
  };
};

const contactHandler = require('../api/contact');

async function runVerification() {
  console.log('--- Verifying Ulacdev Contact Email Template ---');
  
  const testPayload = {
    name: 'dad <script>alert(1)</script>',
    email: 'dad@example.com',
    subject: 'General Inquiry & Project Estimate',
    message: 'Hello Ulacdev!\nThis is a test message to verify the clean minimalist email redesign.'
  };

  const req = {
    method: 'POST',
    body: testPayload
  };

  const res = {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(data) { return this; }
  };

  await contactHandler(req, res);

  const adminEmail = capturedEmails.find(e => e.subject && e.subject.includes('New System Inquiry'));
  if (!adminEmail) {
    console.error('❌ Failed: Admin notification email not found!');
    process.exit(1);
  }

  console.log('✅ Admin notification captured:');
  console.log('Subject:', adminEmail.subject);
  console.log('Reply-To:', adminEmail.replyTo);
  
  // HTML checks
  const html = adminEmail.html;
  const assertions = [
    { label: 'Branding Ulacdev', pass: html.includes('Ulacdev') },
    { label: 'Header Portfolio & Contact Form', pass: html.includes('Portfolio') && html.includes('Contact Form') },
    { label: 'Heading New System Inquiry', pass: html.includes('New System Inquiry') },
    { label: 'Subtitle text', pass: html.includes('You have received a new message from your portfolio contact form.') },
    { label: 'Label FROM', pass: html.includes('FROM') },
    { label: 'Escaped sender name and email', pass: html.includes('dad &lt;script&gt;alert(1)&lt;/script&gt;') && html.includes('&lt;dad@example.com&gt;') },
    { label: 'Label SUBJECT', pass: html.includes('SUBJECT') },
    { label: 'Escaped subject', pass: html.includes('General Inquiry &amp; Project Estimate') },
    { label: 'Label MESSAGE', pass: html.includes('MESSAGE') },
    { label: 'Escaped message content', pass: html.includes('Hello Ulacdev!') },
    { label: 'Reply button text with arrow', pass: html.includes('Reply directly to dad &lt;script&gt;alert(1)&lt;/script&gt; &rarr;') },
    { label: 'Reply button mailto link', pass: html.includes('href="mailto:dad@example.com?subject=') },
    { label: 'Automated note text', pass: html.includes('This message was sent from your portfolio contact form.') },
    { label: 'Footer text', pass: html.includes('Portfolio &bull; Projects &bull; Contact') && html.includes('All rights reserved.') }
  ];

  let allPassed = true;
  for (const a of assertions) {
    if (a.pass) {
      console.log(`  ✅ ${a.label}`);
    } else {
      console.error(`  ❌ FAILED: ${a.label}`);
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log('\n🎉 ALL 14 EMAIL TEMPLATE ASSERTIONS PASSED PERFECTLY!');
  } else {
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
