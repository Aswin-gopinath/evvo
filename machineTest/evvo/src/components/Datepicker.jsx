import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

export default function BasicDatePicker({ value, onChange, minDate, maxDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={onChange}
        disablePast
        minDate={minDate}
        maxDate={maxDate}
        label="Select Date"
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
