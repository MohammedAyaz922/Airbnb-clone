const express = require("express");
const {
  createPlace,
  getUserPlaces,
  getPlaceById,
  updatePlace,
  getPlace
} = require("../controllers/placeController");

const router = express.Router();

router.post("/places", createPlace);
router.get("/user-places", getUserPlaces);
router.get("/places/:id", getPlaceById);
router.get("/places", getPlace);
router.put("/places", updatePlace);


module.exports = router;
