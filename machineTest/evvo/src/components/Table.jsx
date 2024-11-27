import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ employeeData = [] }) {
  return (
    <div className="table-style">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Employee Name</StyledTableCell>
              <StyledTableCell align="center">Sick Leaves</StyledTableCell>
              <StyledTableCell align="center">Casual Leaves</StyledTableCell>
              <StyledTableCell align="center">Earned Leaves</StyledTableCell>
              <StyledTableCell align="center">
                Total Number of Leaves
              </StyledTableCell>
              <StyledTableCell align="center">
                Total Number of Availed Leaves
              </StyledTableCell>
              <StyledTableCell align="center">Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((item) => {
              const totalLeaves =
                item?.sickLeaves + item?.casualLeaves + item?.earnedLeaves;
              const availedLeaves = item?.availedLeaves || 0;

              return (
                <StyledTableRow key={item?._id}>
                  <StyledTableCell align="center">
                    {`${item?.first_name} ${item.last_name}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.sickLeaves}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.casualLeaves}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {item?.earnedLeaves}
                  </StyledTableCell>
                  <StyledTableCell align="center">25</StyledTableCell>
                  <StyledTableCell align="center">
                    {totalLeaves}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {totalLeaves - availedLeaves}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
