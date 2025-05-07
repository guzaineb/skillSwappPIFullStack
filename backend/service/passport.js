const  GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
require("dotenv").config();
const passport = require("passport");
const User = require("../models/user.model");
passport.use(new GoogleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, done) {
    try {
      const email = profile.emails[0].value;
      const googleId = profile.id;

      let user = await User.findOne({ email });

      if (!user) {
        // Créer un nouvel utilisateur avec des données par défaut
        user = new User({
          googleId: googleId,
            name: profile.name.givenName  || "Google User",
        //   firstname: profile.name.givenName || "Google",
        //   lastname: profile.name.familyName || "User",
          email: email,
          password: googleId, // ou une valeur par défaut car pas utilisée ici
          phone:"29835571", // valeur par défaut à modifier plus tard
         
          role: "learner",
          isVerified: true,
          avatar: profile.photos[0].value,
        });

        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));


passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
        scope: ["read:user"],
      },
      async function(accessToken, refreshToken, profile, done) {
        try {
          const githubId = profile.id;
  
          // Recherche uniquement par githubId
          let user = await User.findOne({ githubId });
  
          if (!user) {
            user = new User({
              githubId: githubId,
             name: profile.displayName?.split(' ')[0] || "GitHub",
             
              email: "gfgfg",  
              password: githubId, 
              phone: "29835571",
             
              role: "learner",
             
              isVerified: true,
              avatar: profile.photos?.[0]?.value || "",
            });
  
            await user.save();
          }
  
          return done(null, user);
        } catch (err) {
          console.error("GitHub auth error:", err);
          return done(err, null);
        }
      }
    )
  );



passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user);
  });



