import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../firebase/config";
import TableRows from "../components/TableRows";
import { StyledTableCell, StyledTableRow } from "../data/TableStyle";

function Employee() {
  const [rows, setRows] = useState({});
  const { uid } = useParams();
  const Firebase = useFirebase();
  const Navigate = useNavigate();
  useEffect(() => {
    Firebase.getEmployeeData(uid).then((res) => {
      setRows(res);
    });
  }, [uid]);
  useEffect(() => {
    if (!(Firebase.type === "employee") && !Firebase.LoggedIn) {
      Navigate("/");
    }
  }, [Firebase.isLoggedIn, Firebase.LoggedIn]);
  return (
    <Paper sx={{ maxWidth: "80%", margin: "3rem auto" }}>
      <Paper
        sx={{
          // position: "fixed",
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button onClick={() => Firebase.logOut()} variant="contained">
          SignOUT
        </Button>
      </Paper>
      <Typography>Employee Logged IN</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="left">Last Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Gender</StyledTableCell>
              <StyledTableCell align="left">Hobbies </StyledTableCell>
              <StyledTableCell align="left">City </StyledTableCell>
              <StyledTableCell align="left">Salary </StyledTableCell>

              <StyledTableCell align="left">Department </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRows key={rows?.uid} row={rows} />
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Employee;
