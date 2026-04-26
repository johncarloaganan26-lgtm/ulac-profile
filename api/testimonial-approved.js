const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Missing name or email' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send a "Review is Live" email to the client
    await transporter.sendMail({
      from: `"John Carlo Aganan" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your review is now live!",
      html: `
        <div style="background-color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 60px 20px;">
          <div style="border-left: 8px solid #10b981; padding: 40px; background-color: #f0fdf4;">
            <p style="font-size: 14px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 40px; color: #166534;">JC. PORTFOLIO</p>
            
            <h1 style="font-size: 32px; font-weight: 900; line-height: 1.2; margin: 0 0 20px 0; letter-spacing: -1px;">Great news, ${name.split(' ')[0]}!</h1>
            
            <p style="font-size: 18px; line-height: 1.6; color: #166534; margin-bottom: 40px;">
              Your testimonial has been reviewed and is now **officially published** on my homepage! Thank you for being part of my journey.
            </p>

            <div style="margin-bottom: 50px;">
              <a href="${req.body.frontendUrl || 'http://localhost:3000'}" style="display: inline-block; background-color: #10b981; color: #fff; text-decoration: none; padding: 18px 30px; font-weight: 800; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">View Your Review</a>
            </div>
            
            <div style="border-top: 1px solid #bbf7d0; padding-top: 30px;">
              <p style="font-size: 16px; font-weight: 700; margin: 0; color: #166534;">John Carlo Aganan</p>
              <p style="font-size: 14px; color: #15803d; margin: 5px 0 0;">Full-Stack Software Engineer</p>
            </div>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <p style="font-size: 12px; color: #9ca3af;">&copy; 2026 Crafted with precision in Cavite, Philippines.</p>
          </div>
        </div>
      `
    });

    console.log(`Success: Approval notification sent to ${email}.`);
    return res.status(200).json({ message: 'Approval email sent successfully!' });
  } catch (error) {
    console.error('Error sending approval email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};
