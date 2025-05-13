
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Seules les images sont autorisées (jpeg, jpg, png)"));
    }
  }
}).single("picture");
// Mettre à jour le mot de passe
const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  
    try {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ success: false, message: "Les deux mots de passe sont requis" });
      }
  
      if (newPassword.length < 6) {
        return res.status(400).json({ success: false, message: "Le nouveau mot de passe doit contenir au moins 6 caractères" });
      }
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
      }
  
      // Vérifier l'ancien mot de passe
      const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: "Mot de passe actuel incorrect" });
      }
  
      // Mettre à jour le mot de passe
      const hashedPassword = await bcryptjs.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ 
        success: true, 
        message: "Mot de passe mis à jour avec succès" 
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  // Mettre à jour la photo de profil
  const updateProfilePicture = async (req, res) => {
    upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }
  
        if (!req.file) {
          return res.status(400).json({ success: false, message: "Aucune image téléchargée" });
        }
  
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
          { picture: req.file.filename },
          { new: true, select: '-password -verificationToken -resetPasswordToken' }
        );
  
        if (!updatedUser) {
          return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
  
        res.status(200).json({
          success: true,
          message: "Photo de profil mise à jour avec succès",
          user: updatedUser
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    });
  };
  const getProfilePicture = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('picture');
      
      if (!user || !user.picture) {
        return res.status(404).send('Photo non trouvée');
      }
  
      const imagePath = path.join(__dirname, '..', 'uploads', 'user', user.picture);
      
      // Vérifier que le fichier existe
      if (!fs.existsSync(imagePath)) {
        return res.status(404).send('Fichier image non trouvé');
      }
  
      // Déterminer le type MIME
      const mimeType = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png'
      }[path.extname(imagePath).toLowerCase()];
  
      if (!mimeType) {
        return res.status(400).send('Format d\'image non supporté');
      }
  
      // Lire et renvoyer le fichier image
      res.set('Content-Type', mimeType);
      fs.createReadStream(imagePath).pipe(res);
  
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).send('Erreur serveur');
    }
  };
  
  // Exporter les fonctions
  module.exports = {

    updatePassword,
    updateProfilePicture,
    getProfilePicture
  };