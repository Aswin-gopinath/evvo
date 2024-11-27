const { default: mongoose} = require("mongoose");
const { Schema } = mongoose;

const LeaveDetailsSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "Users" },
  leave_type: String,
  start_date: Date,
  end_date: Date,
});

const LeaveDetails = mongoose.model("LeaveDetails", LeaveDetailsSchema);

module.exports = LeaveDetails;
