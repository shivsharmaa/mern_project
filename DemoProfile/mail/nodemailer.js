// const nodemailer = require("nodemailer");
// const crypto = require("crypto"); // For generating a unique token
// const Admin = require("../models/Admin"); // Your Admin model
// const dotenv = require("dotenv");

// dotenv.config(); // To load environment variables

// exports.forgotPassword = async (req, res) => {
//     try {
//         const { email_id } = req.body;
//         console.log("Received Email:", email_id);

//         // Find admin by email
//         const admin = await Admin.findOne({ email_id });
//         if (!admin) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Admin with this email does not exist",
//             });
//         }

//         // Generate a secure reset token
//         const resetToken = crypto.randomBytes(32).toString("hex");
//         const resetTokenExpire = Date.now() + 3600000; // Token valid for 1 hour

//         // Save token and expiration in database (assuming Admin model has these fields)
//         admin.resetPasswordToken = resetToken;
//         admin.resetPasswordExpire = resetTokenExpire;
//         await admin.save();

//         // Generate reset link
//         const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

//         // Email transporter
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             secure: true,
//             auth: {
//                 user: "sharmaa.shiv54@gmail.com",
//             pass: "hfqkyuuazfghngjn"
//             },
//         });

//         // Email content
//         const mailOptions = {
//             from: "sharmaa.shiv54@gmail.com",
//             to: email,
//             subject: "Password Reset Request",
//             text: `Hello, \n\nPlease use the following link to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
//         };

//         // Send email
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({
//             success: true,
//             message: "Password reset email sent successfully",
//         });
//     } catch (error) {
//         console.error("Error in forgotPassword API:", error);
//         res.status(500).json({
//             success: false,
//             message: "Server error. Please try again later.",
//         });
//     }
// };
