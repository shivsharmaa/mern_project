const mongoose = require('mongoose');

const ParkingSpaceSchema = new mongoose.Schema({
    slotNumber: {
        type: String,
        required: true,
        unique: true // Example: "P1", "P2"
    },

    flatId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flat',
        required: function(){
            return this.role !== 'guest'
        }
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    },
    
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    vehicleNumber: {
        type: String,
        unique : true,
        sparse: true
    },
    vehicleType: {
        type: String,
        enum: ["Four Wheeler", "Two Wheeler"]
    },
    status: {
        type: String,
        enum: ['occupied', 'vacant'],
        default: 'occupied'
    },
    role: {
        type: String,
        enum: ['owner', 'family', 'guest']
    }
}, { timestamps: true });

module.exports = mongoose.model('ParkingSpace', ParkingSpaceSchema);
