import React, { useEffect, useRef, useState } from 'react';
import { getSettings, saveSettings } from '../../Appcall/settingsApi';
import './ContactDetails.css';

const EMPTY_FORM = {
  contactBanner: '',
  bannerEnabled: true,
  addressLine1: '',
  addressLine2: '',
  stateProvince: '',
  postcode: '',
  contactEmail: '',
  contactNumber: '',
  subjectOptions: '',
  radioFrequency: '',
  directions: '',
  mapLink: '',
//   latitudeLongitude: '',
};

const ContactDetails = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [initialForm, setInitialForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);
  const fileInputRef = useRef(null);
  const toastIdRef = useRef(0);

  useEffect(() => {
    let mounted = true;

    getSettings()
      .then((data) => {
        if (!mounted) return;
        const stored = data.contactDetails || {};
        const next = {
          ...EMPTY_FORM,
          ...stored,
          bannerEnabled: stored.bannerEnabled ?? true,
        };
        setForm(next);
        setInitialForm(next);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const showToast = (type, message) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (typeof base64 === 'string') {
        setForm((prev) => ({ ...prev, contactBanner: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setForm(initialForm);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showToast('info', 'Changes reverted.');
  };

  const validate = () => {
    if (!form.addressLine1.trim()) return 'Address Line 1 is required.';
    if (!form.stateProvince.trim()) return 'State / Province is required.';
    if (!form.postcode.trim()) return 'Postcode is required.';
    if (!form.contactEmail.trim()) return 'Contact Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) return 'Enter a valid Contact Email.';
    if (!form.contactNumber.trim()) return 'Contact Number is required.';
    if (!form.subjectOptions.trim()) return 'Subject Options is required.';
    if (!form.radioFrequency.trim()) return 'Radio Frequency is required.';
    if (!form.directions.trim()) return 'Directions is required.';
    if (!form.mapLink.trim()) return 'Map Link is required.';
    // if (!form.latitudeLongitude.trim()) return 'Latitude & Longitude is required.';
    return '';
  };

  const handleSave = async () => {
    const validationMessage = validate();
    if (validationMessage) {
      showToast('error', validationMessage);
      return;
    }

    setSaving(true);
    try {
      await saveSettings({ contactDetails: form });
      setInitialForm(form);
      showToast('success', 'Contact Details saved successfully!.');
      setTimeout(() => {
        showToast('success', 'Contact Details saved successfully!');
      }, 250);
    } catch {
      showToast('error', 'Failed to save. Make sure backend server is running.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="contact-details-page">
        <div className="contact-details-card">
          <div className="contact-row">
            <label>Loading...</label>
            <div className="contact-loading-dots" aria-label="Loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-details-page">
      <div className="contact-details-topbar">
        <h2>Contact Details</h2>
        <div className="contact-actions">
          <button type="button" className="settings-btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="settings-btn-save" onClick={handleSave} disabled={saving}>
            {saving ? 'Save' : 'Save'}
          </button>
        </div>
      </div>

      <div className="contact-details-card">
        <div className="contact-row">
          <label>
            Contact Banner <span className="req">*</span>
          </label>
          <div className="banner-upload-wrap">
            <button type="button" className="choose-file-btn" onClick={() => fileInputRef.current?.click()}>
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleBannerChange}
            />
            {form.contactBanner && (
              <span className="file-state">Banner selected</span>
            )}
            <label className="switch-toggle" title="Show banner on Contact page">
              <input
                type="checkbox"
                checked={!!form.bannerEnabled}
                onChange={(e) => setForm((prev) => ({ ...prev, bannerEnabled: e.target.checked }))}
              />
              <span className="switch-slider" />
              <span className="switch-label">Show Banner</span>
            </label>
          </div>
        </div>

        <div className="contact-row">
          <label>
            Address Line 1 <span className="req">*</span>
          </label>
          <input
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            placeholder="New York"
          />
        </div>

        <div className="contact-row">
          <label>
            Address Line 2 <span className="req">*</span>
          </label>
          <input
            name="addressLine2"
            value={form.addressLine2}
            onChange={handleChange}
            placeholder="Address Line 2"
          />
        </div>

        <div className="contact-row">
          <label>
            State / Province <span className="req">*</span>
          </label>
          <input
            name="stateProvince"
            value={form.stateProvince}
            onChange={handleChange}
            placeholder="123 Main Street, New York, NY 10001"
          />
        </div>

        <div className="contact-row">
          <label>
            Postcode <span className="req">*</span>
          </label>
          <input
            name="postcode"
            value={form.postcode}
            onChange={handleChange}
            placeholder="21324534"
          />
        </div>

        <div className="contact-row">
          <label>
            Contact Email <span className="req">*</span>
          </label>
          <input
            name="contactEmail"
            value={form.contactEmail}
            onChange={handleChange}
            placeholder="name@example.com"
          />
        </div>

        <div className="contact-row">
          <label>
            Contact Number <span className="req">*</span>
          </label>
          <input
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            placeholder="767121211"
          />
        </div>

        <div className="contact-row">
          <label>
            Subject Options <span className="req">*</span>
          </label>
          <input
            name="subjectOptions"
            value={form.subjectOptions}
            onChange={handleChange}
            placeholder="Enter comma separated values. Eg. - General Inquiry, I want to hire a room, Speak to the Imam"
          />
        </div>

        <div className="contact-row">
          <label>
            Radio Frequency <span className="req">*</span>
          </label>
          <input
            name="radioFrequency"
            value={form.radioFrequency}
            onChange={handleChange}
            placeholder="RD12345"
          />
        </div>

        <div className="contact-section-title">Google Map Configurations</div>

        <div className="contact-row">
          <label>
            Directions <span className="req">*</span>
          </label>
          <input
            name="directions"
            value={form.directions}
            onChange={handleChange}
            placeholder="http://www.google.com"
          />
        </div>

        <div className="contact-row">
          <label>
            Map Link <span className="req">*</span>
          </label>
          <input
            name="mapLink"
            value={form.mapLink}
            onChange={handleChange}
            placeholder="Oldham+St,+Allerton+Rd,+United+Kingdom/..."
          />
        </div>

        {/* <div className="contact-row">
          <label>
            Latitude & Longitude <span className="req">*</span>
          </label>
          <div className="latlng-wrap">
            <input
              name="latitudeLongitude"
              value={form.latitudeLongitude}
              onChange={handleChange}
              placeholder="eg. 53.483959,-2.244644"
            />
            <small>Add latitude and longitude comma separated.</small>
          </div>
        </div> */}
      </div>

      <div className="contact-details-bottombar">
        <div className="contact-actions">
          <button type="button" className="settings-btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="settings-btn-save" onClick={handleSave} disabled={saving}>
            {saving ? 'Save' : 'Save'}
          </button>
        </div>
      </div>

      <div className="contact-toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={`contact-toast contact-toast--${toast.type}`} role="status">
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDetails;
