import React, { useState, useRef } from 'react';
import './Forms.css';
import '../Settings/Settings.css';

const INIT_RICH = { dateFrom: '', dateTo: '', priority: '', description: '', photo: null, photoPreview: null };

const AdvancedForms = () => {
  const [tags, setTags] = useState(['React', 'Admin']);
  const [tagInput, setTagInput] = useState('');
  const [rating, setRating] = useState(3);
  const [toggle, setToggle] = useState({ notifications: true, darkMode: false, newsletter: true });
  const [rich, setRich] = useState({ ...INIT_RICH });
  const [richErrors, setRichErrors] = useState({});
  const [toasts, setToasts] = useState([]);
  const fileInputRef = useRef();

  const addTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRich = (e) => {
    const { name, value } = e.target;
    setRich(prev => ({ ...prev, [name]: value }));
    setRichErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setRich(prev => ({ ...prev, photo: file, photoPreview: ev.target.result }));
    reader.readAsDataURL(file);
    setRichErrors(prev => ({ ...prev, photo: '' }));
  };

  const handleSaveChanges = () => {
    const errs = {};
    if (!rich.photo)                  errs.photo       = 'Please upload a profile photo';
    if (!rich.dateFrom)               errs.dateFrom    = 'Start date is required';
    if (!rich.dateTo)                 errs.dateTo      = 'End date is required';
    if (rich.dateFrom && rich.dateTo && rich.dateTo < rich.dateFrom) errs.dateTo = 'End date must be after start date';
    if (!rich.priority)               errs.priority    = 'Please select a priority level';
    if (!rich.description.trim())     errs.description = 'Description is required';

    setRichErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const id1 = Date.now(), id2 = id1 + 1;
    // Sync profile photo to MyProfile
    if (rich.photoPreview) {
      localStorage.setItem('admin_profile_avatar', rich.photoPreview);
      window.dispatchEvent(new CustomEvent('profileAvatarUpdated', { detail: rich.photoPreview }));
    }
    setToasts(prev => [...prev, { id: id1, msg: 'Data saved successfully!.' }]);
    setTimeout(() => setToasts(prev => [...prev, { id: id2, msg: 'Data Loaded successfully!' }]), 400);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id1 && t.id !== id2)), 3500);
  };

  const handleCancel = () => {
    setRich({ ...INIT_RICH });
    setRichErrors({});
    if (fileInputRef.current) fileInputRef.current.value = '';
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
              <div
                className={`file-drop-zone${richErrors.photo ? ' input-err' : ''}`}
                onClick={() => fileInputRef.current.click()}
              >
                <input ref={fileInputRef} type="file" accept="image/*" id="file-upload" style={{ display: 'none' }} onChange={handlePhoto} />
                {rich.photoPreview
                  ? <img src={rich.photoPreview} alt="Preview" style={{ maxHeight: '100px', borderRadius: '6px', objectFit: 'cover' }} />
                  : <label htmlFor="file-upload" className="file-drop-label" style={{ cursor: 'pointer' }}>
                      <div style={{ fontSize: '36px', color: '#bdc3c7' }}>📁</div>
                      <div>Click to upload or drag & drop</div>
                      <div style={{ fontSize: '11px', color: '#95a5a6' }}>PNG, JPG up to 5MB</div>
                    </label>
                }
              </div>
              {richErrors.photo && <span className="auth-field-error">{richErrors.photo}</span>}
            </div>
            <div className="form-group">
              <label>Date Range</label>
              <div className="date-range-row">
                <input type="date" name="dateFrom" value={rich.dateFrom} onChange={handleRich} className={richErrors.dateFrom ? 'input-err' : ''} />
                <span style={{ padding: '0 8px', color: '#7f8c8d' }}>to</span>
                <input type="date" name="dateTo" value={rich.dateTo} onChange={handleRich} className={richErrors.dateTo ? 'input-err' : ''} />
              </div>
              {(richErrors.dateFrom || richErrors.dateTo) && <span className="auth-field-error">{richErrors.dateFrom || richErrors.dateTo}</span>}
            </div>
            <div className="form-group">
              <label>Priority Level</label>
              <div className="priority-group">
                {['Low', 'Medium', 'High', 'Critical'].map(p => (
                  <label
                    key={p}
                    className={`priority-btn priority-${p.toLowerCase()}${rich.priority === p ? ' selected' : ''}`}
                    style={rich.priority === p ? { outline: '2px solid var(--primary-color)', fontWeight: 700 } : {}}
                  >
                    <input type="radio" name="priority" value={p} checked={rich.priority === p} onChange={handleRich} style={{ display: 'none' }} />
                    {p}
                  </label>
                ))}
              </div>
              {richErrors.priority && <span className="auth-field-error">{richErrors.priority}</span>}
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" rows={5} placeholder="Write a detailed description..." value={rich.description} onChange={handleRich} className={richErrors.description ? 'input-err' : ''} />
              {richErrors.description && <span className="auth-field-error">{richErrors.description}</span>}
            </div>
            <div className="form-actions">
              <button type="button" className="settings-btn-save" onClick={handleSaveChanges}>Save Changes</button>
              <button type="button" className="settings-btn-cancel" onClick={handleCancel}>Cancel</button>
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

export default AdvancedForms;
