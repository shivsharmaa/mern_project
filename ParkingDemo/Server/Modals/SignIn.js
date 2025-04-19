const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FamilyMemberSignIn = require('./FamilyMemberSignIn');

const signInSchema = new mongoose.Schema({

    name : {
        type: String,
     },
     
     mobileNumber : {
        type : String,

    },

    password : {
        type :String,
    },
    

     flatId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Flat",
     },

     role: {
        type : String,
        enum : ['Owner', 'Family Member', 'Admin'],
     },

     token : {
        type: String
     },

     isActive : {
        type : Boolean,
        default : true
     }
}, { timestamps: true });

signInSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRE || '2h',
    })
}

signInSchema.pre("save", async function () {
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//compare password
signInSchema.methods.comparePassword = async function(password) {
        return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("SignIn", signInSchema);

