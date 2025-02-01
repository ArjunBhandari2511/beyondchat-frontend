import React, { useState } from 'react';
import { Button, InputText } from 'primereact';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./css/VerifyCode.css";

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const email = localStorage.getItem('email'); // Assuming email is stored after registration
      if (!email || !code) {
        setError("Email or Code is missing!");
        setLoading(false);
        return;
      }
  
      console.log('Sending verification request:', { email, code });

      const response = await axios.post('http://localhost:5000/api/verify-email', {
        email,
        code,
      });

      if (response.status === 200) {
        // On successful verification
        toast.success("Email verified successfully!");
        navigate('/dashboard');  // Navigate to dashboard after successful verification
      }
    } catch (error) {
      console.error("Error During Verification: ", error)
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-code-container">
      <h1>Verify Your Email</h1>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="verify-code-form">
        <div className="p-field">
          <label htmlFor="code" className='codelabel'>Verification Code</label>
          <InputText
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="p-inputtext p-component"
          />
        </div>

        <Button
          label={loading ? 'Verifying...' : 'Verify Code'}
          type="submit"
          className="p-button p-button-primary p-component"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default VerifyCode;
