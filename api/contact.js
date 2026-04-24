const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;
  console.log(`Email Inquiry received from ${name} (${email}). Preparing to send...`);

  if (!name || !email || !subject || !message) {
    console.warn(`⚠️  Rejected inquiry: Missing fields from ${name || 'unknown'}`);
    return res.status(400).json({ message: 'Missing fields' });
  }

  console.log(`📨 Attempting to send Inquiry email to ${email}...`);

  // Configure transporter using SMTP credentials from .env
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send email to the contact owner (John Carlo)
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `Portfolio Inquiry: ${subject}`,
      html: `
        <div style="background-color: #f3f4f6; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">NEW SYSTEM INQUIRY</h1>
            </div>
            <div style="padding: 40px;">
              <div style="margin-bottom: 30px; border-bottom: 2px solid #f3f4f6; padding-bottom: 20px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: 700;">From</p>
                <p style="margin: 5px 0 0; color: #111827; font-size: 18px; font-weight: 600;">${name} &lt;${email}&gt;</p>
              </div>
              <div style="margin-bottom: 30px; border-bottom: 2px solid #f3f4f6; padding-bottom: 20px;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: 700;">Subject</p>
                <p style="margin: 5px 0 0; color: #111827; font-size: 18px; font-weight: 600;">${subject}</p>
              </div>
              <div>
                <p style="margin: 0; color: #6b7280; font-size: 14px; text-transform: uppercase; font-weight: 700;">Message Content</p>
                <div style="margin-top: 15px; background-color: #f9fafb; border-radius: 6px; padding: 25px; border-left: 4px solid #111827;">
                  <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </div>
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-weight: 600;">PORTFOLIO AUTOMATION SYSTEM v2.0</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log(`Success: Inquiry from ${name} (<${email}>) sent to ${process.env.SMTP_TO || process.env.SMTP_USER}.`);

    console.log(`✅ SUCCESS: Inquiry emails sent for ${name}`);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};
