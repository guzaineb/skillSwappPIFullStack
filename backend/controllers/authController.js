const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');
const ValidateLogin = require('../validation/Login');

const { sendVerificationEmail, sendWelcomeEmail  } = require('../mailtrap/emails');

const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const transporter = require('../config/nodemailer');
const { sendVerificationEmail1 } = require('../config/nodemail');
const cloudinary = require('../lib/cloudinary');

const { sendPasswordResetEmail,sendResetSuccessEmail } = require('../utils/EmailService');
async function signup(req, res) {
	try {
		const { email, password, name, phone, role  } = req.body;

		if (!email || !password || !name || !phone || !role) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const validRoles = ["learner", "admin", "educator"];
		if (!validRoles.includes(role)) {
			return res.status(400).json({ success: false, message: "Invalid role selected" });
		}

		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
		const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // Expire dans 24h

		const user = new User({
			email,
			password: hashedPassword,
			name,
			phone,
			role,
			verificationToken,
			verificationTokenExpires,
			isVerified: false,
		});

		await user.save();

		generateTokenAndSetCookie(res, user._id);

		await sendVerificationEmail(user.email, user.name, verificationToken);

		res.status(201).json({
			success: true,
			message: "Account created successfully",
			user: { ...user._doc, password: undefined },
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
}



async function verifyEmail(req, res) {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,

			verificationTokenExpires: { $gt: Date.now() }, 
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		await User.updateOne(
			{ _id: user._id },
			{
				$set: { isVerified: true },
				$unset: { verificationToken: 1, verificationTokenExpires: 1 },
			}
		);

		await sendWelcomeEmail(user.email, user.name);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};




async function login(req, res) {
	const { errors, isValid } = ValidateLogin(req.body);
	try {
		if (!isValid) {
			return res.status(400).json({ success: false, errors });
		}

		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			return res.status(400).json({ success: false, message: "Incorrect password" });
		}

		// Générer un token et l'envoyer en cookie sécurisé
		const token = jwt.sign(
			{ id: user._id, name: user.name, email: user.email, role: user.role ,},
			process.env.JWT_SECRET,
			{ expiresIn: "2h" }
		);

		// Définir le cookie avec des paramètres sécurisés
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 2 * 60 * 60 * 1000, // 2 heures
		});

		// Mettre à jour le dernier login
		user.lastLogin = new Date();
		await user.save();
		const userData = {
			id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			profilePic: user.profilePic,
			avatar: user.avatar, 
			isVerified: user.isVerified,
			phone: user.phone,
		};

		return res.status(200).json({ success: true, user: userData });

	} catch (error) {
		console.error("❌ Error in login:", error);
		return res.status(500).json({ success: false, message: "Server error, please try again later" });
	}
}


async function Test(req, res) {
	res.send(req.user);
}

async function Educator(req, res) {
	res.send(req.user);
}

async function Admin(req, res) {
	res.send("welcome admin");
}

async function updateUser(req,res){ ///bech nrodha asyncrone lazem nzid m3aha await
    try{
       
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true},); ////5aterupdate au niveau du body new:true bech yaffichili ba3d l modification 
res .status(200).json(user);
    }
    catch(err){
console.log(err)
    }
}




const logout = async (req, res) => {
	try {
		res.clearCookie("token", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
		});

		return res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.error("❌ Error in logout:", error);
		return res.status(500).json({ success: false, message: "Logout failed" });
	}
};

const checkAuth = async (req, res) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Modifier la structure pour inclure _id
		const userData = {
			_id: user._id, // Ajout de _id
			id: user._id,  // Garder id pour la compatibilité
			name: user.name,
			email: user.email,
			role: user.role,
			profilePic: user.profilePic,
			avatar: user.avatar,
			isVerified: user.isVerified,
			phone: user.phone,
		};

		return res.status(200).json({
			success: true,
			user: userData
		});
	} catch (error) {
		console.error("CheckAuth error:", error);
		return res.status(401).json({ 
			success: false, 
			message: "Authentication failed" 
		});
	}
};


async function forgetPassWord(req, res) {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token

		const resetToken = crypto.randomBytes(32).toString("hex");
const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = resetTokenExpiresAt;

		await user.save();

		// send email

		await sendPasswordResetEmail(user.email, user.name ,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

async function resetPassword(req, res) {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,

			resetPasswordExpires: { $gt: Date.now() },		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password

		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();
		console.log("Saved user:", user);

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
async function resendVerificationCode(req, res) {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ 
            success: false, 
            message: "Email is required" 
        });
    }

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        const newVerificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const newVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h expiry

        user.verificationToken = newVerificationToken;
        user.verificationTokenExpires = newVerificationTokenExpires;
        await user.save();

        await sendVerificationEmail(user.email, user.name, newVerificationToken);

        res.status(200).json({
            success: true,
            message: "New verification code sent successfully",
        });
    } catch (error) {
        console.error("Error resending verification code:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
}

const updateProfile = async (req, res) => {
	try {
	  const { profilePic } = req.body;
	  const userId = req.user.id;  // Assure-toi que req.user est bien défini (authentification)
  
	  if (!profilePic) {
		return res.status(400).json({ message: "Profile picture is required" });
	  }
  
	  const uploadResponse = await cloudinary.uploader.upload(profilePic);
  
	  const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ profilePic: uploadResponse.secure_url }, 
		{ new: true }
	  );
  
	  res.status(200).json(updatedUser);  // Renvoie l'utilisateur mis à jour
  
	} catch (error) {
	  console.log("Error in updateProfile:", error);
	  res.status(500).json({ message: "Internal server error" });

	}};

	const  blockStudent= async (req, res) => {
		try {
		  const { educatorId, studentId } = req.body;
	  
		  const educator = await User.findById(educatorId);
	  
		  if (!educator || educator.role !== 'educator') {
			return res.status(403).json({ message: 'Non autorisé' });
		  }
	  
		  if (!educator.blockedUsers.includes(studentId)) {
			educator.blockedUsers.push(studentId);
			await educator.save();
		  }
	  
		  res.status(200).json({ message: 'Étudiant bloqué avec succès' });
		} catch (err) {
		  console.error(err);
		  res.status(500).json({ message: 'Erreur lors du blocage de l\'étudiant' });
		}
	  }
	  
  // GET /api/skill/user/:userId

const getUserSkills =async (req, res) => {
		try {
		  const user = await User.findById(req.params.userId).populate('enrolledSkills');
		  if (!user) {
			return res.status(404).json({ message: 'Utilisateur non trouvé' });
		  }
		  res.json(user.enrolledSkills);
		} catch (error) {
		  console.error(error);
		  res.status(500).json({ message: 'Erreur serveur' });
		}
	  };
  

  
  



module.exports = { signup,resendVerificationCode,updateProfile, verifyEmail, login, Test,updateUser, Admin, logout, Educator, forgetPassWord, resetPassword ,checkAuth,blockStudent,getUserSkills};

