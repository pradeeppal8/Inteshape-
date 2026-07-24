import React, { useState } from 'react';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">⊞</span>
          <span>Matrix <strong>Admin</strong></span>
        </div>
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-sub">Enter your email to receive a reset link</p>
        {sent ? (
          <div className="auth-success">
            ✓ Password reset link sent to <strong>{email}</strong>. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="auth-group">
              <label>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
            <button type="submit" className="auth-btn">Send Reset Link</button>
          </form>
        )}
        <div className="auth-footer"><a href="#login" className="auth-link">← Back to Login</a></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
