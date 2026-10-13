const nodemailer = require('nodemailer');
const db = require('../db');
require('dotenv').config();

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const recipientEmail = process.env.SMTP_TO || process.env.SMTP_USER;
      const cleanSenderName = (name || '').trim();
      const firstName = cleanSenderName.split(' ')[0] || 'there';
      const buttonText = cleanSenderName ? `Reply directly to ${escapeHtml(cleanSenderName)} &rarr;` : 'Reply to sender &rarr;';
      const currentYear = new Date().getFullYear();

      // 2a. Notification Email to Receiver (John Carlo / Ulacdev)
      await transporter.sendMail({
        from: `"Ulacdev Portfolio" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New System Inquiry from ${name}: ${subject}`,
        text: `Ulacdev - New System Inquiry

You have received a new message from your portfolio contact form.

FROM:
${name} <${email}>

SUBJECT:
${subject}

MESSAGE:
${message}

Reply directly to ${cleanSenderName || 'sender'}:
${email}

---
This message was sent from your portfolio contact form.
Please do not reply to this automated notification if not necessary.

Ulacdev
Portfolio · Projects · Contact
© ${currentYear} Ulacdev. All rights reserved.`,
        html: `
          <div style="background-color: #f3f4f6; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
              <tr>
                <td align="center">
                  <!-- Main Card Container -->
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; border-collapse: separate; text-align: left;">
                    <tr>
                      <td style="padding: 40px 40px 32px 40px;">
                        
                        <!-- Header -->
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                          <tr>
                            <td align="left" valign="middle">
                              <span style="font-size: 24px; font-weight: 800; color: #111111; letter-spacing: -0.5px;">Ulacdev</span>
                            </td>
                            <td align="right" valign="middle">
                              <span style="font-size: 13px; color: #6b7280; line-height: 1.4; display: block;">Portfolio<br>Contact Form</span>
                            </td>
                          </tr>
                        </table>

                        <!-- Divider -->
                        <div style="border-top: 1px solid #e5e7eb; margin: 24px 0 28px 0;"></div>

                        <!-- Main Heading -->
                        <h1 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 700; color: #111111; letter-spacing: -0.3px; line-height: 1.25;">New System Inquiry</h1>
                        <p style="margin: 0 0 24px 0; font-size: 14px; color: #6b7280; line-height: 1.5;">You have received a new message from your portfolio contact form.</p>

                        <!-- Divider -->
                        <div style="border-top: 1px solid #e5e7eb; margin: 0 0 24px 0;"></div>

                        <!-- FROM -->
                        <div style="margin-bottom: 24px;">
                          <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">FROM</p>
                          <p style="margin: 0; font-size: 15px; color: #111111; font-weight: 500; word-break: break-all;">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
                        </div>

                        <!-- SUBJECT -->
                        <div style="margin-bottom: 24px;">
                          <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">SUBJECT</p>
                          <p style="margin: 0; font-size: 15px; color: #111111; font-weight: 500; word-break: break-word;">${escapeHtml(subject)}</p>
                        </div>

                        <!-- MESSAGE -->
                        <div style="margin-bottom: 32px;">
                          <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">MESSAGE</p>
                          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px 24px;">
                            <p style="margin: 0; color: #111111; font-size: 14px; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${escapeHtml(message)}</p>
                          </div>
                        </div>

                        <!-- Reply Button -->
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 32px;">
                          <tr>
                            <td align="center">
                              <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent('Re: ' + (subject || 'Portfolio Inquiry'))}" style="display: inline-block; background-color: #111111; color: #ffffff; text-decoration: none; padding: 13px 28px; border-radius: 6px; font-weight: 600; font-size: 14px; letter-spacing: 0.2px;">${buttonText}</a>
                            </td>
                          </tr>
                        </table>

                        <!-- Divider -->
                        <div style="border-top: 1px solid #e5e7eb; margin: 0 0 20px 0;"></div>

                        <!-- Automated Notification Note -->
                        <div style="text-align: center; margin-bottom: 28px;">
                          <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.5;">This message was sent from your portfolio contact form.</p>
                          <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 12px; line-height: 1.5;">Please do not reply to this automated notification if not necessary.</p>
                        </div>

                        <!-- Footer -->
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border-top: 1px solid #e5e7eb;">
                          <tr>
                            <td align="left" valign="middle" style="padding-top: 20px;">
                              <p style="margin: 0; font-size: 14px; font-weight: 700; color: #111111;">Ulacdev</p>
                              <p style="margin: 4px 0 0 0; font-size: 12px; color: #6b7280;">Portfolio &bull; Projects &bull; Contact</p>
                            </td>
                            <td align="right" valign="middle" style="padding-top: 20px; border-left: 1px solid #e5e7eb; padding-left: 20px;">
                              <p style="margin: 0; font-size: 12px; color: #6b7280;">&copy; ${currentYear} Ulacdev</p>
                              <p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280;">All rights reserved.</p>
                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
      });

      // 2b. Automated Confirmation Email to the Guest
      await transporter.sendMail({
        from: `"John Carlo Aganan" <${process.env.SMTP_USER}>`,
        to: email,
        replyTo: recipientEmail,
        subject: `Thank you for reaching out, ${firstName}`,
        headers: {
          'Auto-Submitted': 'auto-replied',
          'X-Priority': '3',
        },
        text: `Hi ${firstName},

Thank you for reaching out! I have received your inquiry regarding "${subject}".

I personally review all messages and will respond to your email as soon as possible (typically within 24 to 48 hours).

A copy of your message:
"${message}"

Best regards,
John Carlo Aganan
Full-Stack Software Engineer
${process.env.SMTP_USER}`,
        html: `
          <div style="background-color: #0f172a; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
            <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
              <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #f97316;">
                <span style="display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #f97316; margin-bottom: 8px;">JOHN CARLO AGANAN &bull; PORTFOLIO</span>
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Thank you for reaching out</h1>
              </div>
              <div style="padding: 32px 28px; color: #334155; line-height: 1.6;">
                <p style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a;">Hi <strong>${firstName}</strong>,</p>
                <p style="margin: 0 0 18px 0; font-size: 15px;">I have received your inquiry regarding <strong>"${subject}"</strong>. Thank you for taking the time to write to me.</p>
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
