// Import Firebase SDKs

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjWyyQ2myPjgq9n3b0PxJNOeOprIXbPQg",
  authDomain: "login-example-8a0e8.firebaseapp.com",
  projectId: "login-example-8a0e8",
  storageBucket: "login-example-8a0e8.firebasestorage.app",
  messagingSenderId: "179275859188",
  appId: "1:179275859188:web:85fbcdd7883abe3fc08aa1",
  measurementId: "G-83H4LZHQR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);

// Get form inputs
const emailInput = document.getElementById('Email');
const passwordInput = document.getElementById('Password');
const usernameInput = document.getElementById('Username');

// Get submit button and attach event listener
const submitButton = document.getElementById('signupButton');
submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const username = usernameInput.value;

  if (!email || !password || !username) {
    alert("Please fill in all fields.");
    return;
  }

  // Firebase Authentication Sign-Up
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log("User signed up:", user);
      
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
        pasword : password
      })
      .then(() => {
        alert("Sign-up successful! Welcome, " + username);
        // Data saved successfully!
      })
      .catch((error) => {
        alert("error");
        // The write failed...
      });
      
      
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);
      alert("Error: " + errorMessage);
    });
});
