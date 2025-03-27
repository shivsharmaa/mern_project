const express = require("express");

const {createAddress, getAllAddress, getAddress, updateAddress} = require("../Controllers/AddressController");
const { route } = require("./BuildingRouter");

const router = express.Router();

router.post("/create-address", createAddress);
router.get("/get-all-address", getAllAddress);
router.get("/get-address", getAddress);

module.exports = router;