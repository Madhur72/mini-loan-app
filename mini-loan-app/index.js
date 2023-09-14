const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(express.json());
app.use(cors());
const loanApplication = [];

app.post("/loans", (req, res) => {
  try {
    const newApplication = req.body;
    loanApplication.push(newApplication);
    res
      .status(201)
      .json({ message: "Loan application submitted successfully" });
  } catch (error) {
    console.error("Error Submitting loan application", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/loans", (req, res) => {
  try {
    //const customerId = req.user.id;
    // const customerLoan = loanApplication.filter(
    //   (loan) => loan.customerId === customerId
    // );

    res.json(loanApplication);
  } catch (error) {
    console.error("Error fetching customer loans", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/loans/:loanId", (req, res) => {
  try {
    const loanId = req.params.loanId;
    const loan = loanApplication.find((loan) => loan.id === loanId);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    loan.status = "APPROVED";
    res.json({ message: "Loan approved successfully" });
  } catch (error) {
    console.error("Error updating loan status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put('/loans/approve/:loanId', (req, res) => {
  try {
    const loanId = req.params.loanId;
    const loan = loanApplication.find((loan) => loan.id === loanId);

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    // Check if the user is an admin (you may have your own admin authentication logic)
    const isAdmin = true; // Replace with your admin authentication logic

    if (!isAdmin) {
      return res.status(403).json({ error: 'Access denied. Only admin can approve loans.' });
    }

    // Update the loan status to "Approved"
    loan.status = 'Approved';

    res.json({ message: 'Loan approved successfully' });
  } catch (error) {
    console.error('Error updating loan status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log("Server is running on port 3001");
});
