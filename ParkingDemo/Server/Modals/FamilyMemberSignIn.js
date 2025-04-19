const mongoose = require('mongoose')

const familyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  mobileNumber: {
    type: String,
     
  },
  flatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flat', // assuming you have a Flat model
    
  },
  relationWithOwner: {
    type: String,
   
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("FamilyMember", familyMemberSchema)