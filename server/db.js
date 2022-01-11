const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  let conn;
  if (process.env.NODE_ENV === "test") {
    conn = await mongoose.connect(process.env.MONGO_URI_TEST);
  } else {
    conn = await mongoose.connect(process.env.MONGO_URI);
  }

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
