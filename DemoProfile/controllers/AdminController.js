const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();



exports.insertAdmin = async (req, res) => {

  try {
    const { name, email_id, password, is_account_active, phone_number } =
      req.body;
    console.log(req.body);
    console.log(email_id);

    // File validation
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Profile image is required." });
    }

    const profileImagePath = req.file.path; // Path to the uploaded image

    const normalizedEmail = email_id;

    //find user
    let admin = await Admin.findOne({ email_id: normalizedEmail });
    // console.log(admin);

    if (admin) {
      return res.status(200).json({
        success: false,
        message: "Admin Already exist",
      });
    }

    //create admin
    admin = await Admin.create({
      profile: profileImagePath,
      name,
      email_id: normalizedEmail,
      password,
      is_account_active,
      phone_number,
    });

    // generate JWT token
    const token = admin.getJWTToken();

    //save token
    admin.token = token;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin created Successfully",
      data: admin,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!!");
  }
};

//------------------------------login ----------------------------------------
exports.loginAdmin = async (req, res) => {
  try {
    const { email_id, password } = req.body;
    console.log("Received request:", req.body);

    const normalizedEmail = email_id.toLowerCase();
    // check email and password
    if (!normalizedEmail || !password) {
      return res.send(400).json({
        success: false,
        message: "Please correct email and password",
      });
    }

    // find user
    let admin = await Admin.findOne({ email_id: normalizedEmail }).select(
      "+password"
    );
    console.log(admin);

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "invalid email or password",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    //if password not matched
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Generated JWT
    token = admin.getJWTToken();
    console.log(token);

    // Save User Token
    admin.token = token;
    await admin.save();

    console.log(admin);
    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: admin,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).send("Something went wrong.");
  }
};

// -------------------------- Get ALL Admin ---------------------------

exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();

    res.status(200).json({
      success: true,
      message: "All admin details are retrieved",
      data: admins,
    });
  } catch (err) {
    console.log(err);
    
  }
};

// ----------------------------- get Single Admin -------------------------

exports.getSingleAdmin = async (req, res) => {
  try {
    const singleAdmin = await Admin.findById(req.params.id);
    if (!singleAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "successfully fetch",
      data: singleAdmin,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Something went wrong while fetching user data",
    });
  }
};

// ------------------ update --------------------------------

exports.updateAdmin = async (req, res) => {

  
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    let profile_picture = req.file ? req.file.path : null; // Get the uploaded file path if it exists
    
    
    if (req.file && admin.profile) {
      const oldFilePath = path.resolve(admin.profile);
      fs.unlink(oldFilePath, (err) => {
        if (err) {
          console.error("Error deleting old profile picture:", err);
        } else {
          console.log("Old profile picture deleted successfully");
        }
      });
    }

    const updateData = {
      ...req.body,  // Include the fields from the request body (name, phone_number, etc.)
      profile: profile_picture, // Add the profile picture path (if uploaded)
    };
    
    console.log("Update Data:", updateData);
    const updateAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "User update successfully",
      data: updateAdmin,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong.");
  }
};

//---------------------- delete API ----------------------------------------

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted Successfullly",
      data: admin,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong.");
  }
};

// -----------------logout API -------------------------

exports.logoutAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email_id });

    if (!admin) {
      res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    let removeAdmin = admin;
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Admin not found",
    });
  }
};

// ------------ forgot password----------------------------

exports.forgotPassword = async (req, res) => {
  try {
    const { email_id} = req.params;
    console.log(email_id);
    
    if (!email_id) {
      return res.status(400).json({
        message: "Please provide email",
      });
    }

    const checkUser = await Admin.findOne({ email_id });
    console.log(checkUser);

    if (!checkUser) {
      return res
        .status(400)
        .send({ message: "Admin not found please register" });
    }

    const token = jwt.sign({ email_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: "sharmaa.shiv54@gmail.com",
      to: email_id,
      subject: "Password reset request",
      text: `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token}`,
    };

    await transporter.sendMail(receiver);
    return res.status(200).send({
      message: "password reset link send to successfully on your gmail account",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

// ---------------------- reset password -------------------------------

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    console.log("Token:", req.params.token); // Should log the token
console.log("Body:", req.body); // Should log { newPassword: "value" }
    console.log("-------------", req.body);

    console.log("token", token);
    console.log("Password", newPassword);

    if (!newPassword) {
      return res.status(400).send({ message: "Please provide password" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decode: ", decode);

    const admin = await Admin.findOne({ email_id: decode.email_id });
    console.log("Admin: ", admin);

    const newHashPassword = await bcrypt.hash(newPassword, 10);
    console.log("newHashPassword: ", newHashPassword);

    await Admin.findByIdAndUpdate(admin._id, { password: newHashPassword });
 
    admin.save();
    return res.status(200).send({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong!" });
  }
};

// // ---------------------- change  password -------------------------------

exports.changePassword = async (req, res) => {
  const {email_id, currPassword, newPassword, confirmPassword } = req.body;
  console.log(req.body);
  
  if (!email_id || !currPassword || !newPassword || !confirmPassword) {
    return res
    .status(400)
    .send({ message: "Please provide all required fields" });
  }
  try {

   
      const checkAdmin = await Admin.findOne({ email_id });
      console.log(checkAdmin);

      if (!checkAdmin) {
        return res
          .status(400)
          .send({ message: "Admin not found please register" });
      }

      const isMatchedPassword = await bcrypt.compare(
        currPassword,
        checkAdmin.password
      );
      console.log("isMatchedPassword", isMatchedPassword);


      if (!isMatchedPassword) {
        return res
          .status(400)
          .send({ message: "Current password does not matched" });
      }

      if(newPassword !== confirmPassword){
        return res.status(400).json({ message: 'New password and confirm password do not match' });
      }
        const newHashPassword = await bcrypt.hash(newPassword, 10);
        await Admin.updateOne({ email_id }, { password: newHashPassword });
        console.log(await Admin.updateOne({ email_id }, { password: newHashPassword }));
        
        return res.status(200).json({ message: 'Password updated successfully' });
    
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Internal Server Error." });
  }
};

// -------------------------------------------------------------------
