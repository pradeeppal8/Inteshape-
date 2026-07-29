import React, { useState, useEffect, useRef } from "react";
import "./Banners.css";
import BannerView from "./BannerView";

const EMPTY = {
  number: "",
  eyebrow: "",
  title: "",
  desc: "",
  cta: "",
  showButton: false,
  buttonLink: "",
  image: null,
  active: true,
};

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const [toasts, setToasts] = useState([]);
  const [viewBanner, setViewBanner] = useState(null);
  const toastId = useRef(0);
  const fileRef = useRef();

  const showToast = (type, msg) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, type, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const fetchBanners = () =>
    fetch("http://localhost:5000/api/banners")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBanners(d.data);
      })
      .catch(() => {});

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, image: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    return errs;
  };

  const openCreate = () => {
    setForm(EMPTY);
    setEditId(null);
    setErrors({});
    setShowModal(true);
    if (fileRef.current) fileRef.current.value = "";
  };

  const openEdit = (b) => {
    setForm({
      number: b.number,
      eyebrow: b.eyebrow,
      title: b.title,
      desc: b.desc,
      cta: b.cta,
      showButton: b.showButton || false,
      buttonLink: b.buttonLink || "",
      image: b.image,
      active: b.active,
    });
    setEditId(b.id);
    setErrors({});
    setShowModal(true);
    setViewBanner(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/banners/${editId}`
      : "http://localhost:5000/api/banners";
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          showToast("success", editId ? "Banner updated!" : "Banner created!");
          fetchBanners();
          setShowModal(false);
          setForm(EMPTY);
          setEditId(null);
        }
      })
      .catch(() => showToast("error", "Failed to save banner"));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/banners/${id}`, { method: "DELETE" }).then(
      () => {
        fetchBanners();
        showToast("success", "Banner deleted");
      },
    );
  };

  const toggleActive = (b) => {
    fetch(`http://localhost:5000/api/banners/${b.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...b, active: !b.active }),
    }).then(() => fetchBanners());
  };

  const filtered = banners
    .filter(
      (b) =>
        b.title?.toLowerCase().includes(search.toLowerCase()) ||
        b.eyebrow?.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => (sortAsc ? a.id - b.id : b.id - a.id));

  const allSelected =
    filtered.length > 0 && filtered.every((b) => selected.includes(b.id));
  const toggleSelectAll = () =>
    setSelected(allSelected ? [] : filtered.map((b) => b.id));
  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <>
      <div className={`bn-page${viewBanner ? ' bn-page--view-open' : ''}`}>
        {/* Toasts */}
        <div className="bn-toasts">
          {toasts.map((t) => (
            <div key={t.id} className={`bn-toast bn-toast--${t.type}`}>
              <span>{t.type === "success" ? "✓" : "✕"}</span>
              <span>{t.msg}</span>
              <button
                onClick={() =>
                  setToasts((ts) => ts.filter((x) => x.id !== t.id))
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Page header */}
        <div className="bn-page-header">
          <h1>Banners</h1>
          <div className="bn-page-header-right">
            <div className="bn-search-box">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="bn-create-btn" onClick={openCreate}>
              Create Banner
            </button>
          </div>
        </div>

        {/* Table card */}
        <div className="bn-table-card">
          <table className="bn-table">
            <thead>
              <tr>
                <th className="bn-th-check">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="bn-th-drag"></th>
                <th className="bn-th-drag"></th>
                <th
                  className="bn-th-id"
                  onClick={() => setSortAsc((p) => !p)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  ID <span className="bn-sort">{sortAsc ? "↑↓" : "↓↑"}</span>
                </th>
                <th className="bn-th-title">TITLE</th>
                <th className="bn-th-img">BANNER IMAGE</th>
                <th className="bn-th-status">STATUS</th>
                <th className="bn-th-actions"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="bn-empty">
                    No banners found
                  </td>
                </tr>
              )}
              {filtered.map((b, i) => (
                <tr
                  key={b.id}
                  className={`bn-row${selected.includes(b.id) ? " bn-row--selected" : ""}`}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(b.id)}
                      onChange={() => toggleSelect(b.id)}
                    />
                  </td>
                  <td className="bn-drag-cell">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="14"
                      height="14"
                    >
                      <line x1="5" y1="8" x2="19" y2="8" />
                      <line x1="5" y1="16" x2="19" y2="16" />
                    </svg>
                  </td>
                  <td className="bn-drag-cell">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="14"
                      height="14"
                    >
                      <line x1="8" y1="5" x2="8" y2="19" />
                      <line x1="16" y1="5" x2="16" y2="19" />
                    </svg>
                  </td>
                  <td className="bn-td-id">
                    {sortAsc ? i + 1 : filtered.length - i}
                  </td>
                  <td className="bn-td-title">
                    {b.title || <span className="bn-dash">—</span>}
                  </td>
                  <td className="bn-td-img">
                    {b.image ? (
                      <img src={b.image} alt={b.title} className="bn-thumb" />
                    ) : (
                      <div className="bn-thumb-empty" />
                    )}
                  </td>
                  <td className="bn-td-status">
                    <span
                      className={`bn-status-dot ${b.active ? "bn-status-dot--on" : "bn-status-dot--off"}`}
                      onClick={() => toggleActive(b)}
                      title={
                        b.active
                          ? "Active — click to deactivate"
                          : "Inactive — click to activate"
                      }
                    />
                  </td>
                  <td className="bn-td-actions">
                    <button
                      className="bn-act-btn"
                      title="View"
                      onClick={() =>
                        setViewBanner(viewBanner?.id === b.id ? null : b)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="18"
                        viewBox="0 0 22 16"
                        aria-labelledby="view"
                        role="presentation"
                        class="fill-current"
                      >
                        <path
                          d="M16.56 13.66a8 8 0 0 1-11.32 0L.3 8.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 0 0 8.48 0L19.38 8l-4.24-4.24a6 6 0 0 0-8.48 0L2.4 8l4.25 4.24h.01zM10.9 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                          fill="#9aa3b5"
                        ></path>
                      </svg>
                    </button>
                    <button
                      className="bn-act-btn"
                      title="Edit"
                      onClick={() => openEdit(b)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        aria-labelledby="edit"
                        role="presentation"
                        class="fill-current"
                      >
                        <path
                          d="M4.3 10.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM6 14h2.59l9-9L15 2.41l-9 9V14zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h6a1 1 0 1 1 0 2H2v14h14v-6z"
                          fill="#9aa3b5"
                        ></path>
                      </svg>
                    </button>
                    <button
                      className="bn-act-btn bn-act-btn--del"
                      title="Delete"
                      onClick={() => handleDelete(b.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        aria-labelledby="delete"
                        role="presentation"
                        class="fill-current"
                      >
                        <path
                          fill-rule="nonzero"
                          d="M6 4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6H1a1 1 0 1 1 0-2h5zM4 6v12h12V6H4zm8-2V2H8v2h4zM8 8a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"
                          fill="#9aa3b5"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create / Edit Modal */}
        {showModal && (
          <div
            className="bn-modal-backdrop"
            onClick={() => setShowModal(false)}
          >
            <div className="bn-modal" onClick={(e) => e.stopPropagation()}>
              <div className="bn-modal-header">
                <h2>{editId ? "Edit Banner" : "Create Banner"}</h2>
                <button
                  className="bn-modal-close"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="bn-modal-body">
                <div className="bn-mfield">
                  <label>TITLE *</label>
                  <input
                    value={form.title}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, title: e.target.value }));
                      setErrors((v) => ({ ...v, title: "" }));
                    }}
                    placeholder="Banner headline"
                    className={errors.title ? "err" : ""}
                  />
                  {errors.title && (
                    <span className="bn-merr">{errors.title}</span>
                  )}
                </div>
                <div className="bn-mrow">
                  <div className="bn-mfield">
                    <label>EYEBROW TEXT</label>
                    <input
                      value={form.eyebrow}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, eyebrow: e.target.value }))
                      }
                      placeholder="e.g. VARIETY"
                    />
                  </div>
                  <div className="bn-mfield">
                    <label>NUMBER</label>
                    <input
                      value={form.number}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, number: e.target.value }))
                      }
                      placeholder="e.g. 01"
                    />
                  </div>
                </div>
                <div className="bn-mfield">
                  <label>DESCRIPTION</label>
                  <textarea
                    rows={3}
                    value={form.desc}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, desc: e.target.value }))
                    }
                    placeholder="Short description..."
                  />
                </div>
                <div className="bn-mfield">
                  <label>BUTTON TEXT</label>
                  <input
                    value={form.cta}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, cta: e.target.value }))
                    }
                    placeholder="e.g. READ MORE"
                  />
                </div>
                <div className="bn-mfield">
                  <label>BUTTON LINK</label>
                  <input
                    value={form.buttonLink}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, buttonLink: e.target.value }))
                    }
                    placeholder="e.g. /contact"
                  />
                </div>
                <div className="bn-mfield bn-mfield--row">
                  <label>SHOW BUTTON IN BANNER</label>
                  <label className="bn-toggle">
                    <input
                      type="checkbox"
                      checked={form.showButton}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, showButton: e.target.checked }))
                      }
                    />
                    <span className="bn-toggle-slider" />
                  </label>
                </div>
                <div className="bn-mfield">
                  <label>BANNER IMAGE</label>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    onChange={handleImage}
                  />
                  {form.image && (
                    <img src={form.image} alt="preview" className="bn-mprev" />
                  )}
                </div>
                <div className="bn-mfield bn-mfield--row">
                  <label>ACTIVE</label>
                  <label className="bn-toggle">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, active: e.target.checked }))
                      }
                    />
                    <span className="bn-toggle-slider" />
                  </label>
                </div>
              </div>
              <div className="bn-modal-footer">
                <button
                  className="settings-btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="settings-btn-save" onClick={handleSave}>
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Banner Detail View */}
      <BannerView
        banner={viewBanner}
        onEdit={openEdit}
        onDelete={(id) => {
          handleDelete(id);
          setViewBanner(null);
        }}
        onClose={() => setViewBanner(null)}
      />
    </>
  );
};

export default Banners;
