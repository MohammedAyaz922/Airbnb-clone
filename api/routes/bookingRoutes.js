const express = require("express");
const { getBookings } = require("../controllers/bookingController");

const router = express.Router();

router.get("/bookings", getBookings);

module.exports = router;