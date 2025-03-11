const User = require('../models/user.model');
const bcrypt = require('bcryptjs');	
const jwt = require('jsonwebtoken');
const ValidateLogin = require('../validation/Login');
const { sendVerificationEmail, sendWelcomeEmail } = require('../mailtrap/emails');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const transporter = require('../config/nodemailer');
const { sendVerificationEmail1 } = require('../config/nodemail');

async function register(req, res) {
	try {
		const role = "learner";
		const { email, password, name } = req.body;

		if (!email || !password || !name) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
		const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h expiration

		const user = new User({
			email,
			password: hashedPassword,
			name,
			role,
			phone,
			verificationToken,
			verificationTokenExpires,
			isVerified: false,
		});

		await user.save();

		// Générer un token JWT
		generateTokenAndSetCookie(res, user._id);

		await sendVerificationEmail(user.email, verificationToken);

		res.status(201).json({
			success: true,
			message: "Account created successfully",
			user: { ...user._doc, password: undefined },
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};


// async function register(req, res) {
// 	try {
// 		const role = "learner";
// 		const { email, password, name } = req.body;

// 		if (!email || !password || !name) {
// 			return res.status(400).json({ success: false, message: "All fields are required" });
// 		}

// 		const userAlreadyExists = await User.findOne({ email });
// 		if (userAlreadyExists) {
// 			return res.status(400).json({ success: false, message: "User already exists" });
// 		}

// 		const hashedPassword = await bcrypt.hash(password, 10);
// 		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
// 		const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h expiration

// 		const user = new User({
// 			email,
// 			password: hashedPassword,
// 			name,
// 			role,
// 			verificationToken,
// 			verificationTokenExpires,
// 			isVerified: false,
// 		});

// 		await user.save();
// 		// Générer un token JWT
// 		generateTokenAndSetCookie(res, user._id);

		
// 		await sendVerificationEmail(user.email,user.name, verificationToken);

// 		res.status(201).json({
// 			success: true,
// 			message: "Account created successfully",
// 			user: { ...user._doc, password: undefined },
// 		});
		
// 	} catch (error) {
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };

async function signup(req, res) {
	try {
		const { email, password, name, phone, role  } = req.body;

		// Vérification des champs obligatoires
		if (!email || !password || !name || !phone || !role) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		// Vérification du rôle valide
		const validRoles = ["learner", "admin", "educator"];
		if (!validRoles.includes(role)) {
			return res.status(400).json({ success: false, message: "Invalid role selected" });
		}

		// Vérification si l'utilisateur existe déjà
		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		// Hash du mot de passe
		const hashedPassword = await bcrypt.hash(password, 10);

		// Génération du token de vérification
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
		const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // Expire dans 24h

		// Création de l'utilisateur
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

		// Sauvegarde de l'utilisateur
		await user.save();

		// Génération du token JWT et enregistrement du cookie
		generateTokenAndSetCookie(res, user._id);

		// Envoi de l'email de vérification
		await sendVerificationEmail(user.email, user.name, verificationToken);

		// Réponse au client
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
			verificationTokenExpires: { $gt: Date.now() }, // Correction du champ
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
			res.status(404).json(errors);
		} else {
			User.findOne({ email: req.body.email })
				.then(user => {
					if (!user) {
						errors.email = "not found user";
						res.status(404).json(errors);
					} else {
						bcrypt.compare(req.body.password, user.password)
							.then(isMatch => {
								if (!isMatch) {
									errors.password = "incorrect password";
									res.status(404).json(errors);
								} else {
									const token = jwt.sign({ 
										id: user._id,
										name: user.name,
										email: user.email,
										role: user.role
									}, process.env.JWT_SECRET, { expiresIn: '2h' });
									res.status(200).json({
										message: "success"
									});
								}
							});
					}
				});
		}
	} catch (error) {
		res.status(404).json(error.message);
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
const checkAuth = async (req, res) => {
	try{
	  const user = await User.findById(req.userId).select("-password");
		  if (!user) {
			  return res.status(400).json({ success: false, message: "User not found" });
		  }
  
		  res.status(200).json({ success: true, user });
	}catch(error){
	  console.log("Error in checkAuth ", error);
		  res.status(400).json({ success: false, message: error.message });
	}
  }
  const logout = async (req,res) => {
	res.clearCookie("token");
	  res.status(200).json({ success: true, message: "Logged out successfully" });
  }
  

module.exports = { signup, verifyEmail, login, Test, Admin, logout,Educator, register,checkAuth};
