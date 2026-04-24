const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, rating, content } = req.body;

  if (!name || !email) {
    console.warn("⚠️  Rejected testimonial thanks: Missing name or email");
    return res.status(400).json({ message: 'Missing name or email' });
  }

  console.log(`📨 Attempting to send Testimonial Thank You to ${email}...`);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send a confirmation email to the client
    await transporter.sendMail({
      from: `"John Carlo Aganan" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for your feedback!",
      html: `
        <div style="background-color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 60px 20px;">
          <div style="border-left: 8px solid #fbbf24; padding: 40px; background-color: #fafaf9;">
            <p style="font-size: 14px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 40px; color: #444;">JC. PORTFOLIO</p>
            
            <h1 style="font-size: 32px; font-weight: 900; line-height: 1.2; margin: 0 0 20px 0; letter-spacing: -1px;">Thank you for the ${rating}-star review, ${name.split(' ')[0]}!</h1>
            
            <p style="font-size: 18px; line-height: 1.6; color: #374151; margin-bottom: 40px;">
              I truly appreciate you taking the time to share your experience. Your feedback helps me improve and continue building high-quality software.
            </p>

            <div style="background: #fff; padding: 20px; border: 1px solid #eee; margin-bottom: 40px;">
              <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700;">Your Review</p>
              <p style="font-style: italic; color: #111827; margin-top: 10px;">"${content}"</p>
            </div>
            
            <div style="border-top: 1px solid #ddd; padding-top: 30px;">
              <p style="font-size: 16px; font-weight: 700; margin: 0;">John Carlo Aganan</p>
              <p style="font-size: 14px; color: #6b7280; margin: 5px 0 0;">Full-Stack Software Engineer</p>
            </div>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <p style="font-size: 12px; color: #9ca3af;">&copy; 2026 Crafted with precision in Cavite, Philippines.</p>
          </div>
        </div>
      `
    });

    console.log(`Success: Thank-you email for testimonial sent to ${email}.`);
    console.log(`✅ SUCCESS: Testimonial thank-you sent to ${name}`);
    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending testimonial email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};
