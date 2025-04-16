const mongoose = require("mongoose");
const Address = require("./AddressModal")

const buildingSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required : true,
    unique: true
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Address"
  },
});

buildingSchema.set("timestamps", true);
buildingSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Building", buildingSchema);
