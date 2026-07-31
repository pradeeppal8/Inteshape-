import React, { useState, useEffect, useRef } from 'react';
import './Navigation.css';

const API = 'http://localhost:5000/api/navigation';
const TABS = [
  { key: 'header',        label: 'Header' },
  { key: 'footer',        label: 'Footer' },
  { key: 'mobileMenuTop', label: 'Mobile Menu Top' },
  { key: 'mobileApp',     label: 'Mobile App' },
  { key: 'socialMediaLinks',label: 'Social Media Links' },
];

const EMPTY_ITEM = { label: '', path: '', active: true };

const SOCIAL_FIELDS = [
  { key: 'facebookLink',  label: 'Facebook Link',  group: 'social', placeholder: 'https://facebook.com/...' },
  { key: 'twitterLink',   label: 'Twitter Link',   group: 'social', placeholder: 'https://x.com/...' },
  { key: 'instagramLink', label: 'Instagram Link', group: 'social', placeholder: 'https://instagram.com/...' },
  { key: 'linkedinLink',  label: 'LinkedIn Link',  group: 'social', placeholder: 'https://linkedin.com/...' },
];

const SOCIAL_EMPTY = SOCIAL_FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {});

const Navigation = () => {
  const [nav, setNav]         = useState({ header: [], footer: [], mobileMenuTop: [], mobileApp: [] });
  const [social, setSocial]   = useState(SOCIAL_EMPTY);
  const [activeTab, setActiveTab] = useState('header');
  const [saving, setSaving]   = useState(false);
  const [toasts, setToasts]   = useState([]);
  const [modal, setModal]     = useState(null); // { mode: 'add'|'edit', item, index }
  const [form, setForm]       = useState(EMPTY_ITEM);
  const [errors, setErrors]   = useState({});
  const dragIdx = useRef(null);
  const toastIdRef = useRef(0);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          const { socialMediaLinks, ...rest } = d.data;
          setNav(rest);
          if (socialMediaLinks) setSocial(socialMediaLinks);
        }
      })
      .catch(() => {});
  }, []);

  const showToast = (type, msg) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, type, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const closeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const items = nav[activeTab] || [];

  const setItems = (updated) => setNav(n => ({ ...n, [activeTab]: updated }));

  const toggleActive = (idx) => {
    const updated = items.map((it, i) => i === idx ? { ...it, active: !it.active } : it);
    setItems(updated);
  };

  const deleteItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const openAdd = (isCustom) => {
    setForm({ ...EMPTY_ITEM, isCustom: !!isCustom });
    setErrors({});
    setModal({ mode: 'add' });
  };

  const openEdit = (idx) => {
    setForm({ ...items[idx] });
    setErrors({});
    setModal({ mode: 'edit', index: idx });
  };

  const validate = () => {
    const e = {};
    if (!form.label.trim()) e.label = 'Label is required';
    if (!form.path.trim())  e.path  = 'Path is required';
    return e;
  };

  const saveModal = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (modal.mode === 'add') {
      setItems([...items, { id: Date.now(), ...form }]);
    } else {
      setItems(items.map((it, i) => i === modal.index ? { ...it, ...form } : it));
    }
    setModal(null);
  };

  const handleSave = () => {
    setSaving(true);
    const body = activeTab === 'socialMediaLinks' ? JSON.stringify(social) : JSON.stringify(items);
    fetch(`${API}/${activeTab}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          showToast('success', 'Data saved successfully!.');
          setTimeout(() => {
            showToast('success', 'Data saved successfully!');
          }, 250);
        }
        else showToast('error', 'Failed to save');
      })
      .catch(() => showToast('error', 'Failed to save'))
      .finally(() => setSaving(false));
  };

  // Simple drag-to-reorder
  const onDragStart = (e, idx) => { dragIdx.current = idx; e.dataTransfer.effectAllowed = 'move'; };
  const onDragOver  = (e, idx) => {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === idx) return;
    const reordered = [...items];
    const [moved] = reordered.splice(dragIdx.current, 1);
    reordered.splice(idx, 0, moved);
    dragIdx.current = idx;
    setItems(reordered);
  };
  const onDragEnd = () => { dragIdx.current = null; };

  const activeCount = items.filter(i => i.active).length;

  return (
    <div className="nv-page">
      {/* Toast */}
      <div className="nv-toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={`nv-toast nv-toast--${toast.type}`}>
            <span>{toast.type === 'success' ? '✓' : '✕'}</span>
            <span>{toast.msg}</span>
            <button onClick={() => closeToast(toast.id)}>×</button>
          </div>
        ))}
      </div>

      <h1 className="nv-title">Navigation Management</h1>

      {/* Tabs */}
      <div className="nv-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`nv-tab ${activeTab === t.key ? 'nv-tab--active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Section header + list — hidden for Social Media Links */}
      {activeTab !== 'socialMediaLinks' && (
        <>
          <div className="nv-section-header">
            <span className="nv-section-label">
              {TABS.find(t => t.key === activeTab)?.label} Navigation
              <span className="nv-count"> ({activeCount}/{items.length})</span>
            </span>
            <div className="nv-section-btns">
              <button className="nv-btn nv-btn--primary" onClick={() => openAdd(false)}>+ Add Page</button>
              <button className="nv-btn nv-btn--primary" onClick={() => openAdd(true)}>+ Add Custom Page</button>
            </div>
          </div>
          <div className="nv-list">
            {items.length === 0 && (
              <div className="nv-empty">No navigation items. Click "+ Add Page" to add one.</div>
            )}
            {items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="nv-item"
                draggable
                onDragStart={e => onDragStart(e, idx)}
                onDragOver={e => onDragOver(e, idx)}
                onDragEnd={onDragEnd}
              >
                <span className="nv-drag">
                  <svg viewBox="0 0 24 24" fill="#1a1a2e" stroke="currentColor" strokeWidth="3" width="24" height="24">
                    <circle cx="8" cy="6"  r="1.2" fill="#1a1a2e" stroke="none"/>
                    <circle cx="8" cy="12" r="1.2" fill="#1a1a2e" stroke="none"/>
                    <circle cx="8" cy="18" r="1.2" fill="#1a1a2e" stroke="none"/>
                    <circle cx="14" cy="6"  r="1.2" fill="#1a1a2e" stroke="none"/>
                    <circle cx="14" cy="12" r="1.2" fill="#1a1a2e" stroke="none"/>
                    <circle cx="14" cy="18" r="1.2" fill="#1a1a2e" stroke="none"/>
                  </svg>
                </span>
                <span className="nv-item-label">{item.label}</span>
                <div className="nv-item-actions">
                  <button className="nv-icon-btn" title="Edit" onClick={() => openEdit(idx)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="edit" role="presentation" class="fill-current"><path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z" fill='#9aa3b5'></path></svg>
                  </button>
                  <button className="nv-icon-btn nv-icon-btn--del" title="Delete" onClick={() => deleteItem(idx)}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill='#9aa3b5'></path></svg>
                  </button>
                  <label className="nv-toggle">
                    <input type="checkbox" checked={item.active} onChange={() => toggleActive(idx)} />
                    <span className="nv-toggle-slider" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Social Media Links Form */}
      {activeTab === 'socialMediaLinks' && (
        <div className="nv-social-card">
          {SOCIAL_FIELDS.map(f => (
            <div key={f.key} className={`nv-social-row nv-social-row--${f.group}`}>
              <label className="nv-social-label">{f.label} <span className="nv-req">*</span></label>
              <input
                className="nv-social-input"
                type="text"
                value={social[f.key] || ''}
                placeholder={f.placeholder}
                onChange={e => setSocial(s => ({ ...s, [f.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer bar */}
      <div className="nv-footer-bar">
        <button className="settings-btn-cancel" onClick={() => {
          fetch(API).then(r => r.json()).then(d => {
            if (d.success) {
              const { socialMediaLinks, ...rest } = d.data;
              setNav(rest);
              if (socialMediaLinks) setSocial(socialMediaLinks);
            }
          });
        }}>Cancel</button>
        <button className="settings-btn-save" onClick={handleSave} disabled={saving}>
          {saving ? 'Save' : 'Save'}
        </button>
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="nv-backdrop" onClick={() => setModal(null)}>
          <div className="nv-modal" onClick={e => e.stopPropagation()}>
            <div className="nv-modal-header">
              <h3>{modal.mode === 'add' ? (form.isCustom ? 'Add Custom Page' : 'Add Page') : 'Edit Navigation Item'}</h3>
              <button className="nv-modal-close" onClick={() => setModal(null)}>×</button>
            </div>
            <div className="nv-modal-body">
              <div className="nv-field">
                <label>LABEL *</label>
                <input
                  value={form.label}
                  onChange={e => { setForm(f => ({ ...f, label: e.target.value })); setErrors(v => ({ ...v, label: '' })); }}
                  placeholder="e.g. About Us"
                  className={errors.label ? 'err' : ''}
                />
                {errors.label && <span className="nv-err">{errors.label}</span>}
              </div>
              <div className="nv-field">
                <label>PATH *</label>
                <input
                  value={form.path}
                  onChange={e => { setForm(f => ({ ...f, path: e.target.value })); setErrors(v => ({ ...v, path: '' })); }}
                  placeholder="e.g. /about"
                  className={errors.path ? 'err' : ''}
                />
                {errors.path && <span className="nv-err">{errors.path}</span>}
              </div>
              <div className="nv-field nv-field--row">
                <label>ACTIVE</label>
                <label className="nv-toggle">
                  <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                  <span className="nv-toggle-slider" />
                </label>
              </div>
            </div>
            <div className="nv-modal-footer">
              <button className="settings-btn-cancel" onClick={() => setModal(null)}>Cancel</button>
              <button className="settings-btn-save" onClick={saveModal}>
                {modal.mode === 'add' ? 'Add' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
