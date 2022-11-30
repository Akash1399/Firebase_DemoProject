import React, { useEffect } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/config";
import { Link } from "react-router-dom";
function SignIn() {
  const Firebase = useFirebase();
  const Navigate = useNavigate;
  useEffect(() => {
    if (!Firebase.type && Firebase.LoggedIn) {
      Navigate(`/${Firebase.type}`);
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      Firebase.signInWithEmailAndPass(values);
      console.log(values);
    },
  });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        style={{
          minWidth: 50,
          minHeight: 90,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <Typography variant="h5">Sign In Employee</Typography>
        <div>
          <Typography>Enter Your Email</Typography>
          <TextField
            size="small"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          <Typography>Enter Your Password</Typography>
          <TextField
            size="small"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div>
          <Button variant="contained" onClick={formik.handleSubmit}>
            Sign In
          </Button>
        </div>
        <Typography>
          Don't Have an account <Link to="/signup">Create an Account ?</Link>
        </Typography>
      </Paper>
    </div>
  );
}

export default SignIn;
