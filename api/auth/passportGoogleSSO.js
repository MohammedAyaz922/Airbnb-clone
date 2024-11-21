const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");




const User = require("../models/User");

const jwtSecret = "23dwefuehrfh394hfonfw3434f34frerr2";

const GOOGLE_CALLBACK_URL = "http://localhost:4000/auth/google/callback";

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
        passReqToCallback: true,   
      },
      async (req, accessToken, refreshToken, profile, cb) => {
        const defaultUser = {
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          googleId: profile.id,
        };
  
        try {
          // Try to find the user by googleId
          let user = await User.findOne({ googleId: profile.id });
  
          // If no user is found, create a new one
          if (!user) {
            user = new User(defaultUser);
            await user.save();
          }
          // Sign a JWT for the user
        const token = jwt.sign(
          { email: user.email, id: user._id },
          jwtSecret,
          { expiresIn: "7d" } // Set token expiration as needed
        );

        // Attach the token to a cookie (assume req.res is available)
        if (req.res) {
         
          req.res.cookie("token", token);
          console.log("Attaching token")
        }
  
          // Pass the user to Passport callback
          return cb(null, user);
  
        } catch (err) {
          console.log("Error signing up", err);
          return cb(err, null);
        }
      }
    )
  );
  

passport.serializeUser((user, cb) => {
//   console.log("Serializing user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
      // Use Mongoose's `findById` method to fetch the user by their MongoDB _id
      const user = await User.findById(id);
      
      // If user is found, pass it to the callback
      if (user) {
        // console.log("DeSerialized user", user);
        cb(null, user);
      } else {
        cb(null, null); // If no user is found, return null
      }
    } catch (err) {
      console.log("Error deserializing", err);
      cb(err, null);
    }
  });
  