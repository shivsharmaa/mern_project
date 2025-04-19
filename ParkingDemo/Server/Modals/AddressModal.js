const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    
    area: {
        type: String
    },

    city : {
        type: String,
    
    },
    state: {
        type: String,
       
    },
    country : {
        type: String,
        
    },
    zip: {
        type: String,
        
    }
}, { timestamps: true });
addressSchema.index({ createdAt : 1 })

module.exports = mongoose.model("Address", addressSchema);