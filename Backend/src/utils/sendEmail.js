const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,        
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"UniDash Support" <support@unidash.com>',
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
