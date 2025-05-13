const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const upload = require("../middleware/uploadMiddleware");
const verifyToken = require("../middleware/verifyToken");

// Middleware pour vérifier le rôle admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès non autorisé" });
  }
  next();
};

// Mettre à jour le profil admin
router.put(
  "/profile/:id",
  verifyToken,
  isAdmin,
  upload.single("profilePic"),
  adminController.updateAdminProfile
);

// Récupérer le profil admin
router.get(
  "/profile/:id",
  verifyToken,
  isAdmin,
  adminController.getAdminProfile
);

module.exports = router;