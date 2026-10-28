import { useState } from "react";
import type { SubmitEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // 1. Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. Get the newly registered user
      const user = userCredential.user;

      // 3. Create a corresponding document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: serverTimestamp(),
      });
      
      alert("Registration successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  
  return (
    <div className="register-page">
      <h2>Create Your Account</h2>

      <form className="register-form" onSubmit={handleRegister}>
        <input
          className="register-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="register-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-button" type="submit">
          Register
        </button>

        {error && <p className="register-error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;