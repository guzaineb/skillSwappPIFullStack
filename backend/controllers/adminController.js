const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");

// Mettre à jour le profil admin
exports.updateAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Vérifier si l'utilisateur existe et est admin
    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res.status(404).json({ message: "Admin non trouvé" });
    }

    // Gestion de l'upload d'image
    if (req.file) {
      // Supprimer l'ancienne image si elle existe
      if (user.profilePic) {
        const oldImagePath = path.join(__dirname, "..", user.profilePic);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      updates.profilePic = `/uploads/${req.file.filename}`;
    }

    // Mettre à jour le profil
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profil admin mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du profil",
      error: error.message,
    });
  }
};

// Récupérer le profil admin
exports.getAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    
    if (!user || user.role !== "admin") {
      return res.status(404).json({ message: "Admin non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du profil",
      error: error.message,
    });
  }
};