const express = require("express");
const router = express.Router();
const {createGuestParkingSlots} = require("../Controllers/ParkingController");

router.post("/create-guest-parking", createGuestParkingSlots);

module.exports = router;
