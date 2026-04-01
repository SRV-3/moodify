import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

import "../style/login.scss";

function Login() {
  const { loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ username, password });
    navigate("/");
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            placeholder="Enter Your Username"
          />
          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter Your Password"
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
