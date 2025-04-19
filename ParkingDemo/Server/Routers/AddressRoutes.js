const express = require("express");

const {createAddress, getAllAddress, getAddress, updateAddress} = require("../Controllers/AddressController");

const router = express.Router();

router.post("/create-address", createAddress);
router.get("/get-all-address", getAllAddress);
router.get("/get-address/:id", getAddress);
router.put("/update-address", updateAddress);

module.exports = router;