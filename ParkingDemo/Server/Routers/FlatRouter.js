
const express = require("express");

const {createFlat, getSingleFlat, getAllFlat} = require("../Controllers/FlatController");

const router = express.Router();

router.post("/create-flat", createFlat);
router.get("/get-flat/:id", getSingleFlat);
router.get("/get-all-flat", getAllFlat);

module.exports = router;
