const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const passport = require("passport");
const  generateTokenAndSetCookies  = require("../utils/generateTokenAndSetCookie");

router.get('/google',
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      session: false ,
       prompt: 'consent'
    })
  );


  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "http://localhost:5173/login",
      session: false,
    }),
    (req, res) => {
      const user = req.user;
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000,
      });

      // Redirection basée sur le rôle
      const redirectUrl = user.role === 'learner' 
        ? 'http://localhost:5173/profile1'
        : user.role === 'educator'
        ? 'http://localhost:5173/profile'
        : 'http://localhost:5173/Dash';

      res.redirect(redirectUrl);
    }
  );
// Déclenche le login
router.get("/github", passport.authenticate("github", { session: false, 
    scope: ["read:user"],
    prompt: 'select_account' ,
    auth_type: "reauthenticate" 
  }));
  
  // Callback
  router.get("/github/callback",
    passport.authenticate("github", {
      session: false,
      failureRedirect: "http://localhost:5173/signin",
    }),
    (req, res) => {
      const user = req.user;
      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000,
      });

      const redirectUrl = user.role === 'learner' 
        ? 'http://localhost:5173/profile1'
        : user.role === 'educator'
        ? 'http://localhost:5173/profile'
        : 'http://localhost:5173/Dash';

      res.redirect(redirectUrl);
    }
  );












module.exports = router;
