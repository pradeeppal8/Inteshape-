import React, { useState, useEffect, useRef } from 'react';
import './Tables.css';
import { useUsers } from '../../context/UsersContext';

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString();
}

const Tables = () => {
  const { users, deleteUser, updateUser } = useUsers();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editErrors, setEditErrors] = useState({});
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const showToast = (type, message) => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, type, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  // Messages state
  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [msgSearch, setMsgSearch] = useState('');
  const [msgLoading, setMsgLoading] = useState(true);

  useEffect(() => {
    const fetchMsgs = (showLoader = false) => {
      if (showLoader) setMsgLoading(true);

      return (
      fetch('http://localhost:5000/api/messages')
        .then(r => r.json())
        .then(d => { if (d.success) setMessages(d.data); })
        .catch(() => {})
        .finally(() => {
          if (showLoader) setMsgLoading(false);
        })
      );
    };

    fetchMsgs(true);

    // Poll every 10s as reliable fallback
    const pollInterval = setInterval(() => fetchMsgs(false), 10000);

    // SSE for instant real-time
    let es;
    try {
      es = new EventSource('http://localhost:5000/api/settings/stream');
      es.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'newMessage') {
            setMessages(prev =>
              prev.some(m => m.id === data.message.id)
                ? prev
                : [data.message, ...prev]
            );
          }
        } catch {}
      };
    } catch {}

    return () => {
      clearInterval(pollInterval);
      if (es) es.close();
    };
  }, []);

  const markRead = (id) => {
    fetch(`http://localhost:5000/api/messages/${id}/read`, { method: 'PATCH' })
      .then(() => setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m)));
  };

  const deleteMsg = (id) => {
    fetch(`http://localhost:5000/api/messages/${id}`, { method: 'DELETE' })
      .then(() => {
        setMessages(prev => prev.filter(m => m.id !== id));
        if (selectedMsg?.id === id) setSelectedMsg(null);
      });
  };

  const openMsg = (msg) => {
    setSelectedMsg(msg);
    if (!msg.read) markRead(msg.id);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    setEditErrors({});
  };

  const handleEditSave = () => {
    const errs = {};
    if (!editForm.name.trim()) errs.name = 'Name is required';
    if (!editForm.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email)) errs.email = 'Enter a valid email';
    setEditErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const hasChanges = ['name', 'email', 'role', 'status'].some(
      key => editForm[key] !== editUser[key]
    );
    if (!hasChanges) {
      showToast('warning', 'No changes made.');
      return;
    }
    updateUser(editUser.id, editForm);
    setEditUser(null);
    showToast('success', 'User updated successfully!');
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = users
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.role.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      return sortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const filteredMessages = messages.filter(m =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(msgSearch.toLowerCase()) ||
    m.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
    m.message.toLowerCase().includes(msgSearch.toLowerCase())
  );

  const SortIcon = ({ col }) => (
    <span className="sort-icon">{sortKey === col ? (sortDir === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}</span>
  );

  return (
    <div className="tables-page">
      {/* Toast container */}
      <div style={{ position:'fixed',top:18,right:18,zIndex:99999,display:'flex',flexDirection:'column',gap:10,pointerEvents:'none' }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            pointerEvents:'all',display:'flex',alignItems:'center',gap:12,
            background:'#fff',borderRadius:10,padding:'12px 18px',minWidth:260,
            boxShadow:'0 4px 24px rgba(0,0,0,0.12)',
            borderLeft:`4px solid ${t.type==='success'?'#22c55e':t.type==='warning'?'#f59e0b':'#ef4444'}`,
            animation:'tblToastIn .25s cubic-bezier(.34,1.56,.64,1) both'
          }}>
            <span style={{ fontSize:20 }}>
              {t.type==='success'?'✓':t.type==='warning'?'⚠':'✕'}
            </span>
            <span style={{ flex:1,fontSize:14,fontWeight:500,color:'#374151' }}>{t.message}</span>
            <button onClick={()=>setToasts(ts=>ts.filter(x=>x.id!==t.id))}
              style={{ background:'none',border:'none',cursor:'pointer',color:'#9ca3af',fontSize:16,lineHeight:1 }}>×</button>
          </div>
        ))}
      </div>
      <style>{`@keyframes tblToastIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}`}</style>
      <div className="page-header">
        <h2>Tables</h2>
        <span className="breadcrumb">Home &rsaquo; Tables</span>
      </div>

      {/* <div className="table-card">
        <div className="table-card-header">
          <span>User Management</span>
          <input
            className="table-search"
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                {['id','name','email','role','status','joined'].map(col => (
                  <th key={col} onClick={() => handleSort(col)} style={{ cursor: 'pointer' }}>
                    {col.charAt(0).toUpperCase() + col.slice(1)}<SortIcon col={col} />
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td><strong>{row.name}</strong></td>
                  <td>{row.email}</td>
                  <td><span className={`role-badge role-${row.role.toLowerCase()}`}>{row.role}</span></td>
                  <td><span className={`status-badge ${row.status === 'Active' ? 'active' : 'inactive'}`}>{row.status}</span></td>
                  <td>{row.joined}</td>
                  <td>
                    <button className="action-btn edit" onClick={() => openEdit(row)}>Edit</button>
                    <button className="action-btn delete" onClick={() => deleteUser(row.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">Showing {filtered.length} of {users.length} entries</div>
      </div> */}

      {/* ── Contact Messages Table ── */}
      <div className="table-card" style={{ marginTop: 28 }}>
        <div className="table-card-header">
          <span>
            Contact Messages
            {messages.filter(m => !m.read).length > 0 && (
              <span style={{ marginLeft: 10, background: 'var(--primary-color)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 20 }}>
                {messages.filter(m => !m.read).length} new
              </span>
            )}
          </span>
          <input
            className="table-search"
            placeholder="Search messages..."
            value={msgSearch}
            onChange={e => setMsgSearch(e.target.value)}
          />
        </div>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Received</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {msgLoading && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', color: '#9aa3b5', padding: '24px' }}>
                    <div className="dot-loader" role="status" aria-label="Loading messages">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </td>
                </tr>
              )}
              {!msgLoading && filteredMessages.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: '#9aa3b5', padding: '24px' }}>No messages yet</td></tr>
              )}
              {!msgLoading && filteredMessages.map(msg => (
                  <tr key={msg.id} style={{ cursor: 'pointer', background: !msg.read ? 'color-mix(in srgb, var(--primary-color) 5%, #fff)' : '' }}
                    onClick={() => openMsg(msg)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                          {(msg.firstName?.[0] || '?').toUpperCase()}
                        </div>
                        <strong style={{ fontWeight: msg.read ? 500 : 700 }}>{msg.firstName} {msg.lastName}</strong>
                      </div>
                    </td>
                    <td>{msg.email}</td>
                    <td>{msg.phone || '—'}</td>
                    <td style={{ maxWidth: 200 }}>
                      <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                        {msg.message}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{timeAgo(msg.createdAt)}</td>
                    <td>
                      <span className={`status-badge ${msg.read ? 'active' : 'inactive'}`}>
                        {msg.read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      <button className="action-btn delete" onClick={() => deleteMsg(msg.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">Showing {filteredMessages.length} of {messages.length} messages</div>
      </div>

      {/* Message Detail Modal */}
      {selectedMsg && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setSelectedMsg(null)}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 0, width: 520, maxWidth: '94vw', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', overflow: 'hidden' }}
            onClick={e => e.stopPropagation()}>
            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 24px', borderBottom: '1px solid #e8ecf2' }}>
              <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700 }}>
                {(selectedMsg.firstName?.[0] || '?').toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a2e' }}>{selectedMsg.firstName} {selectedMsg.lastName}</div>
                <div style={{ fontSize: 13, color: '#9aa3b5' }}>{selectedMsg.email}{selectedMsg.phone ? ` · ${selectedMsg.phone}` : ''}</div>
              </div>
              <button onClick={() => setSelectedMsg(null)} style={{ background: 'none', border: 'none', fontSize: 20, color: '#9aa3b5', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>
            {/* meta */}
            <div style={{ padding: '10px 24px', borderBottom: '1px solid #e8ecf2', fontSize: 13, color: '#9aa3b5' }}>
              <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, marginRight: 10 }}>Received</span>
              {new Date(selectedMsg.createdAt).toLocaleString()}
            </div>
            {/* body */}
            <div style={{ padding: '20px 24px 24px' }}>
              <div style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: 11, letterSpacing: 1, color: '#9aa3b5', marginBottom: 10 }}>Message</div>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-wrap' }}>{selectedMsg.message}</p>
            </div>
            {/* actions */}
            <div style={{ padding: '0 24px 20px', display: 'flex', gap: 10 }}>
              <a href={`mailto:${selectedMsg.email}`}
                style={{ flex: 1, padding: '10px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: 7, fontWeight: 600, cursor: 'pointer', fontSize: 14, textAlign: 'center', textDecoration: 'none' }}>
                Reply via Email
              </a>
              <button onClick={() => { deleteMsg(selectedMsg.id); setSelectedMsg(null); }}
                style={{ flex: 1, padding: '10px', background: '#fff0f0', color: '#e63946', border: '1px solid #fecdce', borderRadius: 7, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center' }}
          onClick={() => setEditUser(null)}>
          <div style={{ background:'#fff',borderRadius:'10px',padding:'32px',minWidth:'400px',boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}
            onClick={e => e.stopPropagation()}>
            <h3 style={{ margin:'0 0 20px',color:'#2c3e50',fontSize:'18px' }}>Edit User</h3>

            {[{label:'Full Name',key:'name',type:'text'},{label:'Email Address',key:'email',type:'email'}].map(f => (
              <div key={f.key} style={{ marginBottom:'14px' }}>
                <label style={{ display:'block',fontSize:'12px',fontWeight:600,color:'#7f8c8d',marginBottom:'4px',textTransform:'uppercase' }}>{f.label}</label>
                <input type={f.type} value={editForm[f.key]}
                  onChange={e => { setEditForm(p=>({...p,[f.key]:e.target.value})); setEditErrors(p=>({...p,[f.key]:''})); }}
                  style={{ width:'100%',padding:'9px 12px',border:`1px solid ${editErrors[f.key]?'#e74c3c':'#dde1e7'}`,borderRadius:'6px',fontSize:'14px',boxSizing:'border-box' }} />
                {editErrors[f.key] && <span style={{ color:'#e74c3c',fontSize:'12px' }}>{editErrors[f.key]}</span>}
              </div>
            ))}

            <div style={{ display:'flex',gap:'12px',marginBottom:'14px' }}>
              <div style={{ flex:1 }}>
                <label style={{ display:'block',fontSize:'12px',fontWeight:600,color:'#7f8c8d',marginBottom:'4px',textTransform:'uppercase' }}>Role</label>
                <select value={editForm.role} onChange={e => setEditForm(p=>({...p,role:e.target.value}))}
                  style={{ width:'100%',padding:'9px 12px',border:'1px solid #dde1e7',borderRadius:'6px',fontSize:'14px' }}>
                  <option>Admin</option><option>Editor</option><option>Viewer</option>
                </select>
              </div>
              <div style={{ flex:1 }}>
                <label style={{ display:'block',fontSize:'12px',fontWeight:600,color:'#7f8c8d',marginBottom:'4px',textTransform:'uppercase' }}>Status</label>
                <select value={editForm.status} onChange={e => setEditForm(p=>({...p,status:e.target.value}))}
                  style={{ width:'100%',padding:'9px 12px',border:'1px solid #dde1e7',borderRadius:'6px',fontSize:'14px' }}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
            </div>

            <div style={{ display:'flex',gap:'10px',marginTop:'20px' }}>
              <button onClick={handleEditSave}
                style={{ flex:1,padding:'10px',background:'var(--primary-color)',color:'#fff',border:'none',borderRadius:'6px',fontWeight:600,cursor:'pointer',fontSize:'14px' }}>
                Save Changes
              </button>
              <button onClick={() => setEditUser(null)}
                style={{ flex:1,padding:'10px',background:'#f0f2f5',color:'#2c3e50',border:'none',borderRadius:'6px',fontWeight:600,cursor:'pointer',fontSize:'14px' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
