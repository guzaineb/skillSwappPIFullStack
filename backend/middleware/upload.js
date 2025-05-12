const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Créer le dossier uploads s'il n'existe pas
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtre pour les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  // Accepter les images, les documents et les fichiers audio
  if (
    file.mimetype.startsWith('image/') || 
    file.mimetype.startsWith('audio/') ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.mimetype === 'text/plain'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non pris en charge'), false);
  }
};

// Limites pour les fichiers
const limits = {
  fileSize: 10 * 1024 * 1024 // 10 MB
};

// Créer l'instance multer
const upload = multer({ 
  storage, 
  fileFilter,
  limits
});

// Exporter l'instance multer directement
module.exports = upload;
