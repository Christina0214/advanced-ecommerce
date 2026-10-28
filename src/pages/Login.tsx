import { useState } from "react";
import type { SubmitEvent } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  };

  
  return (
    <div className="login-page">
      <h2>Welcome Back!</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" type="submit">
          Login
        </button>

        {error && <p className="login-error">{error}</p>}
      </form>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Login;