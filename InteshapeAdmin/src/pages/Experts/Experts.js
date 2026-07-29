import React, { useState, useEffect, useRef } from 'react';
import './Experts.css';

const API = 'http://localhost:5000/api/experts';
const EMPTY = { title: '', location: '', image: null, active: true };

const Experts = () => {
    const [experts, setExperts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [errors, setErrors] = useState({});
    const [toasts, setToasts] = useState([]);
    const [viewExpert, setViewExpert] = useState(null);
    const toastId = useRef(0);
    const fileRef = useRef();

    const showToast = (type, msg) => {
        const id = ++toastId.current;
        setToasts(t => [...t, { id, type, msg }]);
        setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
    };

    const fetchExperts = () =>
        fetch(API).then(r => r.json()).then(d => { if (d.success) setExperts(d.data); }).catch(() => { });

    useEffect(() => { fetchExperts(); }, []);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => setForm(f => ({ ...f, image: ev.target.result }));
        reader.readAsDataURL(file);
    };

    const validate = () => {
        const errs = {};
        if (!form.title.trim()) errs.title = 'Title is required';
        return errs;
    };

    const openCreate = () => {
        setForm(EMPTY); setEditId(null); setErrors({}); setShowModal(true);
        if (fileRef.current) fileRef.current.value = '';
    };

    const openEdit = (ex) => {
        setForm({ title: ex.title, location: ex.location, image: ex.image, active: ex.active });
        setEditId(ex.id); setErrors({}); setShowModal(true); setViewExpert(null);
        if (fileRef.current) fileRef.current.value = '';
    };

    const handleSave = () => {
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `${API}/${editId}` : API;
        fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
            .then(r => r.json())
            .then(d => {
                if (d.success) {
                    showToast('success', editId ? 'Expert updated!' : 'Expert created!');
                    fetchExperts(); setShowModal(false); setForm(EMPTY); setEditId(null);
                }
            })
            .catch(() => showToast('error', 'Failed to save'));
    };

    const handleDelete = (id) => {
        fetch(`${API}/${id}`, { method: 'DELETE' })
            .then(() => { fetchExperts(); showToast('success', 'Expert deleted'); });
    };

    const toggleActive = (ex) => {
        fetch(`${API}/${ex.id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...ex, active: !ex.active })
        }).then(() => fetchExperts());
    };

    const filtered = experts
        .filter(ex =>
            ex.title?.toLowerCase().includes(search.toLowerCase()) ||
            ex.location?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => sortAsc ? a.id - b.id : b.id - a.id);

    return (
        <>
            <div className={`ex-page${viewExpert ? ' ex-page--view-open' : ''}`}>
                {/* Toasts */}
                <div className="ex-toasts">
                    {toasts.map(t => (
                        <div key={t.id} className={`ex-toast ex-toast--${t.type}`}>
                            <span>{t.type === 'success' ? '✓' : '✕'}</span>
                            <span>{t.msg}</span>
                            <button onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))}>×</button>
                        </div>
                    ))}
                </div>

                {/* Page header */}
                <div className="ex-page-header">
                    <h1>Our Experts</h1>
                    <div className="ex-page-header-right">
                        <div className="ex-search-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <button className="bn-create-btn" onClick={openCreate}>+ Add Expert</button>
                    </div>
                </div>

                {/* Table */}
                <div className="ex-table-card">
                    <table className="ex-table">
                        <thead>
                            <tr>
                                <th className="ex-th-id" onClick={() => setSortAsc(p => !p)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                                    ID {sortAsc ? '↑↓' : '↓↑'}
                                </th>
                                <th>TITLE</th>
                                <th>LOCATION</th>
                                <th>IMAGE</th>
                                <th className="ex-th-status">STATUS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 && (
                                <tr><td colSpan={6} className="ex-empty">No experts found</td></tr>
                            )}
                            {filtered.map((ex, i) => (
                                <tr key={ex.id} className="ex-row">
                                    <td className="ex-td-id">{sortAsc ? i + 1 : filtered.length - i}</td>
                                    <td className="ex-td-title">{ex.title}</td>
                                    <td className="ex-td-loc">{ex.location || <span className="ex-dash">—</span>}</td>
                                    <td>
                                        {ex.image
                                            ? <img src={ex.image} alt={ex.title} className="ex-thumb" />
                                            : <div className="ex-thumb-empty" />}
                                    </td>
                                    <td className="ex-td-status">
                                        <span
                                            className={`ex-dot ${ex.active ? 'ex-dot--on' : 'ex-dot--off'}`}
                                            onClick={() => toggleActive(ex)}
                                            title={ex.active ? 'Active' : 'Inactive'}
                                        />
                                    </td>
                                    <td className="ex-td-actions">
                                        <button className="ex-act-btn" title="View" onClick={() => setViewExpert(viewExpert?.id === ex.id ? null : ex)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 16" aria-labelledby="view" role="presentation" class="fill-current"><path d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill='#9aa3b5'></path></svg>
                                        </button>
                                        <button className="ex-act-btn" title="Edit" onClick={() => openEdit(ex)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="edit" role="presentation" class="fill-current"><path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z" fill='#9aa3b5'></path></svg>
                                        </button>
                                        <button className="ex-act-btn ex-act-btn--del" title="Delete" onClick={() => handleDelete(ex.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill='#9aa3b5'></path></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="ex-backdrop" onClick={() => setShowModal(false)}>
                        <div className="ex-modal" onClick={e => e.stopPropagation()}>
                            <div className="ex-modal-header">
                                <h2>{editId ? 'Edit Expert' : 'Add Expert'}</h2>
                                <button className="ex-modal-close" onClick={() => setShowModal(false)}>×</button>
                            </div>
                            <div className="ex-modal-body">
                                <div className="ex-mfield">
                                    <label>TITLE *</label>
                                    <input value={form.title}
                                        onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setErrors(v => ({ ...v, title: '' })); }}
                                        placeholder="Expert / project title"
                                        className={errors.title ? 'err' : ''} />
                                    {errors.title && <span className="ex-merr">{errors.title}</span>}
                                </div>
                                <div className="ex-mfield">
                                    <label>LOCATION</label>
                                    <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Dubai, UAE" />
                                </div>
                                <div className="ex-mfield">
                                    <label>IMAGE</label>
                                    <input type="file" accept="image/*" ref={fileRef} onChange={handleImage} />
                                    {form.image && <img src={form.image} alt="preview" className="ex-mprev" />}
                                </div>
                                <div className="ex-mfield ex-mfield--row">
                                    <label>ACTIVE</label>
                                    <label className="ex-toggle">
                                        <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
                                        <span className="ex-toggle-slider" />
                                    </label>
                                </div>
                            </div>
                            <div className="ex-modal-footer">
                                <button className="settings-btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="settings-btn-save" onClick={handleSave}>{editId ? 'Update' : 'Create'}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* Detail View */}
            {viewExpert && (
                <div className="ex-detail-card">
                    <div className="ex-detail-header">
                        <h2>Expert Details:</h2>
                        <div className="ex-detail-actions">
                            <button className="ex-detail-btn ex-detail-btn--del" onClick={() => { handleDelete(viewExpert.id); setViewExpert(null); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="delete" role="presentation" class="fill-current"><path fill-rule="nonzero" d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z" fill="#9aa3b5"></path></svg>
                            </button>
                            <button className="ex-detail-btn ex-detail-btn--edit" onClick={() => openEdit(viewExpert)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-labelledby="edit" role="presentation" class="fill-current"><path d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z" fill="#fff"></path></svg>
                            </button>
                            <button className="ex-detail-btn ex-detail-btn--close" onClick={() => setViewExpert(null)}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="ex-detail-body">
                        {[
                            ['ID', viewExpert.id],
                            ['Title', viewExpert.title || '—'],
                            ['Location', viewExpert.location || '—'],
                        ].map(([label, val]) => (
                            <div key={label} className="ex-detail-row">
                                <span className="ex-detail-label">{label}</span>
                                <span className="ex-detail-value">{val}</span>
                            </div>
                        ))}
                        <div className="ex-detail-row">
                            <span className="ex-detail-label">Image</span>
                            <span className="ex-detail-value">
                                {viewExpert.image
                                    ? <div className="ex-detail-img-wrap">
                                        <img src={viewExpert.image} alt={viewExpert.title} className="ex-detail-img" />
                                        <a href={viewExpert.image} download={`expert-${viewExpert.id}.jpg`} className="ex-detail-dl">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                                            </svg> Download
                                        </a>
                                    </div>
                                    : <span className="ex-dash">—</span>}
                            </span>
                        </div>
                        <div className="ex-detail-row">
                            <span className="ex-detail-label">Status</span>
                            <span className="ex-detail-value">
                                <span className={`ex-dot ${viewExpert.active ? 'ex-dot--on' : 'ex-dot--off'}`} />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Experts;
