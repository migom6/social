const express = require("express");
const passport = require("passport");
const router = express.Router();

var Strategy = require("passport-google-oauth20").Strategy;

passport.use(
  new Strategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/api/v1/oauth/return",
    },
    function (accessToken, refreshToken, profile, cb) {
      // if user exist  else register
      return cb(null, { ...profile._json });
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

router.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/return",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log(req.user);
    res.redirect("/");
  }
);

module.exports = router;
