import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const GOOGLE_CLIENT_ID = "532741169708-2auj87mg5v4isjgkjolu0amcv6q07os9.apps.googleusercontent.com";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("User Info:", decoded);

    setUser(decoded);

    // Store user in localStorage
    localStorage.setItem("authType", "google");
    localStorage.setItem("user", JSON.stringify(decoded));

    // Redirect to Dashboard
    navigate("/dashboard");
  };

  const handleFailure = () => {
    console.log("Google Sign-In Failed");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="google-auth">
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
