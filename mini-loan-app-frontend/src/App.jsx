import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import LoanApplicationForm from "../src/Components/LoanApplicationForm";
const App = () => {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route exact path="/" Component={LoanApplicationForm} />
      </Routes>
    </Container>
  );
};

export default App;
