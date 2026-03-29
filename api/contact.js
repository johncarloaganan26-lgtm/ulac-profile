const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;
  console.log(`Email Inquiry received from ${name} (${email}). Preparing to send...`);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

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
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br />
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send a confirmation email to the sender
    await transporter.sendMail({
      from: `"John Carlo Aganan" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for reaching out!",
      text: `Hi ${name},\n\nI've received your message and will get back to you as soon as possible.\n\nBest regards,\nJohn Carlo Aganan`,
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for reaching out! I've received your message regarding "<strong>${subject}</strong>" and I will get back to you as soon as possible.</p>
        <br />
        <p>Best regards,<br />John Carlo Aganan</p>
      `
    });

    console.log(`Success: Inquiry from ${name} (<${email}>) sent to ${process.env.SMTP_USER}.`);
    console.log(`Success: Thank-you email sent to ${email}.`);

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};
