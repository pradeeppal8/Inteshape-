import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (!form.agree) errs.agree = 'You must agree to the terms';
    setErrors(errs);
    if (!Object.keys(errs).length) navigate('/');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="auth-logo">⊞</span>
          <span>Matrix <strong>Admin</strong></span>
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-sub">Fill in the details to register</p>
        <form onSubmit={handleSubmit}>
          {[
            { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
            { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
            { name: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
            { name: 'confirm', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password' },
          ].map(f => (
            <div key={f.name} className="auth-group">
              <label>{f.label}</label>
              <input name={f.name} type={f.type} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className={errors[f.name] ? 'input-err' : ''} />
              {errors[f.name] && <span className="auth-field-error">{errors[f.name]}</span>}
            </div>
          ))}
          <div className="auth-group">
            <label className="check-label">
              <input type="checkbox" name="agree" checked={form.agree} onChange={handle} />
              I agree to the <a href="#terms" className="auth-link">Terms & Conditions</a>
            </label>
            {errors.agree && <span className="auth-field-error">{errors.agree}</span>}
          </div>
          <button type="submit" className="auth-btn">Create Account</button>
        </form>
        <div className="auth-footer">Already have an account? <a href="#login" className="auth-link" onClick={e => { e.preventDefault(); navigate('/auth/login'); }}>Sign In</a></div>
      </div>
    </div>
  );
};

export default Register;
