const mongoose = require("mongoose");
const Building = require("./BuildingModal");
const Wing = require("./WingModal");


const ownerSchema = new mongoose.Schema({

    Owner_Name : {
        type : String,
        required : true,
    },
    Family_Count : {
        type : Number,
        required : true,
    },

    Contact_Number : {
        type : String,
        require: true
    },

    Vehicle_Count : {
        type : Number,
        required : true,
    },

    Vehicle_Details: [{
    Vehicle_Type: {
        type: String,
        enum: ["Four Wheeler", "Two Wheeler"],
        required: true,
    },
    Vehicle_Number: {
        type: String,
        required: true
    }
}],

    Building : {
         type: mongoose.Schema.Types.ObjectId,
            ref : "Building",
            required : true
    },

    Wing : {
         type: mongoose.Schema.Types.ObjectId,
            ref : "Wing",
            required : true
    },

    Flat : {
         type: mongoose.Schema.Types.ObjectId,
            ref : "Flat",
            required : true
    }
});

module.exports = mongoose.model("Owner", ownerSchema);