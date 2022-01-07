const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["MALE", "FEMALE"],
    retuired: true,
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  availablity: {
    type: Boolean,
    default: true,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserProfile = mongoose.model("userProfile", userProfileSchema);
