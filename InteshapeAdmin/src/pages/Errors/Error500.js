import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Errors.css';

const Error500 = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="error-code" style={{ color: '#e74c3c' }}>500</div>
      <div className="error-title">Internal Server Error</div>
      <div className="error-msg">Something went wrong on our end. Please try again later or contact support.</div>
      <div className="error-actions">
        <button className="err-btn primary" onClick={() => navigate('/')}>Go to Dashboard</button>
        <button className="err-btn danger" onClick={() => window.location.reload()}>Retry</button>
      </div>
    </div>
  );
};

export default Error500;
