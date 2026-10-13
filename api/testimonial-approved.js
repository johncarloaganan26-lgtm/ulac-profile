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

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Approval email skipped: SMTP credentials not configured.');
    return res.status(200).json({ message: 'Approval recorded (email notification skipped: SMTP not configured).' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const firstName = (name || '').trim().split(' ')[0] || 'there';
  const siteUrl = req.body.frontendUrl || 'https://johncarloaganan.vercel.app';

  try {
    // Send a "Review is Live" email to the client
    await transporter.sendMail({
      from: `"John Carlo Aganan" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your review is now live on my portfolio`,
      headers: {
        'Auto-Submitted': 'auto-replied',
        'X-Priority': '3',
      },
      text: `Hi ${firstName},

Great news! Your testimonial has been reviewed and is now published on my portfolio website.

You can view it here: ${siteUrl}

Thank you once again for your feedback and support.

Best regards,
John Carlo Aganan
Full-Stack Software Engineer
${process.env.SMTP_USER}`,
      html: `
        <div style="background-color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 60px 20px;">
          <div style="border-left: 8px solid #10b981; padding: 40px; background-color: #f0fdf4;">
            <p style="font-size: 14px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 40px; color: #166534;">JC. PORTFOLIO</p>
            
            <h1 style="font-size: 26px; font-weight: 800; line-height: 1.2; margin: 0 0 20px 0;">Great news, ${firstName}</h1>
            
            <p style="font-size: 16px; line-height: 1.6; color: #166534; margin-bottom: 30px;">
              Your testimonial has been reviewed and is now officially published on my homepage. Thank you for taking the time to share your experience.
            </p>

            <div style="margin-bottom: 40px;">
              <a href="${siteUrl}" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 700; font-size: 14px;">View Your Review</a>
            </div>
            
            <div style="border-top: 1px solid #bbf7d0; padding-top: 24px;">
              <p style="font-size: 16px; font-weight: 700; margin: 0; color: #166534;">John Carlo Aganan</p>
              <p style="font-size: 14px; color: #15803d; margin: 4px 0 0;">Full-Stack Software Engineer</p>
            </div>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <p style="font-size: 12px; color: #9ca3af;">&copy; ${new Date().getFullYear()} John Carlo Aganan &bull; Portfolio Updates</p>
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
