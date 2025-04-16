const mongoose = require("mongoose");

// Create schema
const flatSchema = new mongoose.Schema(
  {
    flatNumber: {
      type: String,
      required: true, // Ensures Flat_Number is always provided
     
    },
    floorNumber: {
      type: Number,
      required: true, // Ensures Floor_Number is always provided
    },
    wingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wing",
      required: true,
    },

    parkingSpaces: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ParkingSpace',
  }],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Ensure `createdAt` index for sorting
flatSchema.index({ createdAt: 1 });

module.exports = mongoose.model("Flat", flatSchema);
