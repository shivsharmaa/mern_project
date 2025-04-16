const mongoose = require('mongoose')

const familyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true, // important for identifying the family member
  },
  flatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flat', // assuming you have a Flat model
    required: true,
  },
  relationWithOwner: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("FamilyMember", familyMemberSchema)