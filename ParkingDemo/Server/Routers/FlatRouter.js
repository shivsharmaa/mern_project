
const express = require("express");

const {createFlat, getSingleFlat, getAllFlat, updateFlat} = require("../Controllers/FlatController");

const router = express.Router();

router.post("/create-flat", createFlat);
router.get("/get-flat/:id", getSingleFlat);
router.get("/get-all-flat", getAllFlat);
router.put("/update-flat", updateFlat);

module.exports = router;
