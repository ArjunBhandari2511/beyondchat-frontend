import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import ReactConfetti from "react-confetti";
import "./css/Chatbot.css";

function Chatbot() {
  const [isConfettiVisible, setIsConfettiVisible] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isErrorDialogVisible, setIsErrorDialogVisible] = useState(false);
  const navigate = useNavigate();

  // Handle opening the dummy chatbot
  const handleTestChatbot = () => {
    navigate("/sampleweb");
  };

  // Handle showing instructions dialog
  const handleIntegrateChatbot = () => {
    setIsDialogVisible(true);
  };

  // Handle test integration
  const handleTestIntegration = () => {
    try {
      // Place your actual integration logic here
      // If something breaks, it will go to catch block
      setIsConfettiVisible(true);

      setTimeout(() => {
        setIsConfettiVisible(false);
      }, 30000);
    } catch (error) {
      setIsErrorDialogVisible(true);
    }
  };

  return (
    <>
      <div className="chatbot-integration-container">
        <div className="chatbot-actions">
          {/* Test Chatbot Button */}
          <Button
            label="Test Chatbot"
            className="p-button p-button-info"
            onClick={handleTestChatbot}
          />

          {/* Integrate on Your Website Button */}
          <Button
            label="Integrate on Your Website"
            className="p-button p-button-success"
            onClick={handleIntegrateChatbot}
          />

          {/* Test Integration Button */}
          <Button
            label="Test Integration"
            className="p-button p-button-primary"
            onClick={handleTestIntegration}
          />
        </div>

        {/* Integration Instructions Dialog */}
        <Dialog
          header="Integration Instructions"
          visible={isDialogVisible}
          onHide={() => setIsDialogVisible(false)}
        >
          <div className="integration-instructions">
            <h3>Easy Integration Instructions</h3>
            <pre>
              <code>{`<script src="https://chatbot.integration.com/widget.js"></script>`}</code>
              <code>{`<script>Chatbot.init({ theme: 'dark' });</script>`}</code>
            </pre>
            <h4>Option 2: Mail instructions to your developer</h4>
            <Button
              label="Mail Instructions"
              className="p-button p-button-secondary"
              onClick={() => alert("Mailing instructions to developer...")}
            />
          </div>
        </Dialog>

        {/* Error Dialog */}
        <Dialog
          header="Integration Failed"
          visible={isErrorDialogVisible}
          onHide={() => setIsErrorDialogVisible(false)}
        >
          <h3 style={{ color: "red" }}>
            ❌ Error Integrating ChatBot. Please try again.
          </h3>
        </Dialog>

        {/* Confetti on Successful Integration */}
        {isConfettiVisible && (
          <div className="confetti-container">
            <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
            <div className="success-message">
              <h2>Chatbot Integrated Successfully!</h2>
              <Button
                label="Explore Admin Panel"
                className="p-button p-button-primary"
                onClick={() => navigate("/admin-panel")}
              />
              <Button
                label="Start talking to your chatbot"
                className="p-button p-button-success"
                onClick={() => window.open("https://beyondchats.com", "_blank")}
              />
              <div className="social-media-buttons">
                <a
                  href="https://x.com/BeyondChats_ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    icon="pi pi-twitter"
                    className="p-button-rounded p-button-info"
                  />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61554975540863"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <Button
                  icon="pi pi-facebook"
                  className="p-button-rounded p-button-info"
                />
                </a>
                <a
                  href="https://www.linkedin.com/company/beyondchats-ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <Button
                  icon="pi pi-linkedin"
                  className="p-button-rounded p-button-info"
                />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Chatbot;
