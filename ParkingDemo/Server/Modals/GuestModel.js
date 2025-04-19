const mongoose = require('mongoose');

const guestVehicleSchema = new mongoose.Schema({

    guestName : {
        type: String,
        
    },
    vehicleNumber: {
        type: String,
        
      },

   vehicleType: {
    type: String,
    enum: ['Four Wheeler', 'Two Wheeler'],
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },

    flatId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Flat",
        // required : true,
        
    },

    assignedParkingSlot: {
    type: String, // Example: "P1", "P2" (Parking Slot Number)
    required: true,
  },
  arrivalTime: {
    type: Date,
    default: Date.now,
  },
  departureTime: {
    type: Date,
  }



}, { timestamps: true });

module.exports = mongoose.model("Guest", guestVehicleSchema)