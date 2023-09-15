import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const isAdminUser = email === "admin@admin.com" && password === "adminn";

      console.log(isAdminUser)
      // Redirect to the appropriate page based on admin status
      if (isAdminUser) {
        navigate('/admin')
      } else {
        navigate('/loanForm'); 
      }

    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
