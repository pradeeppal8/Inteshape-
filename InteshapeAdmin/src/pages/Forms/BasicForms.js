import React, { useState } from 'react';
import './Forms.css';

const BasicForms = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', gender: '', country: '', message: '' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

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
                <input name="name" value={form.name} onChange={handle} placeholder="Enter full name" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="Enter email" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handle} placeholder="Enter phone number" />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={handle}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <select name="country" value={form.country} onChange={handle}>
                <option value="">Select Country</option>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
                <option>Australia</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handle} rows={4} placeholder="Enter your message..." />
            </div>
            <div className="form-actions">
              <button className="btn-primary">Submit</button>
              <button className="btn-secondary" onClick={() => setForm({ name:'',email:'',phone:'',gender:'',country:'',message:'' })}>Reset</button>
            </div>
          </div>
        </div>

        <div className="form-card">
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
    </div>
  );
};

export default BasicForms;
