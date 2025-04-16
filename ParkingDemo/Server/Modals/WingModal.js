const mongoose = require("mongoose");
const Building = require("./BuildingModal")

const wingSchema = new mongoose.Schema({


    wingName : {
        type: String,
        required : true,
    },

    totalFloor : {
        type : Number,
        required: true
    },

    buildingId : {
       type: mongoose.Schema.Types.ObjectId,
        ref: "Building",
        required: true
    },

    
});

wingSchema.set("timestamps", true);
wingSchema.index({createdAt : 1 });

module.exports = mongoose.model("Wing", wingSchema);

