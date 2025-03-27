const mongoose = require("mongoose");
const Building = require("./BuildingModal")

const wingSchema = new mongoose.Schema({


    Wname : {
        type: String,
        required : true,
    },

    Total_Floor : {
        type : Number,
        required: true
    },

    Building : {
       type: mongoose.Schema.Types.ObjectId,
        ref: "Building",
        required: true
    },

    Address : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    }
});

wingSchema.set("timestamps", true);
wingSchema.index({createdAt : 1 });

module.exports = mongoose.model("Wing", wingSchema);

