const stripe = require("stripe");
const { v4: uuidv4 } = require("uuid");
const Stripe = require("stripe");
const Booking = require("../models/Booking");
const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const jwtSecret = "23dwefuehrfh394hfonfw3434f34frerr2";

const processPayment = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });
  const { price, placeId, checkIn, checkOut, phone, name } = req.body; // userId not needed since we'll use req.cookies or req.user

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Booking for Place ID: ${placeId}`,
            },
            unit_amount: price * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/booking-success`,
      cancel_url: `http://localhost:5173/place/${placeId}`,
    });

    if (!session.id) {
      return res.status(400).json({ error: "Failed to create payment session" });
    }

    const { user } = req; // Assuming req.user is populated by middleware
    const { token } = req.cookies;

    let userId;

    // Check if `req.user` exists
    if (user) {
      userId = user._id;
    } else if (token) {
      // Verify JWT if `req.user` is not present
      const userData = jwt.verify(token, jwtSecret);
      userId = userData.id;
    }

    // If no userId is found, return an error
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // Fetch user details
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({ error: "User not found in database" });
    }

    // Save booking in the database
    const booking = new Booking({
      user: userId,
      place: placeId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      phone,
      name,
      price,
    });

    await booking.save();

    // Send the Stripe session URL
    return res.json({ url: session.id });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { processPayment };
