import React from "react";
import { StyledTableRow, StyledTableCell } from "../data/TableStyle";
import { TableRow } from "@mui/material";
import DropDown from "./DropDown";
function TableRows(props) {
  const { row, data } = props;
  return (
    <StyledTableRow key={row?.name}>
      <StyledTableCell component="th" scope="row">
        {row?.firstName}
      </StyledTableCell>
      <StyledTableCell align="left">{row?.lastName}</StyledTableCell>
      <StyledTableCell align="left">{row?.email}</StyledTableCell>
      <StyledTableCell align="left">{row?.gender}</StyledTableCell>
      <StyledTableCell align="left">{row?.hobbies}</StyledTableCell>
      <StyledTableCell align="left">
        <DropDown data={row} />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default TableRows;
