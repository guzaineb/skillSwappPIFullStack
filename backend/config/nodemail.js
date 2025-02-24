const transporter = require('./nodemailer'); 
const EMAIL_TEMPLATE = require('./Template');

async function sendVerificationEmail1(email,name, verificationToken) {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to SkillSwapp",
      html: EMAIL_TEMPLATE.replace('{name}', name).replace('{verificationCode}', verificationToken),
      category: 'Email Verification',
    };

    const info = await transporter.sendMail(mailOptions); 
    console.log("Email envoyé avec succès :", info.response);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
}

module.exports = { sendVerificationEmail1 };
