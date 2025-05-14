const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getMessages, getUsersForSidebar, sendMessage, markAsRead } = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let dest = 'uploads/';
    
    // Déterminer le dossier en fonction du type de fichier
    if (file.mimetype.startsWith('image/')) {
      dest += 'images/';
    } else if (file.mimetype.startsWith('audio/')) {
      dest += 'audio/';
    } else {
      dest += 'documents/';
    }
    
    cb(null, dest);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limite à 10MB
});

router.get("/users", verifyToken, getUsersForSidebar);
router.get("/:id", verifyToken, getMessages);
router.post('/send/:id', verifyToken, upload.single('file'), sendMessage);
router.put('/markasread/:id', verifyToken, markAsRead);

module.exports = router; 
