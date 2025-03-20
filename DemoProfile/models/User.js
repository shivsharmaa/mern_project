const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true
    },
    email_id:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: null,
        index: true,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    password:{
        type: String,
        required: true,
    },



    time_stamp:{
        type: String,
        default: Math.round(Math.random()* 10 + 1)
    },

    created: {
        type: Date,
        default: Date.now()
    }
});


// JWT 
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

module.exports = mongoose.model("User", userSchema)