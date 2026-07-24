import React, { useState } from 'react';
import './Forms.css';

const AdvancedForms = () => {
  const [tags, setTags] = useState(['React', 'Admin']);
  const [tagInput, setTagInput] = useState('');
  const [rating, setRating] = useState(3);
  const [toggle, setToggle] = useState({ notifications: true, darkMode: false, newsletter: true });

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <div className="forms-page">
      <div className="page-header">
        <h2>Advanced Forms</h2>
        <span className="breadcrumb">Home &rsaquo; Forms &rsaquo; Advanced</span>
      </div>
      <div className="forms-grid">
        <div className="form-card">
          <div className="form-card-header">Tag Input</div>
          <div className="form-body">
            <div className="form-group">
              <label>Tags (press Enter to add)</label>
              <div className="tag-input-wrapper">
                {tags.map(t => (
                  <span key={t} className="tag">
                    {t}
                    <button onClick={() => setTags(tags.filter(x => x !== t))}>×</button>
                  </span>
                ))}
                <input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  placeholder="Add tag..."
                  style={{ border: 'none', outline: 'none', flex: 1, minWidth: '80px', fontSize: '13px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Star Rating</label>
              <div className="star-rating">
                {[1,2,3,4,5].map(s => (
                  <span
                    key={s}
                    className={`star ${s <= rating ? 'filled' : ''}`}
                    onClick={() => setRating(s)}
                  >★</span>
                ))}
                <span style={{ marginLeft: '10px', fontSize: '13px', color: '#7f8c8d' }}>{rating} / 5</span>
              </div>
            </div>

            <div className="form-group">
              <label>Toggle Switches</label>
              <div className="toggle-list">
                {Object.keys(toggle).map(key => (
                  <div key={key} className="toggle-item">
                    <span className="toggle-label">{key.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}</span>
                    <div
                      className={`toggle-switch ${toggle[key] ? 'on' : ''}`}
                      onClick={() => setToggle({ ...toggle, [key]: !toggle[key] })}
                    >
                      <div className="toggle-knob" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">File Upload & Rich Inputs</div>
          <div className="form-body">
            <div className="form-group">
              <label>Profile Photo</label>
              <div className="file-drop-zone">
                <input type="file" accept="image/*" id="file-upload" style={{ display: 'none' }} />
                <label htmlFor="file-upload" className="file-drop-label">
                  <div style={{ fontSize: '36px', color: '#bdc3c7' }}>📁</div>
                  <div>Click to upload or drag & drop</div>
                  <div style={{ fontSize: '11px', color: '#95a5a6' }}>PNG, JPG up to 5MB</div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>Date Range</label>
              <div className="date-range-row">
                <input type="date" />
                <span style={{ padding: '0 8px', color: '#7f8c8d' }}>to</span>
                <input type="date" />
              </div>
            </div>
            <div className="form-group">
              <label>Priority Level</label>
              <div className="priority-group">
                {['Low', 'Medium', 'High', 'Critical'].map((p, i) => (
                  <label key={p} className={`priority-btn priority-${p.toLowerCase()}`}>
                    <input type="radio" name="priority" style={{ display: 'none' }} />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea rows={5} placeholder="Write a detailed description..." />
            </div>
            <div className="form-actions">
              <button className="btn-primary">Save Changes</button>
              <button className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedForms;
