import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const App = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [loanApplications, setLoanApplications] = useState([]);
  const apiUrl = "http://localhost:3001"; // Replace with your backend API URL

  const fetchLoanApplications = async () => {
    try {
      const response = await fetch(`${apiUrl}/loans`);
      if (!response.ok) {
        throw new Error("Failed to fetch loan applications");
      }
      const data = await response.json();
      setLoanApplications(data);
    } catch (error) {
      console.error("Error fetching loan applications:", error);
    }
  };

  const submitLoanApplication = async () => {
    try {
      const newLoanApplication = {
        amount: loanAmount,
        term: loanTerm,
        date: loanDate,
        status: "PENDING",
      };

      const response = await fetch(`${apiUrl}/loans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLoanApplication),
      });

      if (!response.ok) {
        throw new Error("Failed to submit loan application");
      }

      fetchLoanApplications();

      setLoanAmount("");
      setLoanTerm("");
      setLoanDate("");
    } catch (error) {
      console.error("Error submitting loan application:", error);
    }
  };

  useEffect(() => {
    fetchLoanApplications();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Loan Application Form
      </Typography>
      <form onSubmit={submitLoanApplication}>
        <TextField
          label="Amount Required"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />
        <TextField
          label="Loan Term (weeks)"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          required
        />
        <TextField
          label="Loan Start Date"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={loanDate}
          onChange={(e) => setLoanDate(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit Application
        </Button>
      </form>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchLoanApplications}
        >
          Loan Applications
        </Button>
        <List>
          {loanApplications.map((application, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Status: ${application.status}`}
              />
              <ListItemText
                primary={`Amount: ${application.amount}`}
                secondary={`Term: ${application.term} weeks`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default App;
