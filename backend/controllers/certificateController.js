const User = require('../models/user.model');
const Skill = require('../models/skill.model');
const Certificate = require('../models/certificate');
const generateCertificatePdf = require('../utils/generateCertificatePdf');
const sendCertificateEmail = require('../utils/sendCertificateEmail');

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const certificatesDir = path.join(__dirname, '..', 'certificates');
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir);
}

async function generateAndSendCertificate(req, res) {
  const { userId, skillId } = req.body;

  try {
    // Vérification de l'existence de l'utilisateur et de la compétence
    const user = await User.findById(userId);
    const skill = await Skill.findById(skillId);

    if (!user || !skill) {
      return res.status(404).json({ message: 'Utilisateur ou compétence introuvable' });
    }

    // Génération d'un ID de certificat unique
    const certificateId = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Préparation des chemins
    const outputPath = path.join(certificatesDir, `${certificateId}.pdf`);
    const logoPath = path.join(__dirname, '..', 'assets', 'logo.png');
    const signaturePath = path.join(__dirname, '..', 'assets', 'signature.png');

    // Vérification des assets
    if (!fs.existsSync(logoPath)) {
      return res.status(400).json({ message: 'Logo introuvable' });
    }

    // Génération du certificat avec tous les paramètres requis
    await generateCertificatePdf({
      userName: user.name, // Utilisation du champ name de l'utilisateur
      field: skill.skillname,
      certificateId: certificateId,
      outputPath: outputPath,
      logoPath: logoPath,
      signaturePath: fs.existsSync(signaturePath) ? signaturePath : null
    });

    // Envoi du certificat par email
    await sendCertificateEmail(user.email, outputPath);

    // Sauvegarde en base de données
    const certificate = new Certificate({
      user: userId,
      skill: skillId,
      certificateId: certificateId,
      filePath: outputPath,
      issueDate: new Date()
    });
    await certificate.save();

    res.status(200).json({ 
      message: 'Certificat généré et envoyé avec succès',
      certificatePath: outputPath
    });

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la génération du certificat',
      error: error.message
    });
  }
}

module.exports = {
  generateAndSendCertificate
};