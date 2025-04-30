const User = require('../models/user.model');
const Skill = require('../models/skill.model');
const Certificate = require('../models/certificate');
const generateCertificatePdf = require('../utils/generateCertificatePdf');
const sendCertificateEmail = require('../utils/sendCertificateEmail');

const fs = require('fs');
const path = require('path');

const certificatesDir = path.join(__dirname, '..', 'certificates');

if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir);
}

async function generateAndSendCertificate(req, res) {
  const { userId, skillId } = req.body;
  const certificatePath = path.join(__dirname, '..', 'certificates', `${userId}_${skillId}.pdf`);

  try {
    const user = await User.findById(userId);
    const skill = await Skill.findById(skillId);

    if (!user || !skill) {
      return res.status(404).json({ message: 'Utilisateur ou compétence introuvable' });
    }

    const certificateId = `${userId}-${skillId}-${Date.now()}`;

    const certificate = new Certificate({
      user: userId,
      skill: skillId,
      certificateId: certificateId,
    });
    await certificate.save();

    await generateCertificatePdf(user.name, skill.skillname, certificateId, certificatePath);

    await sendCertificateEmail(user.email, certificatePath);

    res.status(200).json({ message: 'Certificat généré et envoyé par email avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la génération ou de l\'envoi du certificat' });
  }
}

module.exports = {
  generateAndSendCertificate,
};
