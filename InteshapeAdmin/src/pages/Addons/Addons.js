import React from 'react';
import './Addons.css';

const Addons = () => (
  <div className="addons-page">
    <div className="page-header">
      <h2>Addons</h2>
      <span className="breadcrumb">Home &rsaquo; Addons</span>
    </div>
    <div className="addons-grid">
      {[
        { name: 'Rich Text Editor', desc: 'A powerful WYSIWYG editor for creating formatted content.', icon: '✎', color: '#3498db', status: 'Active' },
        { name: 'Date Picker', desc: 'Interactive calendar widget for selecting dates and ranges.', icon: '📅', color: '#2ecc71', status: 'Active' },
        { name: 'File Manager', desc: 'Browse, upload, and organize files and folders.', icon: '📁', color: '#e67e22', status: 'Active' },
        { name: 'Chart Builder', desc: 'Drag-and-drop chart creation tool for visual reports.', icon: '📊', color: '#9b59b6', status: 'Beta' },
        { name: 'Notifications', desc: 'Real-time push notifications and alert management.', icon: '🔔', color: '#e74c3c', status: 'Active' },
        { name: 'Data Export', desc: 'Export tables and charts to CSV, PDF, or Excel format.', icon: '⬇', color: '#1abc9c', status: 'Active' },
        { name: 'Maps Integration', desc: 'Embed interactive Google Maps within your dashboard.', icon: '🗺', color: '#f39c12', status: 'Beta' },
        { name: 'Analytics SDK', desc: 'Advanced analytics and user tracking module.', icon: '📈', color: '#2c3e50', status: 'Coming Soon' },
      ].map(a => (
        <div key={a.name} className="addon-card">
          <div className="addon-icon" style={{ background: a.color }}>{a.icon}</div>
          <div className="addon-info">
            <div className="addon-name">{a.name}</div>
            <div className="addon-desc">{a.desc}</div>
          </div>
          <span className={`addon-status ${a.status === 'Active' ? 'status-active' : a.status === 'Beta' ? 'status-beta' : 'status-soon'}`}>
            {a.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default Addons;
