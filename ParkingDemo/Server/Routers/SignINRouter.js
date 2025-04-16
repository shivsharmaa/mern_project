const express = require("express")


const {signupFamilyMember, getFamilyDetails, login} = require('../Controllers/SignInController');

const router = express.Router();

router.post("/signup-user", signupFamilyMember);
router.get("/get-user/:search", getFamilyDetails);
router.get("/get-user/:flatId", getFamilyDetails);
router.get("/login", login);

module.exports = router;
