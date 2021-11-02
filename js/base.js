import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDZPmHg79mYLEh9KC2THhlZXtYgY2UHoM",
  authDomain: "auth-games-guide.firebaseapp.com",
  projectId: "auth-games-guide"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//Auth and firestore
const auth = getAuth();
const db = getFirestore(firebaseApp);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
export { db, collection, getDocs, query };

