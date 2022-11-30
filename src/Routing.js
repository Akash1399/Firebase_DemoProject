import React from "react";
import { Route, Routes } from "react-router-dom";
import Employee from "./pages/Employee";
import ManagerHome from "./pages/ManagerHome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/manager" element={<ManagerHome />} />
      <Route path="/employee/:uid" element={<Employee />} />
    </Routes>
  );
}

export default Routing;
