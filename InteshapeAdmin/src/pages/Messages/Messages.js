import React, { useState, useEffect } from 'react';
import './Messages.css';

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString();
}

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMessages = () => {
    fetch('http://localhost:5000/api/messages')
      .then(r => r.json())
      .then(d => { if (d.success) setMessages(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const fetchMsgs = () =>
      fetch('http://localhost:5000/api/messages')
        .then(r => r.json())
        .then(d => { if (d.success) setMessages(d.data); })
        .catch(() => {})
        .finally(() => setLoading(false));

    fetchMsgs();

    // Poll every 10s as reliable fallback
    const pollInterval = setInterval(fetchMsgs, 10000);

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
        if (selected?.id === id) setSelected(null);
      });
  };

  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg.id);
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="messages-page">
      <div className="messages-header">
        <div>
          <h1>Messages</h1>
          <p className="messages-sub">Contact form submissions from your website</p>
        </div>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount} unread</span>
        )}
      </div>

      <div className="messages-layout">
        {/* Message list */}
        <div className="msg-list">
          {loading && <div className="msg-empty">Loading...</div>}
          {!loading && messages.length === 0 && (
            <div className="msg-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p>No messages yet</p>
            </div>
          )}
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`msg-item ${!msg.read ? 'unread' : ''} ${selected?.id === msg.id ? 'active' : ''}`}
              onClick={() => openMessage(msg)}
            >
              <div className="msg-avatar">
                {(msg.firstName?.[0] || '?').toUpperCase()}
              </div>
              <div className="msg-preview">
                <div className="msg-preview-top">
                  <span className="msg-name">{msg.firstName} {msg.lastName}</span>
                  <span className="msg-time">{timeAgo(msg.createdAt)}</span>
                </div>
                <span className="msg-email">{msg.email}</span>
                <p className="msg-snippet">{msg.message?.slice(0, 60)}{msg.message?.length > 60 ? '…' : ''}</p>
              </div>
              {!msg.read && <span className="unread-dot" />}
            </div>
          ))}
        </div>

        {/* Message detail */}
        <div className="msg-detail">
          {!selected ? (
            <div className="msg-detail-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <p>Select a message to read</p>
            </div>
          ) : (
            <>
              <div className="msg-detail-header">
                <div className="msg-detail-avatar">
                  {(selected.firstName?.[0] || '?').toUpperCase()}
                </div>
                <div>
                  <h2>{selected.firstName} {selected.lastName}</h2>
                  <span>{selected.email} {selected.phone ? `· ${selected.phone}` : ''}</span>
                </div>
                <button className="msg-delete-btn" onClick={() => deleteMsg(selected.id)} title="Delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>

              <div className="msg-detail-meta">
                <span className="meta-label">Received</span>
                <span>{new Date(selected.createdAt).toLocaleString()}</span>
              </div>

              <div className="msg-detail-body">
                <div className="meta-label" style={{ marginBottom: 8 }}>MESSAGE</div>
                <p>{selected.message}</p>
              </div>

              <div className="msg-detail-actions">
                <a href={`mailto:${selected.email}`} className="msg-reply-btn">
                  Reply via Email
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
