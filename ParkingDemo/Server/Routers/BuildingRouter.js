const express = require("express");



const { createBuild, getBuilding, getAllBuilding, updateBuilding, deleteBuilding  } = require("../Controllers/BuildingController");
const router = express.Router();
router.post("/Create-building", createBuild);
router.get("/get-building/:id", getBuilding);
router.get("/get-all-building", getAllBuilding);
router.put("/building-update/:_id", updateBuilding);
router.delete("/building-delete/:_id", deleteBuilding);

module.exports = router;
