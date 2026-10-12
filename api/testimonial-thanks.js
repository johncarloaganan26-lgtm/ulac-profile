const nodemailer = require('nodemailer');
const db = require('../db');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, role, rating, content } = req.body || {};

  if (!name || !email || !content) {
    console.warn("⚠️  Rejected testimonial thanks: Missing name, email, or content");
    return res.status(400).json({ message: 'Missing required testimonial fields' });
  }

  // 1. Save directly into Neon Postgres
  let savedTestimonial = null;
  try {
    savedTestimonial = await db.createTestimonial({
      name,
      email,
      role: role || '',
      content,
      rating: rating ? parseInt(rating, 10) : 5,
    });
    console.log(`✅ [Neon DB] Successfully saved testimonial: ${savedTestimonial?.id}`);
  } catch (dbErr) {
    console.error('⚠️ Failed to save testimonial to Neon DB:', dbErr);
  }

  // 2. Attempt to send confirmation email if SMTP credentials configured
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      console.log(`📨 Attempting to send Testimonial Thank You to ${email}...`);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"John Carlo Aganan" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thank you for your feedback!",
        html: `
          <div style="background-color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827; max-width: 600px; margin: 0 auto; padding: 60px 20px;">
            <div style="border-left: 8px solid #fbbf24; padding: 40px; background-color: #fafaf9;">
              <p style="font-size: 14px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 40px; color: #444;">JC. PORTFOLIO</p>
              
              <h1 style="font-size: 32px; font-weight: 900; line-height: 1.2; margin: 0 0 20px 0; letter-spacing: -1px;">Thank you for the ${rating || 5}-star review, ${name.split(' ')[0]}!</h1>
              
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

      // 2b. Notify Admin of new testimonial
      const adminEmail = process.env.SMTP_TO || process.env.SMTP_USER;
      if (adminEmail) {
        await transporter.sendMail({
          from: `"Portfolio Reviews" <${process.env.SMTP_USER}>`,
          to: adminEmail,
          subject: `New Testimonial (${rating || 5}★) from ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background: #f9fafb;">
              <h2 style="color: #111827;">New Testimonial Submitted</h2>
              <p><strong>${name}</strong> &lt;${email}&gt; (${role || 'Client'}) left a <strong>${rating || 5}-star</strong> review:</p>
              <blockquote style="border-left: 4px solid #f97316; padding-left: 12px; color: #4b5563; font-style: italic;">"${content}"</blockquote>
              <p>Log in to your Admin Dashboard to approve this testimonial for your homepage.</p>
            </div>
          `
        });
      }

      console.log(`✅ SUCCESS: Testimonial thank-you sent to ${name} and admin notified.`);
    } catch (emailErr) {
      console.error('Email sending failed (testimonial still saved in Neon):', emailErr.message);
    }
  }

  return res.status(200).json({
    message: 'Testimonial submitted successfully!',
    data: savedTestimonial
  });
};
