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
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      await firebase.signUpWithEmailAndPassword(values);
    },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div>
        <Typography>Enter Your Email</Typography>
        <TextField
          size="small"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </div>{" "}
      {formik.errors.email && (
        <div style={{ color: "red" }}>{formik.errors.email}</div>
      )}
      <div>
        <Typography>Enter Your Password</Typography>
        <TextField
          size="small"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </div>{" "}
      {formik.errors?.password && (
        <div style={{ color: "red" }}>{formik.errors?.password}</div>
      )}
      <div>
        <Typography>Enter Your Employee First Name</Typography>
        <TextField
          size="small"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
      </div>{" "}
      {formik.errors.firstName && (
        <div style={{ color: "red" }}>{formik.errors.firstName}</div>
      )}
      <div>
        <Typography>Enter Your Employee Last Name</Typography>
        <TextField
          size="small"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
      </div>{" "}
      {formik.errors.lastName && (
        <div style={{ color: "red" }}>{formik.errors.lastName}</div>
      )}
      <div>
        <FormControl>
          <Typography>Gender</Typography>
          <RadioGroup
            row
            name="gender"
            onChange={formik.handleChange}
            value={formik.values.gender}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </div>
      {formik.errors.gender && (
        <div style={{ color: "red" }}>{formik.errors.gender}</div>
      )}
      <div>
        <FormControl>
          <Typography>Job Designation</Typography>
          <RadioGroup
            row
            name="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          >
            <FormControlLabel
              value="employee"
              control={<Radio />}
              label="Employee"
            />
            <FormControlLabel
              value="manager"
              control={<Radio />}
              label="Manager"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div>
        <Typography>Enter Your Employee Hobbies</Typography>
        <TextField
          size="small"
          name="hobbies"
          value={formik.values.hobbies}
          onChange={formik.handleChange}
        />
      </div>
      {formik.errors.hobbies && (
        <div style={{ color: "red" }}>{formik.errors.hobbies}</div>
      )}
      <div>
        <Button type="submit" variant="contained" onClick={formik.handleSubmit}>
          Sign Up
        </Button>
      </div>
      <Typography>
        Already Have a account.<Link to="/">Go to SignIn</Link>
      </Typography>
    </div>
  );
}

export default SignUp;
