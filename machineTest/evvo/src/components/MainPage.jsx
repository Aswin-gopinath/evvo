import { Button } from "@mui/material";
import CustomizedTables from "./Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [employeeData, setEmployeeData] = useState([]);
  const navigate = useNavigate();

  const getAllEmployeesLeaves = async () => {
    const res = await axios.get("http://localhost:3001/getAllEmployees");
    setEmployeeData(res?.data?.data);
  };

  useEffect(() => {
    getAllEmployeesLeaves();
  }, []);

  const handleRouting = () => {
    navigate("/apply-leave");
  };

  return (
    <div>
      <h3
        style={{
          paddingLeft: "8rem",
          paddingRight: "8rem",
          paddingTop: "4rem",
        }}
      >
        Dashboard
      </h3>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "8px",
            paddingRight: "8rem",
          }}
        >
          <Button
            style={{
              border: "1px solid green",
              textTransform: "none",
              color: "black",
              fontWeight: "600",
            }}
            onClick={handleRouting}
          >
            Apply Leave
          </Button>
        </div>
        <CustomizedTables employeeData={employeeData} />
      </div>
    </div>
  );
}
