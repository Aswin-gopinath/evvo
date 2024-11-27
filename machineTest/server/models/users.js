const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  emailId: String,
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
