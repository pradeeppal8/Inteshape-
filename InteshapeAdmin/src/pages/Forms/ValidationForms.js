import React, { useState } from 'react';
import './Forms.css';

const rules = {
  username: v => !v ? 'Username is required' : v.length < 3 ? 'Min 3 characters' : '',
  email: v => !v ? 'Email is required' : !/\S+@\S+\.\S+/.test(v) ? 'Invalid email' : '',
  password: v => !v ? 'Password is required' : v.length < 6 ? 'Min 6 characters' : '',
  confirm: (v, all) => !v ? 'Please confirm password' : v !== all.password ? 'Passwords do not match' : '',
  phone: v => !v ? 'Phone is required' : !/^\d{10}$/.test(v) ? 'Must be 10 digits' : '',
  website: v => v && !/^https?:\/\/.+/.test(v) ? 'Must start with http:// or https://' : '',
};

const ValidationForms = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '', phone: '', website: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handle = e => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (errors[name] !== undefined) {
      setErrors({ ...errors, [name]: (rules[name](value, updated) || '') });
    }
  };

  const validate = () => {
    const errs = {};
    Object.keys(rules).forEach(k => { errs[k] = rules[k](form[k], form); });
    setErrors(errs);
    return Object.values(errs).every(e => !e);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="forms-page">
      <div className="page-header">
        <h2>Form Validation</h2>
        <span className="breadcrumb">Home &rsaquo; Forms &rsaquo; Validation</span>
      </div>
      <div className="forms-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="form-card" style={{ maxWidth: '640px' }}>
          <div className="form-card-header">Registration Form with Validation</div>
          <div className="form-body">
            {submitted && (
              <div className="alert-success">✓ Form submitted successfully!</div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              {[
                { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter username' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email' },
                { name: 'phone', label: 'Phone (10 digits)', type: 'tel', placeholder: 'e.g. 9876543210' },
                { name: 'password', label: 'Password', type: 'password', placeholder: 'Min 6 characters' },
                { name: 'confirm', label: 'Confirm Password', type: 'password', placeholder: 'Re-enter password' },
                { name: 'website', label: 'Website (optional)', type: 'url', placeholder: 'https://example.com' },
              ].map(f => (
                <div key={f.name} className="form-group">
                  <label>{f.label}</label>
                  <input
                    name={f.name}
                    type={f.type}
                    value={form[f.name]}
                    onChange={handle}
                    placeholder={f.placeholder}
                    className={errors[f.name] ? 'input-error' : ''}
                  />
                  {errors[f.name] && <span className="error-msg">⚠ {errors[f.name]}</span>}
                </div>
              ))}
              <div className="form-actions">
                <button type="submit" className="btn-primary">Validate & Submit</button>
                <button type="button" className="btn-secondary" onClick={() => { setForm({ username:'',email:'',password:'',confirm:'',phone:'',website:'' }); setErrors({}); setSubmitted(false); }}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationForms;
