const mongoose = require("mongoose");
require("dotenv").config();
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("connection successfull");
  } catch (error) {
    console.log(error, "error in db connection");
  }
}
module.exports = connectToDb;
