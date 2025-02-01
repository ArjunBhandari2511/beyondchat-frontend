import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import VerifyCode from "./pages/VerifyCode";
import Chatbot from "./pages/Chatbot";
import SampleWeb from "./pages/SampleWeb";
import AdminPanel from "./pages/AdminPanel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication when app loads
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    if (storedName && storedEmail) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={<Registration setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/verify-code"
            element={
              isAuthenticated ? (
                <VerifyCode setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/chatbot"
            element={isAuthenticated ? <Chatbot /> : <Navigate to="/" />}
          />
          <Route
            path="/sampleweb"
            element={isAuthenticated ? <SampleWeb /> : <Navigate to="/" />}
          />
          <Route
            path="/admin-panel"
            element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
