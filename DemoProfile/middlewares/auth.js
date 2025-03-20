const jwt = require("jsonwebtoken");
require("dotenv").config();
const { expressjwt: expressJwt } = require("express-jwt");
const Admin = require("../models/Admin");

exports.verifyToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];

  const admin = await Admin.findOne({ token: token });
  if (admin) {
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
    } catch (err) {
      return res.status(644).send("Invalid token or expired");
    }
  } else {
    return res.status(644).send("Session timeout");
  }

  return next();
};

exports.isSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});
