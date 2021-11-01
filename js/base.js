import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDZPmHg79mYLEh9KC2THhlZXtYgY2UHoM",
  authDomain: "auth-games-guide.firebaseapp.com",
  projectId: "auth-games-guide"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Auth and firestore
const auth = getAuth();
const db = getFirestore();

export { app , createUserWithEmailAndPassword , auth, db };

