import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMMKG59SCAKGSFm96iSsPDICibu3WVMLc",
  authDomain: "mini-loan-app-72.firebaseapp.com",
  projectId: "mini-loan-app-72",
  storageBucket: "mini-loan-app-72.appspot.com",
  messagingSenderId: "444751533991",
  appId: "1:444751533991:web:355cce84123f9325470882",
  measurementId: "G-JWE3SBK0E2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
