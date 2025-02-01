import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputText, InputTextarea } from "primereact";
import "./css/Dashboard.css";
import { toast } from "react-toastify";
import {ProgressSpinner} from "primereact/progressspinner"

// Dummy Data for pages and scraped status.
const dummyPages = [
  { id: 1, url: "http://example.com/page1", status: "scraped", chunks: 5 },
  { id: 2, url: "http://example.com/page2", status: "pending", chunks: 0 },
  { id: 3, url: "http://example.com/page3", status: "scraped", chunks: 3 },
];

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [webpages, setWebpages] = useState(dummyPages);
  const [trainingStatus, setTrainingStatus] = useState("In Progress");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loadingMeta, setLoadingMeta] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the last authentication type
    const authType = localStorage.getItem("authType");

    if (authType === "traditional") {
      // Load traditional registration data
      const storedName = localStorage.getItem("name");
      const storedEmail = localStorage.getItem("email");

      if (storedName && storedEmail) {
        setUserName(storedName);
        setUserEmail(storedEmail);
      } else {
        navigate("/");
      }
    } else if (authType === "google") {
      // Load Google Sign-In data
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserName(userData.name || userData.given_name);
        setUserEmail(userData.email);
      } else {
        navigate("/");
      }
    } else {
      // If no auth type found, redirect to login
      navigate("/");
    }
  }, [navigate]);

  const handleFetchMetaDescription = async () => {
    if (!websiteUrl) {
      setMetaDescription("Please enter a valid URL.");
      return;
    }

    setLoadingMeta(true)

    try {
      const response = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(websiteUrl)}`
      );
      const data = await response.json();

      if (data.status === "success" && data.data.description) {
        setMetaDescription(data.data.description);
      } else {
        setMetaDescription("Meta description not found.");
      }
    } catch (error) {
      console.error("Error fetching meta description:", error);
      setMetaDescription("Failed to fetch meta description.");
    } finally {
      setLoadingMeta(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Fixed the typo in preventDefault

    console.log("Company Details Submitted:", {
      companyName,
      websiteUrl,
      companyDescription,
    });
    toast.success("Company Details Submitted!")
    setIsFormSubmitted(true); // Show the next sections after submission
  };

  const handleViewChunks = (pageId) => {
    // Logic to display scraped data chunks for the selected page
    const selectedPage = webpages.find((page) => page.id === pageId);
    alert(`Data chunks for ${selectedPage.url}: ${selectedPage.chunks}`);
  };

  return (
    <>
      <div className="dashboard">
        <h1>Welcome {userName || "User"}!</h1>
      </div>
      <div className="dashboard-container">
        <h2>Set up Your Organization</h2>
        <form onSubmit={handleSubmit}>
          <div className="p-field">
            <label htmlFor="companyName">Company Name</label>
            <InputText
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="p-inputtext p-component"
            />
          </div>
          <div className="p-field">
            <label htmlFor="websiteUrl">Company Website URL</label>
            <InputText
              id="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              required
              className="p-inputtext p-component"
            />
            <Button
              label="Fetch Meta Description"
              className="p-button p-button-info"
              onClick={handleFetchMetaDescription}
            />
            {loadingMeta && (
              <div className="spinner-container">
                <ProgressSpinner style={{width: '50px', height: '50px'}}/>
              </div>
            )}
          </div>

          <div className="p-field">
            <label htmlFor="metaDescription">Meta Description</label>
            <InputText
              id="metaDescription"
              value={metaDescription}
              disabled
              className="p-inputtext p-component"
            />
          </div>

          <div className="p-field">
            <label htmlFor="companyDescription">Company Description</label>
            <InputTextarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              required
              rows={4}
              className="p-textarea p-component"
            />
            <Button
              label="Submit"
              type="submit"
              className="p-button p-button-primary"
            />
          </div>
        </form>        
        
        <h3>WebPage Status</h3>
        {isFormSubmitted && (
          <div className="webpages-status">
            {webpages.map((page) => (
              <div key={page.id} className="webpage-item">
                <p>{page.url}</p>
                <p>Status: {page.status}</p>
                <p>Scraped Chunks: {page.chunks}</p>
                <Button
                  label="View Chunks"
                  className="p-button p-button-secondary"
                  onClick={() => handleViewChunks(page.id)}
                />
              </div>
            ))}
          </div>
        )}

        {isFormSubmitted && (
          <div className="training-status">
            <h3>Training Status: {trainingStatus}</h3>
            <Button
              label="Next Step"
              className="p-button p-button-primary"
              onClick={() => navigate("/chatbot")}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
