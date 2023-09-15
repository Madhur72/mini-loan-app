import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import LoanApplicationForm from "../src/Components/LoanApplicationForm";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard"; // Import the AdminDashboard component

const App = () => {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/loanForm" element={<LoanApplicationForm />} />
        <Route exact path="/admin" element={<AdminDashboard />} /> {/* Define the admin route */}
      </Routes>
    </Container>
  );
};

export default App;
