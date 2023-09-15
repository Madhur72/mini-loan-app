# mini-loan-app

## Project Documentation

Frontend:

App.js (Loan Application Form):

This component represents the main loan application form.
It uses React state hooks to manage form input values, loan applications, and repayment amount.
The fetchLoanApplications function retrieves loan applications from the backend and updates the state.
calculateWeeklyRepayments calculates weekly repayments based on the loan amount, term, and start date.
The repayLoan function allows users to mark pending repayments as "PAID."
submitLoanApplication handles loan submission and sends data to the backend.
The component renders a form with input fields for loan amount, term, and start date.
If the loan status is "APPROVED," it displays a repayment amount field and a button to repay the loan.
Loan applications and their repayments are listed below the form.
AdminDashboard.js:

This component represents the admin dashboard.
It uses React state hooks to manage pending loan applications.
The fetchPendingLoans function retrieves pending loan applications from the backend.
The approveLoan function allows admins to approve pending loans.
The component renders a list of pending loan applications with a button to approve each loan.
Login.js:

This component handles user authentication.
It uses React state hooks to manage email and password input.
The handleLogin function attempts to log in the user using Firebase authentication.
If the user is an admin, they are redirected to the admin dashboard; otherwise, they are redirected to the loan application form.
The component renders a login form with input fields for email and password.
App.js (Main App Component):

This is the main routing component that sets up routes for different parts of the application.
It uses the Routes and Route components from the react-router-dom library to define routes for the login page, loan application form, and admin dashboard.
Backend:

Server (server.js):

This Express.js server serves as the backend for the loan application system.
It listens on port 3001 for incoming requests.
The server is equipped with CORS middleware to handle cross-origin requests.
Endpoints:

POST /loans: Allows users to submit loan applications. The server stores the applications in memory and assigns each application a unique ID.
GET /loans: Retrieves all loan applications.
GET /loans/pending: Retrieves pending loan applications.
PUT /loans/:loanId: Allows admins to approve loan applications based on their ID.
PUT /loans/approve/:uid/:loanId: Allows admins to approve loan applications based on both their ID and the user's ID.
PUT /loans/:uid/:loanId/repayments/:repaymentIndex: Allows users to mark repayments as "PAID."
General Project Overview:

The project is a web-based loan application system with separate interfaces for users and admins.
Users can submit loan applications, view their application status, and make repayments.
Admins can view and approve pending loan applications.
Firebase is used for user authentication.
The backend is built with Express.js and handles loan data and approvals.
The frontend is developed with React and uses Material-UI for the user interface.
Key Choices and Why:

React: React was chosen for building the frontend due to its component-based architecture, which makes it easy to manage complex UIs.

Firebase Authentication: Firebase was chosen for user authentication due to its simplicity and robustness.

Material-UI: Material-UI was used for UI components to ensure a modern and responsive design.

Express.js: Express.js was chosen for the backend due to its simplicity, flexibility, and robust ecosystem for building RESTful APIs.

In-Memory Data Storage: Loan applications are stored in memory for simplicity, but a database could be integrated for production use.

Separation of User and Admin Interfaces: Separate interfaces for users and admins provide better control and security.

Routing with react-router-dom: react-router-dom was used for client-side routing to manage different pages within the application.

REST API: A RESTful API was chosen for communication between the frontend and backend for its simplicity and scalability.

This project aims to provide a user-friendly and efficient loan application system with role-based access control for both users and administrators. Users can apply for loans and make repayments, while admins can review and approve loan applications. The chosen technologies and architecture support these functionalities effectively.

Front End: [Link to Front End Documentation](./frontend/README.md)

Back End: [Link to Back End Documentation](./backend/README.md)


## Getting Started

Clone the repository: git clone https://github.com/Madhur72/mini-loan-app.git

Change directory to the project folder: cd mini-loan-app

Run npm run install-all to install all project dependencies (both front end and back end).

Run npm run start to start the project.

## Login Details
I have Created 3 Profiles 
Admin: email:admin@admin.com, Password:adminn

Hemant: email:hemant@hemant.com, Password:hemant

Hemant: email:aditya@aditya.com, Password:aditya
...
