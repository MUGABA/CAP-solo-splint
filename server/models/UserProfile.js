const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const userProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
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
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserProfile = mongoose.model("userProfile", userProfileSchema);
