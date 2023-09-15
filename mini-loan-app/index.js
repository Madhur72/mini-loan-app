const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
app.use(express.json());
app.use(cors());
const loanApplication = [];
let nextId = 0;

app.post("/loans", (req, res) => {

  try {
    const newApplication = req.body;
    newApplication.id = ++nextId
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
   res.json(loanApplication);
  } catch (error) {
    console.error("Error fetching customer loans", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/loans/pending", (req, res) => {
  try {
    const pendingApplications = loanApplication.filter((loan)=>loan.Status==='PENDING')
    res.json(pendingApplications);
  } catch (error) {
    console.error("Error fetching Pending loans", error);
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
    loan.Status = "APPROVED";
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
    loan.Status = 'Approved';

    res.json({ message: 'Loan approved successfully' });
  } catch (error) {
    console.error('Error updating loan status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put("/loans/:uid/:LId/repayments/:repaymentIndex", (req, res) => {
  try {
    const LId = parseInt(req.params.LId, 10);
    console.log(LId);
    const uid = req.params.uid;
    const repaymentIndex = req.params.repaymentIndex;
    const updatedStatus = req.body.Status;

    // Find the index of the loan object in the loanApplication array
    const loanIndex = loanApplication.findIndex(
      (loan) => loan.userId === uid && loan.id === LId
    );

    const loan = loanApplication[loanIndex];

    // Check if the repayment index is valid
   
    // Mark the specified repayment as "PAID"
    loan.repayments[repaymentIndex].Status = "PAID";

    // Check if all repayments for this loan are "PAID"
    if (loan.repayments.every((repayment) => repayment.Status === "PAID")) {
      // Update the loan status to "PAID" if all repayments are paid
      loan.Status = "PAID";
    }

    // Update the loanApplication array with the modified loan object
    loanApplication[loanIndex] = loan;
console.log(loanApplication[loanIndex])
    res.json({ message: "Repayment marked as PAID" });
  } catch (error) {
    console.error("Error marking repayment as PAID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put('/loans/approve/:uid/:loanId', (req, res) => {
  try {
    const loanId = parseInt(req.params.loanId, 10);
    const uid = req.params.uid;
    console.log(req.url)
    // Find the loan in your loanApplication array based on loanId and uid
    const loanToApprove = loanApplication.find(
      (loan) => loan.id === loanId && loan.userId === uid
    );

    if (!loanToApprove) {
      return res.status(404).json({ error: 'Loan not found' });
    }


    // Update the loan status to "Approved"
    loanToApprove.Status = 'APPROVED';

    res.json({ message: 'Loan approved successfully' });
  } catch (error) {
    console.error('Error approving loan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log("Server is running on port 3001");
});