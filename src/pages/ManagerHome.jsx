import React, { useEffect, useState } from "react";
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
import { useFirebase } from "../firebase/config";
import TableRows from "../components/TableRows";
import { StyledTableCell, StyledTableRow } from "../data/TableStyle";
import { useNavigate } from "react-router-dom";

function ManagerHome() {
  const Firebase = useFirebase();
  const [rows, setRows] = useState([]);
  const Navigate = useNavigate();

  const handleData = async () => {
    try {
      Firebase.getAllData().then((res) => setRows(res.docs));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!(Firebase.type === "manager") && !Firebase.LoggedIn) {
      console.log(Firebase.isLoggedIn, Firebase.LoggedIn, "Hello");
      Navigate("/");
    }
  }, [Firebase.LoggedIn]);
  useEffect(() => {
    handleData();
  }, []);
  return (
    <>
      <Paper style={{ maxWidth: "80%", margin: "2rem auto" }}>
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
        <Typography>Manager Logged IN</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>First Name</StyledTableCell>
                <StyledTableCell align="left">Last Name</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Gender</StyledTableCell>
                <StyledTableCell align="left">Hobbies </StyledTableCell>
                <StyledTableCell align="left">Department </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((el, index) => {
                return <TableRows key={index} row={el.data()} data={el} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default ManagerHome;
