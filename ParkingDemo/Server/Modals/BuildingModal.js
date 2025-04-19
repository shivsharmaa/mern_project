const mongoose = require("mongoose");
const Address = require("./AddressModal")

const buildingSchema = new mongoose.Schema({
 
  name: {
    type: String,
    
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Address"
  },
}, { timestamps: true });
buildingSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Building", buildingSchema);
