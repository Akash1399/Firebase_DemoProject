import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { useFirebase } from "../firebase/config";
function DropDown(props) {
  const { data } = props;
  const Firebase = useFirebase();
  const [age, setAge] = useState("");
  const [edit, setEdit] = useState(false);
  const [manager, setManager] = useState(false);
  useEffect(() => {
    const value = window.location.href.split("/").includes("manager");
    if (value) {
      setManager(true);
    }
  }, []);
  const handleChange = (e) => {
    Firebase.updateDepartment(data, e.target.value);
    setAge(e.target.value);
  };
  // useEffect(() => {
  //   setAge(data.department);
  // }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        {edit ? (
          <FormControl
            variant="standard"
            sx={{ maxHeight: 2, minWidth: "50px" }}
            // size="small"
          >
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={age}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"IT"}>IT</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
              <MenuItem value={"Sales"}>Sales</MenuItem>
              <MenuItem value={"Marketing"}>Marketing</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Typography>{data?.department}</Typography>
        )}
      </div>
      {manager && (
        <div>
          <Button
            size="small"
            onClick={() =>
              setEdit((prev) => {
                return !prev;
              })
            }
          >
            edit
          </Button>
        </div>
      )}
    </div>
  );
}

export default DropDown;
