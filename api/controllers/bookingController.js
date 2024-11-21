const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
const jwtSecret = "23dwefuehrfh394hfonfw3434f34frerr2";

const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

const getBookings = (async (req, res) => {

    const userData = await getUserDataFromReq(req);
    const {id} = userData;
    res.json(
      await Booking.find({
        user: userData.id,
      }).populate('place')
    );
  });



module.exports = { getBookings };