const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "23dwefuehrfh394hfonfw3434f34frerr2";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(newUser);
  } catch (error) {
    res.status(422).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const UserLogin = await User.findOne({ email });
  if (UserLogin) {
    const correctPass = bcrypt.compareSync(password, UserLogin.password);

    if (correctPass) {
      jwt.sign(
        { email: UserLogin.email, id: UserLogin._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(UserLogin);
        }
      );
    } else {
      res.status(422).json("password not ok");
    }
  }
};


const profile = async (req, res) => {
  const { token } = req.cookies;
  const {user} = req


  if (user) {
    const { name, email, _id } = await User.findById(user._id);
    console.log("User is already authenticated:", name, email, _id);
    return res.json({ name, email, _id });
  }

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.status(401).json(null);
  }
};

const logout = (req, res) => {
  // Clear the JWT token (if you're using one)
  res.cookie("token", "", { maxAge: 0, httpOnly: true });

  // Clear the session stored in the cookie-session
  req.session = null; // This removes the session

  // You can also explicitly clear the session cookies
  res.clearCookie('session', { path: '/' });
  res.clearCookie('session.sig', { path: '/' });

  // Send a success response
  res.json({ message: "Logout successful" });
};



module.exports = { register, login, profile, logout };
