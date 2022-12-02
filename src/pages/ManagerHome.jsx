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
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useFirebase } from "../firebase/config";
import TableRows from "../components/TableRows";
import { StyledTableCell, StyledTableRow } from "../data/TableStyle";
import { useNavigate } from "react-router-dom";

function ManagerHome() {
  const Firebase = useFirebase();
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState(null);
  const Navigate = useNavigate();
  const handleQuery = async (e) => {
    const data = await Firebase.handleQueryManager(e.target.value);
    await setRows(data);
    setQuery(e.target.value);
  };
  const handleData = async () => {
    try {
      const res = await Firebase.getAllData();
      await setRows(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!Firebase.LoggedIn) {
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
        <FormControl>
          <Typography>Job Designation</Typography>
          <RadioGroup row name="type" onChange={handleQuery} value={query}>
            <FormControlLabel
              value="1"
              control={<Radio size="small" />}
              label="Max.Salary in HR Dept."
            />
            <FormControlLabel
              value="2"
              control={<Radio size="small" />}
              label="Min.Salary in IT Dept."
            />{" "}
            <FormControlLabel
              value="3"
              control={<Radio size="small" />}
              label="Employee in IT with Surat"
            />
            <FormControlLabel
              value="4"
              control={<Radio size="small" />}
              label="Employee in IT & city Name with A"
            />{" "}
            <FormControlLabel
              value="5"
              control={<Radio size="small" />}
              label="Employee in Sales Department"
            />
            <FormControlLabel
              value="6"
              control={<Radio size="small" />}
              label="All Employee"
            />
          </RadioGroup>
        </FormControl>
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
                <StyledTableCell align="left">City </StyledTableCell>
                <StyledTableCell align="left">Salary </StyledTableCell>
                <StyledTableCell align="left">Department </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((el, index) => {
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
