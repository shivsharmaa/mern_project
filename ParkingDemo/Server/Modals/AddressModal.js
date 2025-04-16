const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    
    area: {
        type: String
    },
    city : {
        type: String,
        required : true
    },
    state: {
        type: String,
        required : true,
    },
    country : {
        type: String,
        required : true
    },
    zip: {
        type: String,
        required: true
    }
});

addressSchema.set("timestamps", true);
addressSchema.index({ createdAt : 1 })

module.exports = mongoose.model("Address", addressSchema);