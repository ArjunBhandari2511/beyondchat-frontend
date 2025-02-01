import React from 'react';
import { Button } from 'primereact/button'; // For using PrimeReact Button
import './css/SampleWeb.css'; // Assuming you have a separate CSS file for styling

function SampleWeb() {
  return (
    <div className="sample-web-container">
      {/* Topbar */}
      <div className="topbar">
        <h2>Chatbot not working as intended? <a href="#">Feedback Here.</a></h2>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>Welcome to Sample Webpage</h1>
        <p>This is just a dummy page to check the features.</p>
      </div>

      {/* Chatbot Circular Icon at the Bottom Right */}
      <div className="chatbot-widget">
        <Button 
          icon="pi pi-comments" 
          className="p-button-rounded p-button-info chatbot-icon"
          onClick={() => alert("Chatbot clicked!")}  // Add your chatbot click action here
        />
      </div>
    </div>
  );
}

export default SampleWeb;
