import React, { useState, useRef, useEffect } from 'react';
import { getSettings, saveSettings } from '../../Appcall/settingsApi';
import './Settings.css';

const PALETTE_COLORS = [
  '#0bc790','#0ba360','#41b883','#0c7982',
  '#29abe2','#1a7fc1','#9b59b6','#8e44ad',
  '#34495e','#0085d0','#009ebd','#f16821',
  '#ff6464','#ffbd4a','#ecf0f1','#bdc3c7',
  '#e5a882','#e58a82','#ab933d','#a14a35',
];

const ColorPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(value);
  const ref = useRef();

  useEffect(() => { setHex(value); }, [value]);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const confirm = () => { onChange(hex); setOpen(false); };

  return (
    <div className="cp-wrapper" ref={ref}>
      <div
        className="cp-swatch"
        style={{ background: value }}
        onClick={() => setOpen(o => !o)}
      />
      {open && (
        <div className="cp-popup">
          <div className="cp-grid">
            {PALETTE_COLORS.map(c => (
              <div
                key={c}
                className={`cp-color ${value === c ? 'selected' : ''}`}
                style={{ background: c }}
                onClick={() => { setHex(c); onChange(c); }}
              />
            ))}
          </div>
          <div className="cp-footer">
            <input
              className="cp-hex-input"
              value={hex}
              onChange={e => setHex(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && confirm()}
              maxLength={7}
              spellCheck={false}
            />
            <button className="cp-ok-btn" onClick={confirm}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
};

const tabs = ['Theme Configuration', 'Home', 'Navigation'];

const logoStyleOptions = ['Rectangle', 'Square', 'Circle'];

const applyColor = (color) => {
  document.documentElement.style.setProperty('--primary-color', color);
  localStorage.setItem('admin_primary_color', color);
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Theme Configuration');
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(true);

  const savedColor = localStorage.getItem('admin_primary_color') || '#29abe2';

  const [form, setForm] = useState({
    websiteName: 'Inteshape Admin',
    supportEmail: 'admin@inteshape.com',
    primaryColor: savedColor,
    tagline: 'Subscribe',
    logoStyle: 'Rectangle',
    headerLogo: null,
    headerLogoPreview: null,
    footerLogo: null,
    footerLogoPreview: null,
    favicon: null,
    faviconPreview: null,
  });

  // Load settings from API on mount
  useEffect(() => {
    getSettings()
      .then(data => {
        setForm(prev => ({
          ...prev,
          websiteName: data.websiteName || prev.websiteName,
          supportEmail: data.supportEmail || prev.supportEmail,
          primaryColor: data.primaryColor || prev.primaryColor,
          tagline: data.tagline || prev.tagline,
          logoStyle: data.logoStyle || prev.logoStyle,
          headerLogoPreview: data.headerLogo || null,
          footerLogoPreview: data.footerLogo || null,
          faviconPreview: data.favicon || null,
        }));
        if (data.primaryColor) applyColor(data.primaryColor);
      })
      .catch(() => { /* backend not running — use localStorage fallback */ })
      .finally(() => setLoading(false));
  }, []);

  const headerLogoRef = useRef();
  const footerLogoRef = useRef();
  const faviconRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (field, previewField) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setForm(prev => ({ ...prev, [field]: file, [previewField]: base64 }));
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (field, previewField, ref) => {
    setForm(prev => ({ ...prev, [field]: null, [previewField]: null }));
    if (ref.current) ref.current.value = '';
  };

  const handleSave = async () => {
    applyColor(form.primaryColor);
    const payload = {
      websiteName: form.websiteName,
      supportEmail: form.supportEmail,
      primaryColor: form.primaryColor,
      tagline: form.tagline,
      logoStyle: form.logoStyle,
      headerLogo: form.headerLogoPreview,
      footerLogo: form.footerLogoPreview,
      favicon: form.faviconPreview,
    };
    try {
      await saveSettings(payload);
    } catch {
      // fallback: save to localStorage if backend down
      Object.entries(payload).forEach(([k, v]) => v && localStorage.setItem('admin_' + k, v));
    }
    const id1 = Date.now();
    const id2 = id1 + 1;
    setToasts(prev => [...prev, { id: id1, msg: 'Data saved successfully!.' }]);
    setTimeout(() => setToasts(prev => [...prev, { id: id2, msg: 'Data Loaded successfully!' }]), 400);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id1 && t.id !== id2)), 3500);
  };

  return (
    <div className="settings-page">
      {/* Top bar */}
      <div className="settings-topbar">
        <h2 className="settings-title">General Setting</h2>
        <div className="settings-actions">
          <button className="settings-btn-cancel" onClick={() => window.history.back()}>Cancel</button>
          <button className="settings-btn-save" onClick={handleSave}>Save</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`settings-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="settings-body">
        {activeTab === 'Theme Configuration' && (
          <div className="settings-form">

            <div className="settings-row">
              <label>Website Name (Browser Tab Title) <span className="req">*</span></label>
              <input
                name="websiteName"
                value={form.websiteName}
                onChange={handleChange}
                placeholder="Enter website name"
                className="w-full form-control form-input form-input-bordered flatpickr-input"
              />
            </div>

            <div className="settings-row">
              <label>Support Email <span className="req">*</span></label>
              <input
                name="supportEmail"
                type="email"
                value={form.supportEmail}
                onChange={handleChange}
                placeholder="Enter support email"
              />
            </div>

            <div className="settings-row">
              <label>Primary Color Palette <span className="req">*</span></label>
              <ColorPicker
                value={form.primaryColor}
                onChange={color => {
                  applyColor(color);
                  setForm(prev => ({ ...prev, primaryColor: color }));
                }}
              />
            </div>

            <div className="settings-row">
              <label>Subscribe Tagline <span className="req">*</span></label>
              <input
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="Enter tagline"
                className="w-full form-control form-input form-input-bordered flatpickr-input"
              />
            </div>

            {/* Header Logo */}
            <div className="settings-row">
              <label>Header Logo</label>
              <div className="upload-area">
                {form.headerLogoPreview && (
                  <div className="logo-preview-box">
                    <img src={form.headerLogoPreview} alt="Header Logo" />
                  </div>
                )}
                {form.headerLogoPreview && (
                  <button className="delete-btn" onClick={() => handleDelete('headerLogo', 'headerLogoPreview', headerLogoRef)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill='#e74c3c'></path></svg> Delete
                  </button>
                )}
                <button className="choose-btn" onClick={() => headerLogoRef.current.click()}>
                  Choose File
                </button>
                <input ref={headerLogoRef} type="file" accept="image/*" hidden onChange={handleFile('headerLogo', 'headerLogoPreview')} />
                <p className="upload-note">Note: Image Size to be uploaded is 300 x 61</p>
              </div>
            </div>

            {/* Logo Style */}
            <div className="settings-row">
              <label>Logo Style</label>
              <select name="logoStyle" value={form.logoStyle} onChange={handleChange}>
                {logoStyleOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Footer Logo */}
            <div className="settings-row">
              <label>Footer Logo</label>
              <div className="upload-area">
                {form.footerLogoPreview && (
                  <div className="logo-preview-box">
                    <img src={form.footerLogoPreview} alt="Footer Logo" />
                  </div>
                )}
                {form.footerLogoPreview && (
                  <button className="delete-btn" onClick={() => handleDelete('footerLogo', 'footerLogoPreview', footerLogoRef)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill='#e74c3c'></path></svg> Delete
                  </button>
                )}
                <button className="choose-btn" onClick={() => footerLogoRef.current.click()}>
                  Choose File
                </button>
                <input ref={footerLogoRef} type="file" accept="image/*" hidden onChange={handleFile('footerLogo', 'footerLogoPreview')} />
                <p className="upload-note">Note: Image Size to be uploaded is 300 x 61</p>
              </div>
            </div>

            {/* Favicon */}
            <div className="settings-row">
              <label>Favicon</label>
              <div className="upload-area">
                {form.faviconPreview && (
                  <div className="favicon-preview-box">
                    <img src={form.faviconPreview} alt="Favicon" />
                  </div>
                )}
                {form.faviconPreview && (
                  <button className="delete-btn" onClick={() => handleDelete('favicon', 'faviconPreview', faviconRef)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill='#e74c3c'></path></svg> Delete
                  </button>
                )}
                <button className="choose-btn" onClick={() => faviconRef.current.click()}>
                  Choose File
                </button>
                <input ref={faviconRef} type="file" accept="image/*,.ico" hidden onChange={handleFile('favicon', 'faviconPreview')} />
                <p className="upload-note">Note: Image Size to be uploaded is 28 x 25</p>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'Home' && (
          <div className="settings-form">
            <div className="settings-row">
              <label>Hero Title</label>
              <input placeholder="Enter hero title" className="w-full form-control form-input form-input-bordered flatpickr-input" />
            </div>
            <div className="settings-row">
              <label>Hero Subtitle</label>
              <input placeholder="Enter hero subtitle" className="w-full form-control form-input form-input-bordered flatpickr-input" />
            </div>
            <div className="settings-row">
              <label>CTA Button Text</label>
              <input placeholder="e.g. Get Started" className="w-full form-control form-input form-input-bordered flatpickr-input" />
            </div>
          </div>
        )}

        {activeTab === 'Navigation' && (
          <div className="settings-form">
            <div className="settings-row">
              <label>Nav Item 1</label>
              <input defaultValue="Home" className="w-full form-control form-input form-input-bordered flatpickr-input"/>
            </div>
            <div className="settings-row">
              <label>Nav Item 2</label>
              <input defaultValue="About" className="w-full form-control form-input form-input-bordered flatpickr-input"/>
            </div>
            <div className="settings-row">
              <label>Nav Item 3</label>
              <input defaultValue="Contact" className="w-full form-control form-input form-input-bordered flatpickr-input"/>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="settings-bottombar">
        <button className="settings-btn-cancel" onClick={() => window.history.back()}>Cancel</button>
        <button className="settings-btn-save" onClick={handleSave}>Save</button>
      </div>

      {/* Toast notifications */}
      <div className="settings-toast-container">
        {toasts.map(t => (
          <div key={t.id} className="settings-toast">{t.msg}</div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
