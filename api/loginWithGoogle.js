const express = require("express");
const passport = require("passport");
const { isUserAuthenticated } = require("./middlewares/auth");


const router = express.Router();

const successLoginUrl = "http://localhost:5173/";
const errorLoginUrl = "http://localhost:5173/error";

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"],prompt:'select_account' })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    res.send("Thank you for signing in!");
  }
);

router.get("/testing",isUserAuthenticated,(req, res) => {

});

module.exports = router;