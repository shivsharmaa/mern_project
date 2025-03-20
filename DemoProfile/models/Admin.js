const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({

    profile : {
        type : String
    },

    email_id : {
        type: String,
        lowercase: true,
        unique: true,
        trim : true,
        default: null
    },

    password: {
        type: String,
    },

    name: {
        type: String
    },

    is_account_active: {
        type: Boolean,
        default: false
    },

    phone_number:{
        type: String,
        unique:true
    },
    adminType: {
        type: String,
        default : "admin",
    },

    last_login:{
        type: Date,
        default: Date.now()
        // at fetching time utc time in ist time
    },
    token : {
        type : String
    },

    time_stamp:{
        type: Date,
        default: Date.now()
    },
    

    

    created : {
        type: Date,
        default: Date.now()
    }

});

adminSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRE || '4h',
    })
}

// hashing
adminSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//compare password
adminSchema.methods.comparePassword = async function(password) {
        return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("Admin", adminSchema)