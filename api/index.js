const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const placeRoutes = require("./routes/placeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const loginWithGoogleApi = require("./loginWithGoogle");
const cookieSession = require("cookie-session");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
require("dotenv").config();

require("./auth/passport");
require("./auth/passportGoogleSSO");

// Use cookie-session for session management
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  keys: [process.env.cookie_key_secret]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Use routers
app.use("/", authRoutes);
app.use("/", placeRoutes);
app.use("/", bookingRoutes);
app.use("/", loginWithGoogleApi);
app.use("/", paymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
