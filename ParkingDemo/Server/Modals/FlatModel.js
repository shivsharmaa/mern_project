const mongoose = require("mongoose");

// Create schema
const flatSchema = new mongoose.Schema(
  {
    flatNumber: {
      type: String,
     
    },
    floorNumber: {
      type: Number,
    },

    wingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wing",
      
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
