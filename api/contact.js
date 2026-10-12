const nodemailer = require('nodemailer');
const db = require('../db');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body || {};
  console.log(`Email Inquiry received from ${name} (${email}). Preparing to process...`);

  if (!name || !email || !subject || !message) {
    console.warn(`⚠️  Rejected inquiry: Missing fields from ${name || 'unknown'}`);
    return res.status(400).json({ message: 'Missing fields' });
  }

  // 1. Save directly into Neon Postgres
  let savedInquiry = null;
  try {
    savedInquiry = await db.createInquiry({ name, email, subject, message });
    console.log(`✅ [Neon DB] Successfully saved inquiry: ${savedInquiry?.id}`);
  } catch (dbErr) {
    console.error('⚠️ Failed to save inquiry to Neon DB:', dbErr);
  }

  // 2. Attempt to send email if SMTP credentials configured
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      console.log(`📨 Setting up SMTP and dispatching inquiry emails for ${name} (${email})...`);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipientEmail = process.env.SMTP_TO || process.env.SMTP_USER;

      // 2a. Notification Email to Receiver (John Carlo)
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New Portfolio Inquiry from ${name}: ${subject}`,
        html: `
          <div style="background-color: #f3f4f6; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 30px; text-align: center; border-bottom: 3px solid #f97316;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 1px;">NEW SYSTEM INQUIRY</h1>
              </div>
              <div style="padding: 40px;">
                <div style="margin-bottom: 24px; border-bottom: 1px solid #f3f4f6; padding-bottom: 16px;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">From</p>
                  <p style="margin: 4px 0 0; color: #111827; font-size: 17px; font-weight: 600;">${name} &lt;${email}&gt;</p>
                </div>
                <div style="margin-bottom: 24px; border-bottom: 1px solid #f3f4f6; padding-bottom: 16px;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Subject</p>
                  <p style="margin: 4px 0 0; color: #111827; font-size: 17px; font-weight: 600;">${subject}</p>
                </div>
                <div>
                  <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Message Content</p>
                  <div style="margin-top: 10px; background-color: #f9fafb; border-radius: 6px; padding: 20px; border-left: 4px solid #f97316;">
                    <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                <div style="margin-top: 30px; text-align: center;">
                  <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #f97316; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 700; font-size: 14px;">Reply directly to ${name}</a>
                </div>
              </div>
              <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #f3f4f6;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px; font-weight: 600;">PORTFOLIO AUTOMATION SYSTEM &bull; NEON POSTGRES CONNECTED</p>
              </div>
            </div>
          </div>
        `,
      });

      // 2b. Automated Confirmation Email to the Guest
      await transporter.sendMail({
        from: `"John Carlo Aganan" <${process.env.SMTP_USER}>`,
        to: email,
        replyTo: recipientEmail,
        subject: `Thank you for reaching out, ${name.split(' ')[0]}! [Message Received]`,
        html: `
          <div style="background-color: #0f172a; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
              <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #f97316;">
                <span style="display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f97316; margin-bottom: 8px;">JOHN CARLO AGANAN &bull; PORTFOLIO</span>
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Thank you for reaching out!</h1>
              </div>
              <div style="padding: 32px 28px; color: #334155; line-height: 1.6;">
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a;">Hi <strong>${name.split(' ')[0]}</strong>,</p>
                <p style="margin: 0 0 18px 0; font-size: 15px;">I have received your inquiry regarding <strong>"${subject}"</strong>. Thank you for taking the time to write to me!</p>
                <p style="margin: 0 0 24px 0; font-size: 15px;">I personally review all messages and will respond to your email as soon as possible (typically within 24 to 48 hours).</p>
                
                <div style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; padding: 18px; margin-bottom: 24px;">
                  <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #64748b;">A copy of your message:</p>
                  <p style="margin: 0; font-size: 14px; color: #1e293b; font-style: italic; white-space: pre-wrap;">"${message}"</p>
                </div>

                <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
                  <p style="margin: 0; font-weight: 700; color: #0f172a; font-size: 15px;">John Carlo Aganan</p>
                  <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Full-Stack Software Engineer</p>
                  <p style="margin: 6px 0 0 0; font-size: 13px;"><a href="mailto:${process.env.SMTP_USER}" style="color: #f97316; text-decoration: none;">${process.env.SMTP_USER}</a></p>
                </div>
              </div>
              <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} John Carlo Aganan &bull; Automated Inquiry Confirmation
              </div>
            </div>
          </div>
        `,
      });

      console.log(`✅ SUCCESS: Both inquiry email (to ${recipientEmail}) and auto-reply confirmation (to ${email}) sent successfully!`);
    } catch (emailErr) {
      console.error('Email sending failed (inquiry still saved in Neon):', emailErr.message);
    }
  }

  return res.status(200).json({
    message: 'Inquiry received successfully!',
    data: savedInquiry
  });
};
