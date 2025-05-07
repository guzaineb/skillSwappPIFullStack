const User = require('../models/user.model');

exports.getAllUsers = async (req, res) => {
  try {
    // Récupère tous les utilisateurs sauf les admins
    const users = await User.find({ 
      role: { $in: ['educator', 'learner'] } 
    }).select('-password -resetPasswordToken -resetPasswordExpires -verificationToken -verificationTokenExpires');

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};