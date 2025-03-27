const express = require("express");

const {createOwner} = require("../Controllers/OwnerController");

const router = express.Router();

router.post("/create-owner", createOwner);

module.exports = router;