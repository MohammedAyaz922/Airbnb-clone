const express = require("express");
const { processPayment } = require("../controllers/paymentController");
const router = express.Router();


router.post("/create-stripe-checkout-session", processPayment);

module.exports = router;