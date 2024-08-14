// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/User.model");
// require("dotenv").config();
// // locally login
// passport.use(
//   new LocalStrategy(
//     { usernameField: "email" },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });
//         if (!user || !(await user.comparedPassword(password))) {
//           return done(null, false, { message: "Invalid credentials" });
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// // Google OAuth login
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/api/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existingUser = await User.findOne({ googleId: profile.id });
//         if (existingUser) {
//           return done(null, existingUser);
//         }

//         const newUser = new User({
//           googleId: profile.id,
//           name: profile.displayName,
//           email: profile.emails[0].value,
//         });
//         await newUser.save();
//         done(null, newUser);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// // Serialize user to store user ID in the session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user from the session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

// module.exports = passport;
