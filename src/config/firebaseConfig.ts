import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlP70vdtYApywFBbM68IvAw9opEW51aIY",
  authDomain: "e-commerce-project-2fca6.firebaseapp.com",
  projectId: "e-commerce-project-2fca6",
  storageBucket: "e-commerce-project-2fca6.firebasestorage.app",
  messagingSenderId: "951440290707",
  appId: "1:951440290707:web:c85d6aad18258326a52e66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
// Connect Cloud Firestore
const db = getFirestore(app);

export { auth };

export { db };