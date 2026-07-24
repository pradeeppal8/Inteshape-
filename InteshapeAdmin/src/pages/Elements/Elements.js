import React, { useState } from 'react';
import './Elements.css';

const Elements = () => {
  const [alertVisible, setAlertVisible] = useState({ info: true, success: true, warning: true, danger: true });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [accordionOpen, setAccordionOpen] = useState(null);

  const dismissAlert = (type) => setAlertVisible({ ...alertVisible, [type]: false });

  const accordionItems = [
    { id: 'a1', title: 'What is an Admin Panel?', body: 'An admin panel is a back-end interface that allows administrators to manage website or application content, users, settings, and data.' },
    { id: 'a2', title: 'How to use the Dashboard?', body: 'The dashboard provides an overview of key metrics, recent activities, and quick access to commonly used features via tiles and charts.' },
    { id: 'a3', title: 'How to manage users?', body: 'Navigate to the Tables section to view, edit, or delete user accounts. You can also filter and sort users using the search bar.' },
  ];

  return (
    <div className="elements-page">
      <div className="page-header">
        <h2>Elements</h2>
        <span className="breadcrumb">Home &rsaquo; Elements</span>
      </div>

      <div className="elements-grid">
        {/* Alerts */}
        <div className="el-card">
          <div className="el-card-header">Alerts</div>
          <div className="el-card-body">
            {alertVisible.info && <div className="alert alert-info">ℹ <strong>Info:</strong> This is an informational alert. <button onClick={() => dismissAlert('info')} className="alert-close">×</button></div>}
            {alertVisible.success && <div className="alert alert-success">✓ <strong>Success:</strong> Your action was completed. <button onClick={() => dismissAlert('success')} className="alert-close">×</button></div>}
            {alertVisible.warning && <div className="alert alert-warning">⚠ <strong>Warning:</strong> Please review your input. <button onClick={() => dismissAlert('warning')} className="alert-close">×</button></div>}
            {alertVisible.danger && <div className="alert alert-danger">✕ <strong>Error:</strong> Something went wrong. <button onClick={() => dismissAlert('danger')} className="alert-close">×</button></div>}
          </div>
        </div>

        {/* Badges & Labels */}
        <div className="el-card">
          <div className="el-card-header">Badges & Labels</div>
          <div className="el-card-body">
            <div className="badge-row">
              {['Primary','Success','Warning','Danger','Info','Dark'].map(b => (
                <span key={b} className={`badge badge-${b.toLowerCase()}`}>{b}</span>
              ))}
            </div>
            <div className="badge-row" style={{ marginTop: '12px' }}>
              {['New','Hot','Sale','Featured','Trending'].map(l => (
                <span key={l} className={`label label-${l === 'New' ? 'info' : l === 'Hot' ? 'danger' : l === 'Sale' ? 'success' : l === 'Featured' ? 'warning' : 'primary'}`}>{l}</span>
              ))}
            </div>
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ marginBottom: '10px', fontSize: '13px', color: '#7f8c8d' }}>Buttons with badges:</h4>
              <div className="badge-row">
                <button className="btn-badge primary">Messages <span className="badge-count">4</span></button>
                <button className="btn-badge success">Notifications <span className="badge-count">12</span></button>
                <button className="btn-badge danger">Errors <span className="badge-count">2</span></button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="el-card">
          <div className="el-card-header">Tabs</div>
          <div className="el-card-body" style={{ padding: 0 }}>
            <div className="tab-nav">
              {['tab1','tab2','tab3'].map((t, i) => (
                <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                  Tab {i + 1}
                </button>
              ))}
            </div>
            <div className="tab-content">
              {activeTab === 'tab1' && <p>Content for Tab 1 — Overview of the application settings and user preferences.</p>}
              {activeTab === 'tab2' && <p>Content for Tab 2 — Manage your profile, notifications, and security settings.</p>}
              {activeTab === 'tab3' && <p>Content for Tab 3 — View analytics, reports, and export your data.</p>}
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="el-card">
          <div className="el-card-header">Accordion</div>
          <div className="el-card-body" style={{ padding: 0 }}>
            {accordionItems.map(item => (
              <div key={item.id} className="accordion-item">
                <div className="accordion-header" onClick={() => setAccordionOpen(accordionOpen === item.id ? null : item.id)}>
                  <span>{item.title}</span>
                  <span>{accordionOpen === item.id ? '▲' : '▼'}</span>
                </div>
                {accordionOpen === item.id && <div className="accordion-body">{item.body}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="el-card">
          <div className="el-card-header">Cards</div>
          <div className="el-card-body">
            <div className="card-examples">
              {[
                { title: 'Standard Card', color: '#3498db', text: 'A basic card component for displaying grouped content with a header and body.' },
                { title: 'Highlight Card', color: '#2ecc71', text: 'Use highlight cards to draw attention to important metrics or call-to-action content.' },
                { title: 'Warning Card', color: '#e67e22', text: 'Display warnings or important notices inside a styled card element.' },
              ].map(c => (
                <div key={c.title} className="example-card" style={{ borderTop: `3px solid ${c.color}` }}>
                  <div className="example-card-title" style={{ color: c.color }}>{c.title}</div>
                  <p className="example-card-text">{c.text}</p>
                  <button style={{ background: c.color, color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>Learn More</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="el-card">
          <div className="el-card-header">Modal Dialog</div>
          <div className="el-card-body">
            <p style={{ fontSize: '13px', color: '#7f8c8d', marginBottom: '16px' }}>Click the button below to open a modal dialog.</p>
            <button className="btn-badge primary" onClick={() => setModalOpen(true)}>Open Modal</button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Modal Title</h3>
              <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <p>This is a modal dialog component. You can use it to display important messages, forms, or confirmation prompts.</p>
              <p style={{ marginTop: '10px', color: '#7f8c8d', fontSize: '13px' }}>Click outside or the close button to dismiss.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-badge primary" onClick={() => setModalOpen(false)}>Confirm</button>
              <button className="btn-badge secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Elements;
