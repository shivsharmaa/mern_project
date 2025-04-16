const express = require('express');
const router = express.Router();
const {guestDeparture, registerGuest} = require('../Controllers/GuestController');

router.post('/register-guest', registerGuest);
router.post('/guest-departure', guestDeparture);

module.exports = router;
