const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    
    Area: {
        type: String
    },
    City : {
        type: String,
        required : true
    },
    State: {
        type: String,
        required : true,
    },
    Country : {
        type: String,
        required : true
    },
    Zip: {
        type: String,
        required: true
    }
});

addressSchema.set("timestamps", true);
addressSchema.index({ createdAt : 1 })

module.exports = mongoose.model("Address", addressSchema);