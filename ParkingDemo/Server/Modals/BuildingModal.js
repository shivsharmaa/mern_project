const mongoose = require("mongoose");
const Address = require("./AddressModal")

const buildingSchema = new mongoose.Schema({
 
  Name: {
    type: String,
    required : true,
  },
  Address: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Address"
  },
});

buildingSchema.set("timestamps", true);
buildingSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Building", buildingSchema);
