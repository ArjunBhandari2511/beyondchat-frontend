import React, { useState } from "react";
import { Button, InputText, Password } from "primereact";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./css/Registration.css";
import GoogleAuth from "./GoogleAuth";

const Registration = ({ setIsAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        // Save email & name to Local Storage
        localStorage.setItem("authType", "traditional");
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        // Toast notification
        toast.success("Registration Successful!");
        // Update authentication state
        setIsAuthenticated(true);
        // Redirect to Verify Code page
        navigate("/verify-code");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="p-field">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-inputtext p-component"
          />
        </div>

        <div className="p-field">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-inputtext p-component"
          />
        </div>

        <div className="p-field">
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            toggleMask
            className="p-password p-component"
          />
        </div>

        <Button
          label={loading ? "Registering..." : "Register"}
          type="submit"
          className="p-button p-component p-button-primary"
          disabled={loading}
        />
      </form>
      <div className="google-container">
        <p>OR</p>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Registration;
