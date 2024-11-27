require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/connectToDB");
const Users = require("./models/users");
const LeaveDetails = require("./models/leave");
const cors = require("cors");

const app = express();

connectToDB();
app.use(express.json());
app.use(cors());

app.get("/getAllEmployees", async (req, res) => {
  try {
    const response = await LeaveDetails.aggregate([
      {
        $group: {
          _id: "$user_id",
          sickLeaves: {
            $sum: {
              $cond: [{ $eq: ["$leave_type", "sick"] }, 1, 0],
            },
          },
          casualLeaves: {
            $sum: {
              $cond: [{ $eq: ["$leave_type", "casual"] }, 1, 0],
            },
          },
          earnedLeaves: {
            $sum: {
              $cond: [{ $eq: ["$leave_type", "earned"] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          user_id: "$_id",
          last_name: "$userDetails.first_name",
          first_name: "$userDetails.last_name",
          sickLeaves: 1,
          casualLeaves: 1,
          earnedLeaves: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "Data fetched successfully",
      data: response,
    });
  } catch (error) {
    console.log("Error fetching data:", error.message);
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
    });
  }
});

app.put("/updateEmployee/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, emailId, leave_type, start_date, end_date } =
    req.body;

  try {
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { first_name, last_name, emailId },
      { new: true }
    );

    const updatedLeave = await LeaveDetails.findOneAndUpdate(
      { user_id: id },
      { leave_type, start_date, end_date },
      { new: true }
    );

    res.status(200).json({
      message: "User and leave details updated successfully",
      data: { user: updatedUser, leave: updatedLeave },
    });
  } catch (error) {
    console.error("Error updating user or leave details:", error.message);
    res.status(500).json({
      message: "Error updating user or leave details",
      error: error.message,
    });
  }
});

app.delete("/deleteEmployee/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await LeaveDetails.deleteMany({ user_id: id });

    await Users.findByIdAndDelete(id);

    res.status(200).json({
      message: "User and leave details deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user or leave details:", error.message);
    res.status(500).json({
      message: "Error deleting user or leave details",
      error: error.message,
    });
  }
});

app.post("/addEmployee", async (req, res) => {
  const { first_name, last_name, emailId, leave_type, start_date, end_date } =
    req.body;

  try {
    const user = new Users({
      first_name,
      last_name,
      emailId,
    });

    const savedUser = await user.save();

    const leaveDetails = new LeaveDetails({
      user_id: savedUser._id,
      leave_type,
      start_date,
      end_date,
    });

    await leaveDetails.save();

    res.status(200).json({
      message: "User and leave details added successfully",
    });
  } catch (error) {
    console.error("Error adding user or leave details:", error.message);
    res.status(500).json({
      message: "Error adding user or leave details",
      error: error.message,
    });
  }
});

app.listen(process.env.PORT);
