import React from "react";
import {
  TextField,
  Typography,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Paper,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import { validate } from "../data/validation";
import { useFirebase } from "../firebase/config";
import { Link } from "react-router-dom";

function SignUp() {
  const firebase = useFirebase();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      hobbies: "",
      email: "",
      type: "",
      city: "",
      password: "",
      salary: "",
    },
    validate,
    onSubmit: async (values) => {
      await firebase.signUpWithEmailAndPassword(values);
    },
  });

  return (
    <div style={{}}>
      <Paper
        style={{
          maxWidth: 700,
          margin: "3rem auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <div>
          <TextField
            size="small"
            name="email"
            placeholder="Enter Your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>{" "}
        {formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}
        <div>
          <TextField
            size="small"
            type="password"
            placeholder="Enter Your Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>{" "}
        {formik.errors?.password && (
          <div style={{ color: "red" }}>{formik.errors?.password}</div>
        )}
        <div>
          <TextField
            size="small"
            name="firstName"
            value={formik.values.firstName}
            placeholder="Enter Your Employee First Name"
            onChange={formik.handleChange}
          />
        </div>{" "}
        {formik.errors.firstName && (
          <div style={{ color: "red" }}>{formik.errors.firstName}</div>
        )}
        <div>
          <TextField
            size="small"
            placeholder="Enter Your Employee Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </div>{" "}
        {formik.errors.lastName && (
          <div style={{ color: "red" }}>{formik.errors.lastName}</div>
        )}
        <div>
          <TextField
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            size="small"
            placeholder="Enter City Name"
          />
        </div>
        <div>
          <TextField
            size="small"
            placeholder="Salary"
            onChange={formik.handleChange}
            value={formik.values.salary}
            name="salary"
          />
        </div>
        {formik.errors.salary && (
          <div style={{ color: "red" }}>{formik.errors.salary}</div>
        )}
        <div>
          <FormControl>
            <RadioGroup
              row
              placeholder="Gender"
              name="gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <FormControlLabel
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {formik.errors.gender && (
          <div style={{ color: "red" }}>{formik.errors.gender}</div>
        )}
        <div>
          <FormControl>
            <RadioGroup
              row
              name="type"
              placeholder="Job Designation"
              onChange={formik.handleChange}
              value={formik.values.type}
            >
              <FormControlLabel
                value="employee"
                control={<Radio size="small" />}
                label="Employee"
              />
              <FormControlLabel
                value="manager"
                control={<Radio size="small" />}
                label="Manager"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <TextField
            size="small"
            placeholder="Enter Your Hobbies"
            name="hobbies"
            value={formik.values.hobbies}
            onChange={formik.handleChange}
          />
        </div>
        {formik.errors.hobbies && (
          <div style={{ color: "red" }}>{formik.errors.hobbies}</div>
        )}
        <div>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
          >
            Sign Up
          </Button>
        </div>
        <Typography>
          Already Have a account.<Link to="/">Go to SignIn</Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default SignUp;
