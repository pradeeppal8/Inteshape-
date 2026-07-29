import React, { useState } from 'react';
import './Forms.css';
import '../Settings/Settings.css';

const BasicForms = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', gender: '', country: '', message: '' });
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);
  const [resetKey, setResetKey] = useState(0);

  const handle = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Full name is required';
    if (!form.email.trim())   errs.email   = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim())   errs.phone   = 'Phone number is required';
    if (!form.gender)         errs.gender  = 'Please select a gender';
    if (!form.country)        errs.country = 'Please select a country';
    if (!form.message.trim()) errs.message = 'Message is required';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Success
    setForm({ name:'', email:'', phone:'', gender:'', country:'', message:'' });
    setErrors({});
    const id1 = Date.now(), id2 = id1 + 1;
    setToasts(prev => [...prev, { id: id1, msg: 'Form submitted successfully!.' }]);
    setTimeout(() => setToasts(prev => [...prev, { id: id2, msg: 'Form submitted successfully!.' }]), 400);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id1 && t.id !== id2)), 3500);
  };

  return (
    <div className="forms-page">
      <div className="page-header">
        <h2>Basic Forms</h2>
        <span className="breadcrumb">Home &rsaquo; Forms &rsaquo; Basic</span>
      </div>
      <div className="forms-grid">
        <div className="form-card">
          <div className="form-card-header">User Information</div>
          <div className="form-body">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handle} placeholder="Enter full name" className={errors.name ? 'input-err' : ''} />
                {errors.name && <span className="auth-field-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="Enter email" className={errors.email ? 'input-err' : ''} />
                {errors.email && <span className="auth-field-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handle} placeholder="Enter phone number" className={errors.phone ? 'input-err' : ''} />
                {errors.phone && <span className="auth-field-error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={handle} className={errors.gender ? 'input-err' : ''}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.gender && <span className="auth-field-error">{errors.gender}</span>}
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <select name="country" value={form.country} onChange={handle} className={errors.country ? 'input-err' : ''}>
                <option value="">Select Country</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
              {errors.country && <span className="auth-field-error">{errors.country}</span>}
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Enter your message..." className={errors.message ? 'input-err' : ''} />
              {errors.message && <span className="auth-field-error">{errors.message}</span>}
            </div>
            <div className="form-actions">
              <button type="button" className="btn-primary" onClick={handleSubmit}>Submit</button>
              <button type="button" className="btn-secondary" onClick={() => { setForm({ name:'',email:'',phone:'',gender:'',country:'',message:'' }); setErrors({}); setResetKey(k => k + 1); }}>Reset</button>
            </div>
          </div>
        </div>

        <div className="form-card" key={resetKey}>
          <div className="form-card-header">Input Types</div>
          <div className="form-body">
            <div className="form-group"><label>Text Input</label><input type="text" placeholder="Plain text" /></div>
            <div className="form-group"><label>Password</label><input type="password" placeholder="Enter password" /></div>
            <div className="form-group"><label>Number</label><input type="number" placeholder="Enter number" /></div>
            <div className="form-group"><label>Date</label><input type="date" /></div>
            <div className="form-group"><label>Color</label><input type="color" defaultValue="#3498db" style={{ height: '38px', padding: '2px 4px' }} /></div>
            <div className="form-group"><label>Range</label><input type="range" min={0} max={100} defaultValue={50} style={{ width: '100%' }} /></div>
            <div className="form-group">
              <label>Checkboxes</label>
              <div className="check-group">
                {['Option A', 'Option B', 'Option C'].map(o => (
                  <label key={o} className="check-label"><input type="checkbox" /> {o}</label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Radio Buttons</label>
              <div className="check-group">
                {['Option 1', 'Option 2', 'Option 3'].map(o => (
                  <label key={o} className="check-label"><input type="radio" name="radio" /> {o}</label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-toast-container">
        {toasts.map(t => (
          <div key={t.id} className="settings-toast">{t.msg}</div>
        ))}
      </div>
    </div>
  );
};

export default BasicForms;
