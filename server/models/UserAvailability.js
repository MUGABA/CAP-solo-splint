const mongoose = require("mongoose");

const Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

const userAvailability = new Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserAvailability = mongoose.model(
  "userAvailability",
  userAvailability
);
