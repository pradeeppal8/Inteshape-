import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Errors.css';

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="error-code">404</div>
      <div className="error-title">Page Not Found</div>
      <div className="error-msg">Sorry, the page you're looking for doesn't exist or has been moved.</div>
      <div className="error-actions">
        <button className="err-btn primary" onClick={() => navigate('/')}>Go to Dashboard</button>
        <button className="err-btn secondary" onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default Error404;
