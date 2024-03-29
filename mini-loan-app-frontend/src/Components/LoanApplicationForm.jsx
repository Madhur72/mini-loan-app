import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  List,
  ListItem,
} from "@mui/material";
import { auth } from "../firebase";
const LoanApplicationForm = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [interest, setInterest] = useState("");
  const [loanApplications, setLoanApplications] = useState([]);
  const [repaymentAmount, setRepaymentAmount] = useState("");
  const apiUrl = "http://localhost:3001";

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
  function calculateWeeklyRepayments(amount, term, startDate,extra) {
    // Parse the input values
    const totalLoanAmount = parseFloat(amount)+parseFloat(extra);
    const totalLoanTerm = parseInt(term, 10);
    const startDateObj = new Date(startDate);

    const repaymentAmount = totalLoanAmount / totalLoanTerm;

    const repayments = [];

    for (let i = 1; i <= totalLoanTerm; i++) {
      const repaymentDate = new Date(startDateObj);
      repaymentDate.setDate(startDateObj.getDate() + 7 * i);
      const formattedDate = repaymentDate.toDateString();
      repayments.push({
        date: formattedDate,
        amount: repaymentAmount.toFixed(2),
        Status: "PENDING",
      });
    }

    return repayments;
  }

  const repayLoan = async (loanId) => {
    try {
      const selectedLoan = loanApplications.find((app) => app.id === loanId);
      const UID = selectedLoan.userId;
      if (selectedLoan && selectedLoan.repayments) {
        const pendingRepaymentIndex = selectedLoan.repayments.findIndex(
          (repayment) => repayment.Status === "PENDING"
        );

        if (pendingRepaymentIndex !== -1) {
          selectedLoan.repayments[pendingRepaymentIndex].Status = "PAID";
          if (
            selectedLoan.repayments.every(
              (repayment) => repayment.Status === "PAID"
            )
          ) {
            selectedLoan.Status = "PAID";
          }

          const response = await fetch(
            `${apiUrl}/loans/${UID}/${loanId}/repayments/${pendingRepaymentIndex}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                Status: "PAID",
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to update repayment status");
          }

          setLoanApplications([...loanApplications]);
          console.log(loanApplications);
        }
      }
    } catch (error) {
      console.error("Error repaying loan:", error);
    }
  };

  const submitLoanApplication = async () => {
    const extra = (parseFloat(interest)*loanAmount/100)
    try {
      const weeklyRepayments = calculateWeeklyRepayments(
        loanAmount,
        loanTerm,
        loanDate,
        extra
      );

      const newLoanApplication = {
        amount: parseFloat(loanAmount)+extra,
        term: loanTerm,
        date: loanDate,
        Status: "PENDING",
        userId: null,
        repayments: weeklyRepayments,
      };
      const user = auth.currentUser;
      if (user) {
        newLoanApplication.userId = user.uid;
      }
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
      setInterest("");
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
          label="Interest rate(%)"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
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
        <Typography variant="h5">Loan Applications</Typography>
        <List>
          {loanApplications.map((application, index) => (
            <ListItem key={index}>
              <div>
                <Typography variant="h6">
                  Status: {application.Status}
                </Typography>
                <Typography>Amount: {application.amount}</Typography>
                <Typography>Term: {application.term} weeks</Typography>
                {application.Status === "APPROVED" && (
                  <>
                    <TextField
                      label="Repayment Amount"
                      type="number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={repaymentAmount}
                      onChange={(e) => setRepaymentAmount(e.target.value)}
                    />

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => repayLoan(application.id, repaymentAmount)}
                    >
                      Repay Loan
                    </Button>
                  </>
                )}
              </div>
              {application.repayments && application.repayments.length > 0 && (
                <div>
                  <List>
                    {application.repayments.map((repayment, repaymentIndex) => (
                      <ListItem key={repaymentIndex}>
                        <div>
                          <Typography fontWeight="bold">
                            Repayment {repaymentIndex + 1}
                          </Typography>
                          <Typography>Amount: {repayment.amount}</Typography>
                          <Typography>Date: {repayment.date}</Typography>
                          <Typography>Status: {repayment.Status}</Typography>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </div>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default LoanApplicationForm;
