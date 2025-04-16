const express = require('express');
const router = express.Router();
const {vehicleLeftParking, vehicleReturnedParking, getParkingStatusForOwner} = require('../Controllers/ParkingSpaceController');

// Vehicle leaves
router.post('/vehicle-left/:id', vehicleLeftParking);

// Vehicle returns
router.post('/vehicle-returned/:id', vehicleReturnedParking);

// Get owner's parking status
router.get('/owner/:ownerId/parking-status', getParkingStatusForOwner );

module.exports = router;
