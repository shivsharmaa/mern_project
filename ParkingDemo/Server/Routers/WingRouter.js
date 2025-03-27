const express = require("express");

const {createWing, getWing, getAllWing}= require("../Controllers/WingController");

const router = express.Router();

router.post("/create-wing", createWing)
router.get("/get-wing/:_id", getWing)
router.get("/get-all-wing/", getAllWing)

module.exports = router;