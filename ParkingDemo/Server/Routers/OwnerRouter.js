const express = require("express");

const {createOwner, getSingleOwner, getAllOwner} = require("../Controllers/OwnerController");

const router = express.Router();

router.post("/create-owner", createOwner);
router.get("/get-owner/:id", getSingleOwner);
router.get("/get-all-owner", getAllOwner)

module.exports = router;