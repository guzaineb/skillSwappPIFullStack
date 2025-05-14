
const Notification = require('../models/notification.model');
const User = require('../models/user.model');

// Récupérer les notifications d'un utilisateur
const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Récupérer les notifications non lues de l'utilisateur
    const notifications = await Notification.find({ to: userId })
      .populate('from', 'username profilePic')
      .populate('post', 'image')
      .sort({ createdAt: -1 });
    
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des notifications" });
  }
};

// Supprimer les notifications lues
const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Marquer toutes les notifications comme lues
    await Notification.updateMany(
      { to: userId },
      { $set: { read: true } }
    );
    
    res.status(200).json({ message: "Notifications marquées comme lues" });
  } catch (error) {
    console.error("Erreur lors de la suppression des notifications:", error);
    res.status(500).json({ error: "Erreur lors de la suppression des notifications" });
  }
};

module.exports = { getNotifications, deleteNotifications };
