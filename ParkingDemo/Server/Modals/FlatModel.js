const mongoose = require("mongoose");


// create schema

flatSchema = new mongoose.Schema({

    Flat_Number : {
        type : String,
        required : true,
        unique: true
    },

    Building: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Building"

    },

    Wing : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wing",
        required: true,
    },


});

flatSchema.set("timestamps", true);
flatSchema.index({createdAt: 1});

module.exports = mongoose.model("Flat", flatSchema);