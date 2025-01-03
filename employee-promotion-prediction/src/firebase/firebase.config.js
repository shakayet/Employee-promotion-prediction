import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2UatMLcqU5IxtVogvrJcT77xMjCcYnQ0",
  authDomain: "employee-promotion-predi-f875a.firebaseapp.com",
  projectId: "employee-promotion-predi-f875a",
  storageBucket: "employee-promotion-predi-f875a.appspot.com",
  messagingSenderId: "553444504421",
  appId: "1:553444504421:web:894f82f023ca1f8583e78c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };