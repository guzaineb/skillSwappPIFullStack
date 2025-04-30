const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,  // Utilisez le mot de passe d'application ici
  },
});

async function sendCertificateEmail(userEmail, certificatePath) {
  const mailOptions = {
    from: `"SkillExchange" <${process.env.GMAIL_USER}>`,
    to: userEmail,
    subject: 'Votre Certificat de Compétence',
    text: 'Bonjour,\n\nFélicitations ! Voici votre certificat.\n\nCordialement,\nSkillExchange',
    attachments: [
      {
        filename: 'certificat.pdf',
        path: certificatePath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email', error);
    throw error;
  }
}

module.exports = sendCertificateEmail;
