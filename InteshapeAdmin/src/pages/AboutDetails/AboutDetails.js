import React, { useEffect, useRef, useState } from 'react';
import { getSettings, saveSettings } from '../../Appcall/settingsApi';
import './AboutDetails.css';

const EMPTY_FORM = {
    bannerImage: '',
    bannerEnabled: true,
    eyebrow: 'About Us',
    title: 'About Company',
    description: '',
    whatWeTitle: 'What We Do',
    whatWeItems: [
        {
            number: '01',
            title: 'Architecture',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
        },
        {
            number: '02',
            title: 'Planning',
            image: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?q=80&w=1200&auto=format&fit=crop',
        },
        {
            number: '03',
            title: 'Exterior',
            image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop',
        },
        {
            number: '04',
            title: 'Decoration',
            image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
        },
    ],
    clientsTitle: 'Our Clinet',
    clientsShowButton: true,
    clientsButtonText: 'View More',
    clientsButtonLink: '',
    clientsItems: [
        { name: 'Real Estate 1', src: 'https://dummyimage.com/260x140/f7f7f7/5f6368&text=REAL+ESTATE+COMPANY', active: true },
        { name: 'Real Estate 2', src: 'https://dummyimage.com/260x140/f7f7f7/5f6368&text=REAL+ESTATE+COMPANY', active: true },
        { name: 'Real Estate 3', src: 'https://dummyimage.com/260x140/f7f7f7/5f6368&text=REAL+ESTATE+COMPANY', active: true },
        { name: 'Real Estate 4', src: 'https://dummyimage.com/260x140/f7f7f7/5f6368&text=REAL+ESTATE+COMPANY', active: true },
    ],
    superTeamTitle: 'Super Team',
    superTeamMembers: [
        { name: 'Johnny Jackman', role: 'Architect', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop', active: true },
        { name: 'Daniel Rickman', role: 'Architect', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop', active: true },
        { name: 'Mark Norwich', role: 'Finances', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=900&auto=format&fit=crop', active: true },
        { name: 'Nich Jonas', role: 'Finances', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=900&auto=format&fit=crop', active: true },
    ],
};

const AboutDetails = () => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [initialForm, setInitialForm] = useState(EMPTY_FORM);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [activeTab, setActiveTab] = useState('about');
    const fileInputRef = useRef(null);
    const whatWeFileRefs = useRef({});
    const clientsFileRefs = useRef({});
    const superTeamFileRefs = useRef({});
    const toastIdRef = useRef(0);

    useEffect(() => {
        let mounted = true;

        getSettings()
            .then((data) => {
                if (!mounted) return;
                const stored = data.aboutPage || {};
                const next = {
                    ...EMPTY_FORM,
                    ...stored,
                    whatWeTitle: stored.whatWeTitle || EMPTY_FORM.whatWeTitle,
                    whatWeItems: Array.isArray(stored.whatWeItems) && stored.whatWeItems.length
                        ? stored.whatWeItems.map((item, idx) => ({
                            number: item.number || String(idx + 1).padStart(2, '0'),
                            title: item.title || '',
                            image: item.image || '',
                        }))
                        : EMPTY_FORM.whatWeItems,
                    clientsTitle: stored.clientsTitle || EMPTY_FORM.clientsTitle,
                    clientsShowButton: stored.clientsShowButton ?? EMPTY_FORM.clientsShowButton,
                    clientsButtonText: stored.clientsButtonText || EMPTY_FORM.clientsButtonText,
                    clientsButtonLink: stored.clientsButtonLink || EMPTY_FORM.clientsButtonLink,
                    clientsItems: Array.isArray(stored.clientsItems) && stored.clientsItems.length
                        ? stored.clientsItems.map((item, idx) => ({
                            name: item.name || `Client ${idx + 1}`,
                            src: item.src || '',
                            active: item.active ?? true,
                        }))
                        : EMPTY_FORM.clientsItems,
                    superTeamTitle: stored.superTeamTitle || EMPTY_FORM.superTeamTitle,
                    superTeamMembers: Array.isArray(stored.superTeamMembers) && stored.superTeamMembers.length
                        ? stored.superTeamMembers.map((item, idx) => ({
                            name: item.name || `Member ${idx + 1}`,
                            role: item.role || '',
                            image: item.image || '',
                            active: item.active ?? true,
                        }))
                        : EMPTY_FORM.superTeamMembers,
                    bannerEnabled: stored.bannerEnabled ?? true,
                };
                setForm(next);
                setInitialForm(next);
            })
            .catch(() => { })
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

    const handleBannerChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result;
            if (typeof base64 === 'string') {
                setForm((prev) => ({ ...prev, bannerImage: base64 }));
            }
        };
        reader.readAsDataURL(file);
    };

    const validate = () => {
        if (activeTab === 'about') {
            if (!form.title.trim()) return 'Title is required.';
            if (!form.description.trim()) return 'Description is required.';
            return '';
        }

        if (activeTab === 'whatwe') {
            if (!form.whatWeTitle.trim()) return 'What We title is required.';
            const hasInvalid = form.whatWeItems.some((item) => !item.title.trim());
            if (hasInvalid) return 'Each What We card title is required.';
            return '';
        }

        if (activeTab === 'clients') {
            if (!form.clientsTitle.trim()) return 'Clients title is required.';
            if (form.clientsShowButton && !form.clientsButtonText.trim()) return 'Client button text is required.';
            const hasInvalid = form.clientsItems.some((item) => !item.name.trim());
            if (hasInvalid) return 'Each client name is required.';
            return '';
        }

        if (activeTab === 'superteam') {
            if (!form.superTeamTitle.trim()) return 'Super Team title is required.';
            const hasInvalid = form.superTeamMembers.some((item) => !item.name.trim());
            if (hasInvalid) return 'Each team member name is required.';
            return '';
        }

        return '';
    };

    const updateWhatWeItem = (idx, key, value) => {
        setForm((prev) => ({
            ...prev,
            whatWeItems: prev.whatWeItems.map((item, i) =>
                i === idx ? { ...item, [key]: value } : item
            ),
        }));
    };

    const handleWhatWeImageChange = (idx, e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result;
            if (typeof base64 === 'string') {
                updateWhatWeItem(idx, 'image', base64);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleAddWhatWeCard = () => {
        setForm((prev) => {
            const nextIndex = prev.whatWeItems.length + 1;
            const nextCard = {
                number: String(nextIndex).padStart(2, '0'),
                title: '',
                image: '',
            };

            return {
                ...prev,
                whatWeItems: [...prev.whatWeItems, nextCard],
            };
        });

        showToast('info', 'New card added. Fill details and save.');
    };

    const updateClientItem = (idx, key, value) => {
        setForm((prev) => ({
            ...prev,
            clientsItems: prev.clientsItems.map((item, i) =>
                i === idx ? { ...item, [key]: value } : item
            ),
        }));
    };

    const handleClientImageChange = (idx, e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result;
            if (typeof base64 === 'string') {
                updateClientItem(idx, 'src', base64);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleAddClientCard = () => {
        setForm((prev) => ({
            ...prev,
            clientsItems: [
                ...prev.clientsItems,
                {
                    name: `Client ${prev.clientsItems.length + 1}`,
                    src: '',
                    active: true,
                },
            ],
        }));
        showToast('info', 'New client card added.');
    };

    const handleDeleteClientCard = (idx) => {
        setForm((prev) => {
            if (prev.clientsItems.length <= 1) {
                return prev;
            }

            return {
                ...prev,
                clientsItems: prev.clientsItems.filter((_, i) => i !== idx),
            };
        });

        if (form.clientsItems.length <= 1) {
            showToast('error', 'At least one client card is required.');
            return;
        }

        showToast('info', 'Client card deleted.');
    };

    const updateSuperTeamMember = (idx, key, value) => {
        setForm((prev) => ({
            ...prev,
            superTeamMembers: prev.superTeamMembers.map((item, i) =>
                i === idx ? { ...item, [key]: value } : item
            ),
        }));
    };

    const handleSuperTeamImageChange = (idx, e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target?.result;
            if (typeof base64 === 'string') {
                updateSuperTeamMember(idx, 'image', base64);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleAddSuperTeamMember = () => {
        setForm((prev) => ({
            ...prev,
            superTeamMembers: [
                ...prev.superTeamMembers,
                {
                    name: `Member ${prev.superTeamMembers.length + 1}`,
                    role: '',
                    image: '',
                    active: true,
                },
            ],
        }));
        showToast('info', 'New super team member card added.');
    };

    const handleDeleteSuperTeamMember = (idx) => {
        setForm((prev) => {
            if (prev.superTeamMembers.length <= 1) {
                return prev;
            }

            return {
                ...prev,
                superTeamMembers: prev.superTeamMembers.filter((_, i) => i !== idx),
            };
        });

        if (form.superTeamMembers.length <= 1) {
            showToast('error', 'At least one super team member is required.');
            return;
        }

        showToast('info', 'Super team member deleted.');
    };

    const handleDeleteSuperTeamImage = (idx) => {
        if (!form.superTeamMembers[idx]?.image) {
            showToast('info', 'Image already empty.');
            return;
        }

        updateSuperTeamMember(idx, 'image', '');
        if (superTeamFileRefs.current[idx]) {
            superTeamFileRefs.current[idx].value = '';
        }
        showToast('info', 'Member image deleted.');
    };

    const handleSave = async () => {
        const validationMessage = validate();
        if (validationMessage) {
            showToast('error', validationMessage);
            return;
        }

        setSaving(true);
        try {
            await saveSettings({ aboutPage: form });
            setInitialForm(form);
            showToast('success', 'About Us settings saved successfully!');
            setTimeout(() => {
                showToast('success', 'About Us settings saved successfully!');
            }, 250);
        } catch {
            showToast('error', 'Failed to save. Make sure backend server is running.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setForm(initialForm);
        if (fileInputRef.current) fileInputRef.current.value = '';
        showToast('info', 'Changes reverted.');
    };

    if (loading) {
        return (
            <div className="about-details-page">
                <div className="about-details-card">
                    <div className="about-row">
                        <label>Loading...</label>
                        <div className="about-loading-dots" aria-label="Loading">
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
        <div className="about-details-page">
            <div className="about-details-topbar">
                <h2>About Page Banners</h2>
                <div className="about-actions">
                    <button type="button" className="settings-btn-cancel" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="settings-btn-save" onClick={handleSave} disabled={saving}>
                        {saving ? 'Save' : 'Save'}
                    </button>
                </div>
            </div>

            <div className="about-tabs">
                <button
                    type="button"
                    className={`about-tab ${activeTab === 'about' ? 'about-tab--active' : ''}`}
                    onClick={() => setActiveTab('about')}
                >
                    About Us
                </button>
                <button
                    type="button"
                    className={`about-tab ${activeTab === 'whatwe' ? 'about-tab--active' : ''}`}
                    onClick={() => setActiveTab('whatwe')}
                >
                    What We
                </button>
                <button
                    type="button"
                    className={`about-tab ${activeTab === 'superteam' ? 'about-tab--active' : ''}`}
                    onClick={() => setActiveTab('superteam')}
                >
                    Super Team
                </button>
                <button
                    type="button"
                    className={`about-tab ${activeTab === 'clients' ? 'about-tab--active' : ''}`}
                    onClick={() => setActiveTab('clients')}
                >
                    Our Clients
                </button>
            </div>

            {activeTab === 'about' && (
                <div className="about-details-card">
                    <div className="about-row about-row--start">
                        <label>
                            Banner Image <span className="req">*</span>
                        </label>
                        <div className="about-banner-wrap">
                            {form.bannerImage ? (
                                <img src={form.bannerImage} alt="About banner" className="about-banner-preview" />
                            ) : (
                                <div className="about-banner-empty">No image selected</div>
                            )}

                            <div className="about-banner-controls">
                                <button type="button" className="choose-file-btn" onClick={() => fileInputRef.current?.click()}>
                                    Choose File
                                </button>
                                <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleBannerChange} />
                            </div>

                            <small className="about-note">Note: Image size recommended is 760 x 694</small>
                        </div>
                    </div>

                    <div className="about-row">
                        <label>
                            Eyebrow <span className="req">*</span>
                        </label>
                        <input
                            value={form.eyebrow}
                            onChange={(e) => setForm((prev) => ({ ...prev, eyebrow: e.target.value }))}
                            placeholder="About Us"
                        />
                    </div>

                    <div className="about-row">
                        <label>
                            Title <span className="req">*</span>
                        </label>
                        <input
                            value={form.title}
                            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="About"
                        />
                    </div>

                    <div className="about-row about-row--start">
                        <label>
                            Description <span className="req">*</span>
                        </label>
                        <textarea
                            rows={4}
                            value={form.description}
                            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Write banner description"
                        />
                    </div>
                </div>
            )}

            {activeTab === 'whatwe' && (
                <div className="about-details-card">
                    <div className="about-row">
                        <label>
                            Section Title <span className="req">*</span>
                        </label>
                        <input
                            value={form.whatWeTitle}
                            onChange={(e) => setForm((prev) => ({ ...prev, whatWeTitle: e.target.value }))}
                            placeholder="What We Do"
                        />
                    </div>

                    <div className="about-whatwe-grid-wrap">
                        {form.whatWeItems.map((item, idx) => (
                            <div key={`whatwe-${idx}`} className="about-whatwe-editor-card">
                                <div className="about-whatwe-editor-head">
                                    <h4>Card {idx + 1}</h4>
                                </div>

                                <div className="about-whatwe-preview">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title || `What We ${idx + 1}`} />
                                    ) : (
                                        <div className="about-whatwe-empty">No image</div>
                                    )}
                                </div>

                                <div className="about-whatwe-field-row">
                                    <label>Number</label>
                                    <input
                                        value={item.number}
                                        onChange={(e) => updateWhatWeItem(idx, 'number', e.target.value)}
                                        placeholder="01"
                                    />
                                </div>

                                <div className="about-whatwe-field-row">
                                    <label>Title <span className="req">*</span></label>
                                    <input
                                        value={item.title}
                                        onChange={(e) => updateWhatWeItem(idx, 'title', e.target.value)}
                                        placeholder="Architecture"
                                    />
                                </div>

                                <div className="about-whatwe-actions">
                                    <button
                                        type="button"
                                        className="choose-file-btn"
                                        onClick={() => whatWeFileRefs.current[idx]?.click()}
                                    >
                                        Choose File
                                    </button>
                                    <input
                                        ref={(el) => {
                                            whatWeFileRefs.current[idx] = el;
                                        }}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleWhatWeImageChange(idx, e)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="about-whatwe-note">
                        <button type="button" className="bn-create-btn" onClick={handleAddWhatWeCard}>
                            Create New Card
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'clients' && (
                <div className="about-details-card">
                    <div className="about-row">
                        <label>
                            Section Title <span className="req">*</span>
                        </label>
                        <input
                            value={form.clientsTitle}
                            onChange={(e) => setForm((prev) => ({ ...prev, clientsTitle: e.target.value }))}
                            placeholder="Our Clinet"
                        />
                    </div>

                    <div className="about-clients-grid-wrap">
                        {form.clientsItems.map((item, idx) => (
                            <div key={`client-${idx}`} className="about-clients-editor-card">
                                <div className="about-clients-editor-head">
                                    <h4>Client {idx + 1}</h4>
                                    <div className="about-clients-head-actions">
                                        <label className="switch-toggle" title="Show/Hide logo">
                                            <input
                                                type="checkbox"
                                                checked={!!item.active}
                                                onChange={(e) => updateClientItem(idx, 'active', e.target.checked)}
                                            />
                                            <span className="switch-slider" />
                                        </label>
                                        <button
                                            type="button"
                                            className="switch-handle"
                                            title="Delete client card"
                                            onClick={() => handleDeleteClientCard(idx)}
                                            aria-label="Delete client card"
                                        >
                                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
                                                <path d="M9 3a1 1 0 0 0-1 1v1H5a1 1 0 1 0 0 2h1v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7h1a1 1 0 1 0 0-2h-3V4a1 1 0 0 0-1-1H9zm1 2h4v1h-4V5zm-2 2h8v12H8V7zm2 2a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1zm4 0a1 1 0 0 0-1 1v6a1 1 0 1 0 2 0v-6a1 1 0 0 0-1-1z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="about-clients-preview">
                                    {item.src ? (
                                        <img src={item.src} alt={item.name || `Client ${idx + 1}`} />
                                    ) : (
                                        <div className="about-clients-empty">No logo</div>
                                    )}
                                </div>

                                <div className="about-whatwe-field-row">
                                    <label>Name <span className="req">*</span></label>
                                    <input
                                        value={item.name}
                                        onChange={(e) => updateClientItem(idx, 'name', e.target.value)}
                                        placeholder="Real Estate Company"
                                    />
                                </div>

                                <div className="about-whatwe-actions">
                                    <button
                                        type="button"
                                        className="choose-file-btn"
                                        onClick={() => clientsFileRefs.current[idx]?.click()}
                                    >
                                        Choose Logo
                                    </button>
                                    <input
                                        ref={(el) => {
                                            clientsFileRefs.current[idx] = el;
                                        }}
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => handleClientImageChange(idx, e)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="about-row">
                        <label>
                            Show Button in Banner <span className="req">*</span>
                        </label>
                        <label className="switch-toggle" title="Show/hide hover button on client logos">
                            <input
                                type="checkbox"
                                checked={!!form.clientsShowButton}
                                onChange={(e) => setForm((prev) => ({ ...prev, clientsShowButton: e.target.checked }))}
                            />
                            <span className="switch-slider" />
                        </label>
                    </div>

                    {form.clientsShowButton && (
                        <>
                            <div className="about-row">
                                <label>Button Text</label>
                                <input
                                    value={form.clientsButtonText}
                                    onChange={(e) => setForm((prev) => ({ ...prev, clientsButtonText: e.target.value }))}
                                    placeholder="Button Text"
                                />
                            </div>

                            <div className="about-row">
                                <label>Button Link</label>
                                <input
                                    value={form.clientsButtonLink}
                                    onChange={(e) => setForm((prev) => ({ ...prev, clientsButtonLink: e.target.value }))}
                                    placeholder="Button Link"
                                />
                            </div>
                        </>
                    )}

                    <div className="about-whatwe-note">
                        <button type="button" className="bn-create-btn" onClick={handleAddClientCard}>
                            Create New Logo Card
                        </button>
                    </div>
                </div>
            )}

            {activeTab === 'superteam' && (
                <div className="about-details-card">
                    <div className="about-row">
                        <label>
                            Section Title <span className="req">*</span>
                        </label>
                        <input
                            value={form.superTeamTitle}
                            onChange={(e) => setForm((prev) => ({ ...prev, superTeamTitle: e.target.value }))}
                            placeholder="Super Team"
                        />
                    </div>

                    <div className="about-superteam-stack">
                        {form.superTeamMembers.map((item, idx) => (
                            <div key={`member-${idx}`} className="about-superteam-member-block">

                                <div className="about-row about-row--start">
                                    <label>
                                        Member Image <span className="req">*</span>
                                    </label>
                                    <div className="about-banner-wrap">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name || `Member ${idx + 1}`} className="about-superteam-preview" />
                                        ) : (
                                            <div className="about-banner-empty about-superteam-preview-empty">No image selected</div>
                                        )}
                                        <button
                                            type="button"
                                            className="about-delete-image-btn"
                                            title="Delete image"
                                            onClick={() => handleDeleteSuperTeamImage(idx)}
                                            aria-label="Delete image"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
                                                <path fillRule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill="var(--primary-color)" />
                                            </svg>
                                            <span>Delete</span>
                                        </button>

                                        <div className="about-banner-controls">
                                            <button
                                                type="button"
                                                className="choose-file-btn"
                                                onClick={() => superTeamFileRefs.current[idx]?.click()}
                                            >
                                                Choose File
                                            </button>
                                            <input
                                                ref={(el) => {
                                                    superTeamFileRefs.current[idx] = el;
                                                }}
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => handleSuperTeamImageChange(idx, e)}
                                            />
                                        </div>

                                        <small className="about-note">Note: Image size recommended is 430 x 500</small>
                                    </div>
                                </div>

                                <div className="about-row about-row--member-head">
                                    <label>Member {idx + 1}</label>
                                    <div className="about-superteam-head-actions">
                                        <label className="switch-toggle" title="Show/Hide member">
                                            <input
                                                type="checkbox"
                                                checked={!!item.active}
                                                onChange={(e) => updateSuperTeamMember(idx, 'active', e.target.checked)}
                                            />
                                            <span className="switch-slider" />
                                        </label>
                                    </div>
                                </div>

                                <div className="about-row">
                                    <label>Name <span className="req">*</span></label>
                                    <input
                                        value={item.name}
                                        onChange={(e) => updateSuperTeamMember(idx, 'name', e.target.value)}
                                        placeholder="Johnny Jackman"
                                    />
                                </div>

                                <div className="about-row">
                                    <label>Role</label>
                                    <input
                                        value={item.role}
                                        onChange={(e) => updateSuperTeamMember(idx, 'role', e.target.value)}
                                        placeholder="Architect"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="about-whatwe-note">
                        <button type="button" className="bn-create-btn" onClick={handleAddSuperTeamMember}>
                            Create New Member Card
                        </button>
                    </div>
                </div>
            )}


            <div className="about-details-bottombar">
                <div className="about-actions">
                    <button type="button" className="settings-btn-cancel" onClick={handleCancel}>Cancel</button>
                    <button type="button" className="settings-btn-save" onClick={handleSave} disabled={saving}>
                        {saving ? 'Save' : 'Save'}
                    </button>
                </div>
            </div>

            <div className="about-toast-container" aria-live="polite" aria-atomic="true">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`about-toast about-toast--${toast.type}`} role="status">
                        {toast.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutDetails;
