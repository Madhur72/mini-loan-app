// AdminDashboard.js

import React, { useState, useEffect } from "react";
import {
  Button,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { auth } from "../firebase";

const AdminDashboard = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const apiUrl = "http://localhost:3001"; // Replace with your backend API URL

  useEffect(() => {
      fetchPendingLoans();
    
  },[]);

  const fetchPendingLoans = async () => {
    try {
      const response = await fetch(`${apiUrl}/loans/pending`);
      if (!response.ok) {
        throw new Error("Failed to fetch pending loans");
      }
      const data = await response.json();
      setPendingLoans(data);
    } catch (error) {
      console.error("Error fetching pending loans:", error);
    }
  };

  const approveLoan = async (loanId,uid) => {
    try {
      const response = await fetch(`${apiUrl}/loans/approve/${uid}/${loanId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve loan");
      }

      // Remove the approved loan from the pending loans list
      setPendingLoans((prevLoans) =>
        prevLoans.filter((loan) => loan.id !== loanId && loan.userId!==uid)
      );
    } catch (error) {
      console.error("Error approving loan:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <List>
        {pendingLoans.map((loan) => (
          <ListItem key={loan.id}>
            <div>
              <Typography variant="h6">
                Status: {loan.amount}
              </Typography>
              <Typography variant="h6">
                Status: {loan.tern}
              </Typography>
              <Typography variant="h6">
                Status: {loan.date}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => approveLoan(loan.id,loan.userId)}
              >
                Approve Loan
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AdminDashboard;
