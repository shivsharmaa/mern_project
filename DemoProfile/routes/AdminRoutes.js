const express = require("express");
const multer = require("multer")
const { verifyToken } = require("../middlewares/auth");
const fs = require("fs");
const path = require("path");
 

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Set the upload directory
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name
  },
});
const upload = multer({ storage: storage });

const {
  insertAdmin,
  loginAdmin,
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/AdminController");

const router = express.Router();
router.post("/signup",upload.single("profile"), insertAdmin);
router.post("/login", loginAdmin);
router.get("/forgot-password/:email_id", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/get-all-user",verifyToken, getAllAdmin);
router.get("/getSingleAdmin/:id", verifyToken, getSingleAdmin);
router.put("/update/:id",verifyToken,upload.single("profile_picture"), updateAdmin);
router.delete("/delete/:id",verifyToken, deleteAdmin);
router.post("/change-password/:email_id", changePassword);

module.exports = router;
