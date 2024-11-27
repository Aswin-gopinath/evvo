import React, { useState } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BasicDatePicker from "./Datepicker";

export default function ApplyLeavePage() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    leave_type: "",
    start_date: null,
    end_date: null,
    comments: "",
    first_name: "",
    last_name: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { start_date, end_date, first_name, last_name } = formValues;

    if (!formValues.leave_type) {
      newErrors.leave_type = "Leave type is required.";
    }

    if (!start_date) {
      newErrors.start_date = "Start date is required.";
    } else if (dayjs(start_date).isBefore(dayjs(), "day")) {
      newErrors.start_date = "Start date cannot be in the past.";
    }

    if (!end_date) {
      newErrors.end_date = "End date is required.";
    } else if (start_date && dayjs(end_date).isBefore(start_date, "day")) {
      newErrors.end_date = "End date cannot be before start date.";
    } else if (
      start_date &&
      dayjs(end_date).diff(dayjs(start_date), "day") > 22
    ) {
      newErrors.end_date = "The maximum allowed leave duration is 22 days.";
    }

    if (!formValues.comments.trim()) {
      newErrors.comments = "Comments are required.";
    }

    if (!first_name.trim()) {
      newErrors.first_name = "First name is required.";
    }

    if (!last_name.trim()) {
      newErrors.last_name = "Last name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted Successfully", formValues);
      const res = await axios.post(
        "http://localhost:3001/addEmployee",
        formValues
      );
    }
  };

  const renderFormRow = (label, Component, error) => (
    <Box sx={{ display: "flex", gap: "2rem", marginTop: "10px" }}>
      <Typography sx={{ minWidth: "100px" }}>{label}</Typography>
      <Box sx={{ flexGrow: 1 }}>
        {Component}
        {error && (
          <Typography color="error" variant="caption">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
  const handleRouting = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{ px: "8rem", py: "4rem" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" gutterBottom onClick={handleRouting}>
        {`<-Go Back`}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Apply Leave
      </Typography>
      <FormControl fullWidth>
        {renderFormRow(
          "First Name",
          <TextField
            id="first_name"
            label="First Name"
            variant="outlined"
            value={formValues.first_name}
            onChange={(e) => handleInputChange("first_name", e.target.value)}
            sx={{ width: "100%" }}
          />,
          errors.first_name
        )}
        {renderFormRow(
          "Last Name",
          <TextField
            id="last_name"
            label="Last Name"
            variant="outlined"
            value={formValues.last_name}
            onChange={(e) => handleInputChange("last_name", e.target.value)}
            sx={{ width: "100%" }}
          />,
          errors.last_name
        )}
        {renderFormRow(
          "Leave Type",
          <Select
            labelId="leave-type-label"
            id="leave-type"
            value={formValues.leave_type}
            onChange={(e) => handleInputChange("leave_type", e.target.value)}
            sx={{ width: "100%" }}
          >
            <MenuItem value="sick">Sick</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="earned">Earned</MenuItem>
          </Select>,
          errors.leave_type
        )}
        {renderFormRow(
          "Start Date",
          <BasicDatePicker
            value={formValues.start_date}
            onChange={(date) => handleInputChange("start_date", date)}
            minDate={dayjs()}
          />,
          errors.start_date
        )}
        {renderFormRow(
          "End Date",
          <BasicDatePicker
            value={formValues.end_date}
            onChange={(date) => handleInputChange("end_date", date)}
            minDate={formValues.start_date || dayjs()}
            maxDate={
              formValues.start_date
                ? dayjs(formValues.start_date).add(22, "day")
                : null
            }
          />,
          errors.end_date
        )}
        {renderFormRow(
          "Comments",
          <TextField
            id="comments"
            label="Comments"
            variant="outlined"
            multiline
            rows={4}
            value={formValues.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            sx={{ width: "100%" }}
          />,
          errors.comments
        )}
      </FormControl>
      <Box sx={{ marginTop: "2rem", gap: "2rem", display: "flex" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ textTransform: "none" }}
        >
          Save
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="warning"
          style={{ textTransform: "none" }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
