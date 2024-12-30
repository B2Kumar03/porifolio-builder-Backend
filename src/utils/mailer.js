// mailer.js
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password
  },
});

const sendOTP = (email,name, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for registering'+" "+name,
    text: `
    We are excited to have you on board. Your registration is complete, and you can now explore all the features we offer. If you have any questions or need further assistance, feel free to reach out to our support team.
    `,
    html: `
    <h1>Thank you for registering</h1>
    <p>Dear ${name},
    We are excited to have you on board. Your registration is complete, and you can now explore all the features we offer. If you have any questions or need further assistance, feel free to reach out to our support team.

    </p>
    <a>https://bittu-kumar.netlify.app/ </a>`
  };

  return transporter.sendMail(mailOptions);
};

export default sendOTP;
