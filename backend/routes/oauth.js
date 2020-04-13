const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
var Strategy = require("passport-google-oauth20").Strategy;
const { protect } = require("../middleware/auth");
const asyncHandler = require("../middleware/async");

passport.use(
  new Strategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/api/v1/oauth/return",
    },
    async (accessToken, refreshToken, profile, cb) => {
      // if user exist  else register
      if (!profile) {
        return cb(null, false);
      }
      console.log(profile._json);
      const email = profile._json.email;
      const name = profile._json.name;
      let user;
      try {
        user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name,
            email,
          });
        }
        return cb(null, user);
      } catch (err) {
        return cb(err, false);
      }
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
    sendTokenResponse(req.user, 200, res);
  }
);

router.get("/logout", protect, (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

//fake login
router.get("/login1", async (req, res) => {
  const user = await User.findOne({ email: "migom6@gmail.com" });
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(200).cookie("token", token, options).redirect("/");
});

router.get(
  "/me",
  protect,
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  })
);

const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).redirect("/");
};

module.exports = router;
