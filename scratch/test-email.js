require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Testing SMTP connection with:');
console.log('User:', process.env.SMTP_USER);
console.log('Pass configured:', !!process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function runTest() {
  try {
    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('✅ SMTP Server Connection Verified Successfully!');

    console.log('Sending test email to', process.env.SMTP_USER);
    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'Test Email from Portfolio Nodemailer',
      text: 'If you see this email, your Google App Password and SMTP setup are working 100%!',
    });
    console.log('✅ Test email sent successfully! Message ID:', info.messageId);
  } catch (err) {
    console.error('❌ SMTP Error:', err);
  }
}

runTest();
