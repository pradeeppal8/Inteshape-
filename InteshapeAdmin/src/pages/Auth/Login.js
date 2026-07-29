import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAdminSettings } from '../../context/AdminSettingsContext';
import './Auth.css';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { headerLogo } = useAdminSettings();

    const handle = e => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
        setError('');
        const firstName = form.email.split('@')[0].split(/[._]/)[0];
        const name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        login({ name, email: form.email });
        navigate('/dashboard');
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="auth-logo">
                        <img src={headerLogo || '/header-logo.png'} alt="Logo" className="brand-avatar" />
                    </span>
                    {/* <span>Matrix <strong>Admin</strong></span> */}
                </div>
                <h2 className="auth-title">Sign In</h2>
                <p className="auth-sub">Enter your credentials to access the panel</p>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="auth-group">
                        <label>Email Address</label>
                        <input name="email" type="email" value={form.email} onChange={handle} />
                    </div>
                    <div className="auth-group">
                        <label>Password</label>
                        <input name="password" type="password" value={form.password} onChange={handle} />
                    </div>
                    <div className="auth-row">
                        <label className="check-label"><input type="checkbox" name="remember" checked={form.remember} onChange={handle} /> Remember me</label>
                        <a href="#forgot" className="auth-link">Forgot password?</a>
                    </div>
                    <button type="submit" className="auth-btn">Sign In</button>
                </form>
                <div className="auth-footer">Don't have an account? <a href="#register" className="auth-link" onClick={e => { e.preventDefault(); navigate('/auth/register'); }}>Register</a></div>
            </div>
        </div>
    );
};

export default Login;
