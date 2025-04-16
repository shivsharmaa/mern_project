const mongoose = require("mongoose");
const Building = require("./BuildingModal");
const Wing = require("./WingModal");


const ownerSchema = new mongoose.Schema({

    ownerName : {
        type : String,
        required : true,
    },
    familyCount : {
        type : Number,
        required : true,
    },

    contactNumber : {
        type : String,
        required: true
    },
    emailId : {
        type : String,
       
        

    },

    vehicleCount : {
        type : Number,
        required : true,
    },

    vehicleDetails: [{
    vehicleType: {
        type: String,
        enum: ["Four Wheeler", "Two Wheeler"],
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique : true
    }
}],


    flatId : {
         type: mongoose.Schema.Types.ObjectId,
            ref : "Flat",
            required : true,
            unique : true
    }
});

module.exports = mongoose.model("Owner", ownerSchema);