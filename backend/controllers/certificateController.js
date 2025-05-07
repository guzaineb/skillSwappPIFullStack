const User = require('../models/user.model');
const Skill = require('../models/skill.model');
const Certificate = require('../models/certificate');
const generateCertificatePdf = require('../utils/generateCertificatePdf');
const sendCertificateEmail = require('../utils/sendCertificateEmail');
const signPdf = require('../utils/signPdf'); // ajoute cette ligne

const fs = require('fs');
const path = require('path');
require('dotenv').config(); // pour charger le mot de passe depuis .env

const certificatesDir = path.join(__dirname, '..', 'certificates');
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir);
}

async function generateAndSendCertificate(req, res) {
  const { userId, skillId } = req.body;

  try {
    const user = await User.findById(userId);
    const skill = await Skill.findById(skillId);

    if (!user || !skill) {
      return res.status(404).json({ message: 'Utilisateur ou compétence introuvable' });
    }

    const certificateId = `${userId}-${skillId}-${Date.now()}`;
    const unsignedPath = path.join(certificatesDir, `${certificateId}_unsigned.pdf`);
    const signedPath = path.join(certificatesDir, `${certificateId}_signed.pdf`);
    const logoPath = path.join(__dirname, '..', 'assets', 'logo.png'); // adapte selon ton projet
    const p12Path = path.join(__dirname, '..', 'utils', 'certificate.p12'); // dossier certs
    const p12Password = process.env.P12_PASSWORD;

    // Génère le PDF
    await generateCertificatePdf(user.name, skill.skillname, certificateId, unsignedPath, logoPath);

    // Signature numérique
    signPdf(unsignedPath, signedPath, p12Path, p12Password);

    // Envoie le certificat signé par email
    await sendCertificateEmail(user.email, signedPath);

    // Enregistre le certificat dans la base de données
    const certificate = new Certificate({
      user: userId,
      skill: skillId,
      certificateId: certificateId,
    });
    await certificate.save();

    res.status(200).json({ message: 'Certificat généré, signé et envoyé par email avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la génération, signature ou envoi du certificat' });
  }
}

module.exports = {
  generateAndSendCertificate,
};
