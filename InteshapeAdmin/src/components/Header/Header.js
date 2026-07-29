import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdMenu, MdSearch, MdNotifications, MdChat, MdAdd, MdExpandMore,
  MdLogout, MdPerson, MdSettings, MdCircle, MdDoneAll, MdSend
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { useUsers } from '../../context/UsersContext';
import './Header.css';

const autoReplies = {
  1: ['Awesome! Looking forward to it 😊', 'Let me know once it\'s deployed!', 'That sounds great!', 'Cool, thanks for the update!'],
  2: ['Sure, take your time.', 'No rush, let me know your thoughts.', 'Thanks, appreciate it!', 'Sounds good!'],
  3: ['How about 3 PM?', 'Let\'s do it at 2 PM today.', 'Works for me!', 'I\'ll send a calendar invite.'],
  4: ['Let me know if anything else comes up.', 'Glad I could help!', 'Sure thing!', 'Always happy to help.'],
  5: ['You\'re welcome! 😊', 'Anytime!', 'Happy to help!', 'Let me know if you need anything else.'],
};

const initialChats = [
  {
    id: 1, name: 'Alice Johnson', avatar: 'AJ', color: '#3498db', unread: true,
    msg: 'Hey! Is the new dashboard ready?',
    messages: [
      { from: 'them', text: 'Hey! Is the new dashboard ready?', time: '2 min ago' },
      { from: 'me', text: 'Almost done, adding final touches!', time: '1 min ago' },
      { from: 'them', text: 'Great, can\'t wait to see it!', time: 'just now' },
    ]
  },
  {
    id: 2, name: 'Bob Smith', avatar: 'BS', color: '#2ecc71', unread: true,
    msg: 'Please review the latest report.',
    messages: [
      { from: 'them', text: 'Please review the latest report.', time: '20 min ago' },
      { from: 'me', text: 'Sure, I\'ll check it shortly.', time: '18 min ago' },
    ]
  },
  {
    id: 3, name: 'Carol White', avatar: 'CW', color: '#9b59b6', unread: true,
    msg: 'Can we schedule a meeting today?',
    messages: [
      { from: 'them', text: 'Can we schedule a meeting today?', time: '1 hr ago' },
    ]
  },
  {
    id: 4, name: 'David Lee', avatar: 'DL', color: '#e67e22', unread: false,
    msg: 'The bug has been fixed.',
    messages: [
      { from: 'me', text: 'Can you fix the login bug?', time: '4 hrs ago' },
      { from: 'them', text: 'The bug has been fixed.', time: '3 hrs ago' },
      { from: 'me', text: 'Thanks! Great work.', time: '3 hrs ago' },
    ]
  },
  {
    id: 5, name: 'Eva Brown', avatar: 'EB', color: '#e74c3c', unread: false,
    msg: 'Thanks for the update!',
    messages: [
      { from: 'me', text: 'Deployment is done, all systems are live.', time: '1 day ago' },
      { from: 'them', text: 'Thanks for the update!', time: '1 day ago' },
    ]
  },
];

const autoNotifPool = [
  { title: 'New comment posted', desc: 'Someone commented on your latest blog.', color: '#3498db' },
  { title: 'New user registered', desc: 'A new user just signed up.', color: '#2ecc71' },
  { title: 'Order #' + Math.floor(1000+Math.random()*9000) + ' placed', desc: 'A new order has been received.', color: '#9b59b6' },
  { title: 'Server CPU spike', desc: 'CPU usage exceeded 85% on server-01.', color: '#e74c3c' },
  { title: 'Backup complete', desc: 'Daily database backup finished successfully.', color: '#27ae60' },
  { title: 'Report ready', desc: 'Your weekly analytics report is ready.', color: '#8e44ad' },
  { title: 'File uploaded', desc: 'New file uploaded to media library.', color: '#e67e22' },
  { title: 'Password reset request', desc: 'A user requested a password reset.', color: '#c0392b' },
  { title: 'New message', desc: 'You have an unread message in inbox.', color: '#1abc9c' },
  { title: 'Subscription renewed', desc: 'Pro plan subscription renewed successfully.', color: '#2980b9' },
];

const initialNotifications = [
  { id: 1, title: 'New user registered', desc: 'Alice Johnson just created an account.', time: '2 min ago', read: false, color: '#3498db' },
  { id: 2, title: 'New order received', desc: 'Order #1042 has been placed successfully.', time: '15 min ago', read: false, color: '#2ecc71' },
  { id: 3, title: 'Server alert', desc: 'High traffic detected on the main server.', time: '1 hr ago', read: false, color: '#e74c3c' },
  { id: 4, title: 'Report generated', desc: 'Monthly analytics report is ready.', time: '3 hrs ago', read: true, color: '#9b59b6' },
  { id: 5, title: 'Password changed', desc: 'Admin password was updated successfully.', time: '1 day ago', read: true, color: '#e67e22' },
];

const searchPages = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Charts', path: '/charts' },
  { label: 'Widgets', path: '/widgets' },
  { label: 'Tables', path: '/tables' },
  { label: 'Full Width', path: '/full-width' },
  { label: 'Basic Forms', path: '/forms/basic' },
  { label: 'Advanced Forms', path: '/forms/advanced' },
  { label: 'Form Validation', path: '/forms/validation' },
  { label: 'Buttons', path: '/buttons' },
  { label: 'My Profile', path: '/profile' },
  { label: 'Login', path: '/auth/login' },
  { label: 'Register', path: '/auth/register' },
  { label: '404 Error', path: '/errors/404' },
  { label: '500 Error', path: '/errors/500' },
];

const Header = ({ toggleSidebar }) => {
  const [createOpen, setCreateOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [newUserModal, setNewUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'Editor', status: 'Active' });
  const [newUserErrors, setNewUserErrors] = useState({});
  const { addUser } = useUsers();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const notifIdRef = useRef(100);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [chatOpen, setChatOpen] = useState(false);
  const [chats, setChats] = useState(initialChats);
  const [replyMsg, setReplyMsg] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef(null);
  const createRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const notifRef = useRef(null);
  const chatRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const unreadChatCount = chats.filter(c => c.unread).length;

  const openChat = (chat) => {
    setActiveChat(chat);
    setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: false } : c));
    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 50);
  };

  const sendReply = useCallback(() => {
    if (!replyMsg.trim() || !activeChat) return;
    const userMsg = { from: 'me', text: replyMsg.trim(), time: 'just now' };
    const chatId = activeChat.id;

    setChats(prev => {
      const updated = prev.map(c =>
        c.id === chatId ? { ...c, msg: userMsg.text, messages: [...c.messages, userMsg] } : c
      );
      setActiveChat(updated.find(c => c.id === chatId));
      return updated;
    });
    setReplyMsg('');

    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 30);

    // Show typing loader, then auto-reply
    const replies = autoReplies[chatId] || ['Got it!', 'Thanks!', 'Sure!'];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const delay = 1200 + Math.random() * 1000;

    setIsTyping(true);
    setTimeout(() => {
      if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, 50);

    setTimeout(() => {
      setIsTyping(false);
      const autoMsg = { from: 'them', text: reply, time: 'just now' };
      setChats(prev => {
        const updated = prev.map(c =>
          c.id === chatId ? { ...c, msg: reply, messages: [...c.messages, autoMsg] } : c
        );
        setActiveChat(current => current && current.id === chatId ? updated.find(c => c.id === chatId) : current);
        return updated;
      });
      setTimeout(() => {
        if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }, 30);
    }, delay);
  }, [replyMsg, activeChat]);

  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const markRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));

  // Auto notification every 8–12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const pool = autoNotifPool[Math.floor(Math.random() * autoNotifPool.length)];
      notifIdRef.current += 1;
      const newNotif = {
        id: notifIdRef.current,
        title: pool.title,
        desc: pool.desc,
        time: 'just now',
        read: false,
        color: pool.color,
      };
      setNotifications(prev => [newNotif, ...prev.slice(0, 9)]);
      setToast(newNotif);
      setTimeout(() => setToast(null), 4000);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  };

  const handleSearchNavigate = (path) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(path);
  };

  const filteredPages = searchQuery.trim()
    ? searchPages.filter(p => p.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
      if (createRef.current && !createRef.current.contains(e.target)) setCreateOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (chatRef.current && !chatRef.current.contains(e.target)) { setChatOpen(false); setActiveChat(null); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
    <header className="header">
      <div className="header-left">
        <button className="hamburger" onClick={toggleSidebar}>
          <MdMenu />
        </button>
        <div className="create-new" ref={createRef} onClick={() => setCreateOpen(prev => !prev)}>
          <MdAdd />
          <span>Create New</span>
          <MdExpandMore />
          {createOpen && (
            <div className="dropdown-menu">
              <button onClick={(e) => { e.stopPropagation(); setCreateOpen(false); navigate('/forms/basic'); }}>
                New Post
              </button>
              <button onClick={(e) => { e.stopPropagation(); setCreateOpen(false); navigate('/forms/basic'); }}>
                New Page
              </button>
              <button onClick={(e) => { e.stopPropagation(); setCreateOpen(false); navigate('/tables'); setNewUserModal(true); }}>
                New User
              </button>
            </div>
          )}
        </div>
        <div className="search-wrapper" ref={searchRef}>
          {searchOpen ? (
            <div className="search-input-box">
              <MdSearch className="search-input-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Escape' && (setSearchOpen(false), setSearchQuery(''))}
              />
              {filteredPages.length > 0 && (
                <div className="search-results">
                  {filteredPages.map(p => (
                    <button key={p.path} className="search-result-item" onClick={() => handleSearchNavigate(p.path)}>
                      <MdSearch /> {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button className="search-btn" onClick={openSearch}>
              <MdSearch />
            </button>
          )}
        </div>
      </div>
      <div className="header-right">
        <div className="notif-wrapper" ref={notifRef}>
          <button className="icon-btn" onClick={() => setNotifOpen(prev => !prev)}>
            <MdNotifications />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>
          {notifOpen && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <button className="notif-mark-all" onClick={markAllRead}>
                    <MdDoneAll /> Mark all read
                  </button>
                )}
              </div>
              <div className="notif-list">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`notif-item ${n.read ? '' : 'unread'}`}
                    onClick={() => markRead(n.id)}
                  >
                    <div className="notif-dot" style={{ background: n.color }} />
                    <div className="notif-content">
                      <div className="notif-title">{n.title}</div>
                      <div className="notif-desc">{n.desc}</div>
                      <div className="notif-time">{n.time}</div>
                    </div>
                    {!n.read && <MdCircle className="notif-unread-dot" />}
                  </div>
                ))}
              </div>
              <div className="notif-footer">
                <button onClick={() => setNotifOpen(false)}>View all notifications</button>
              </div>
            </div>
          )}
        </div>
        <div className="chat-wrapper" ref={chatRef}>
          <button className="icon-btn" onClick={() => { setChatOpen(prev => !prev); setActiveChat(null); }}>
            <MdChat />
            {unreadChatCount > 0 && <span className="badge">{unreadChatCount}</span>}
          </button>
          {chatOpen && (
            <div className="chat-dropdown">
              {!activeChat ? (
                <>
                  <div className="chat-drop-header">Messages</div>
                  <div className="chat-list">
                    {chats.map(c => (
                      <div key={c.id} className={`chat-list-item ${c.unread ? 'unread' : ''}`} onClick={() => openChat(c)}>
                        <div className="chat-list-avatar" style={{ background: c.color }}>{c.avatar}</div>
                        <div className="chat-list-content">
                          <div className="chat-list-name">{c.name}</div>
                          <div className="chat-list-msg">{c.msg}</div>
                        </div>
                        <div className="chat-list-meta">
                          <div className="chat-list-time">{c.time}</div>
                          {c.unread && <div className="chat-list-dot" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="chat-drop-footer">
                    <button onClick={() => setChatOpen(false)}>View all messages</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="chat-drop-header chat-conv-header">
                    <button className="chat-back-btn" onClick={() => setActiveChat(null)}>←</button>
                    <div className="chat-conv-avatar" style={{ background: activeChat.color }}>{activeChat.avatar}</div>
                    <span>{activeChat.name}</span>
                  </div>
                  <div className="chat-conv-body" ref={chatBodyRef}>
                    {activeChat.messages.map((m, i) => (
                      <div key={i} className={`chat-msg-row ${m.from === 'me' ? 'sent' : 'recv'}`}>
                        {m.from === 'them' && (
                          <div className="chat-msg-avatar" style={{ background: activeChat.color }}>{activeChat.avatar}</div>
                        )}
                        <div className="chat-msg-block">
                          <div className={`chat-bubble ${m.from === 'me' ? 'sent' : 'received'}`}>{m.text}</div>
                          <div className={`chat-bubble-time ${m.from === 'me' ? 'align-right' : ''}`}>{m.time}</div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="chat-msg-row recv">
                        <div className="chat-msg-avatar" style={{ background: activeChat.color }}>{activeChat.avatar}</div>
                        <div className="chat-msg-block">
                          <div className="chat-bubble received typing-indicator">
                            <span></span><span></span><span></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="chat-conv-input">
                    <input
                      placeholder="Type a message..."
                      value={replyMsg}
                      onChange={e => setReplyMsg(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendReply()}
                    />
                    <button onClick={sendReply}><MdSend /></button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="user-menu-wrapper" ref={userRef}>
          <div className="user-avatar" onClick={() => setUserOpen(!userOpen)}>
            <div className="user-avatar-initials">
              {(user?.name || 'AD').slice(0, 2).toUpperCase()}
            </div>
          </div>
          {userOpen && (
            <div className="user-dropdown">
              <div className="user-dropdown-header">
                <div className="user-dropdown-avatar">
                  {(user?.name || 'AD').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="user-dropdown-name">{user?.name || 'Admin'}</div>
                  <div className="user-dropdown-email">{user?.email || 'admin@example.com'}</div>
                </div>
              </div>
              <div className="user-dropdown-divider" />
              <button className="user-dropdown-item" onClick={() => { setUserOpen(false); navigate('/profile'); }}>
                <MdPerson /> My Profile
              </button>
              <button className="user-dropdown-item" onClick={() => { setUserOpen(false); navigate('/settings'); }}>
                <MdSettings /> Settings
              </button>
              <div className="user-dropdown-divider" />
              <button className="user-dropdown-item user-dropdown-logout" onClick={handleLogout}>
                <MdLogout /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>

    {/* Auto notification toast */}
    {toast && (
      <div className="notif-toast" style={{ borderLeft: `4px solid ${toast.color}` }}>
        <div className="notif-toast-dot" style={{ background: toast.color }}></div>
        <div className="notif-toast-body">
          <div className="notif-toast-title">{toast.title}</div>
          <div className="notif-toast-desc">{toast.desc}</div>
        </div>
        <button className="notif-toast-close" onClick={() => setToast(null)}>×</button>
      </div>
    )}

    {/* New User Modal */}
    {newUserModal && (
      <div style={{ position:'fixed',inset:0,background:'rgba(0,0,0,0.45)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center' }}
        onClick={() => { setNewUserModal(false); setNewUserErrors({}); }}>
        <div style={{ background:'#fff',borderRadius:'10px',padding:'32px',minWidth:'400px',boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}
          onClick={e => e.stopPropagation()}>
          <h3 style={{ margin:'0 0 20px',color:'#2c3e50',fontSize:'18px' }}>Create New User</h3>

          {[
            { label:'Full Name', key:'name', type:'text', placeholder:'Enter full name' },
            { label:'Email Address', key:'email', type:'email', placeholder:'Enter email' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom:'14px' }}>
              <label style={{ display:'block',fontSize:'12px',fontWeight:600,color:'#7f8c8d',marginBottom:'4px',textTransform:'uppercase' }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={newUserForm[f.key]}
                onChange={e => { setNewUserForm(p=>({...p,[f.key]:e.target.value})); setNewUserErrors(p=>({...p,[f.key]:''})); }}
                style={{ width:'100%',padding:'9px 12px',border:`1px solid ${newUserErrors[f.key]?'#e74c3c':'#dde1e7'}`,borderRadius:'6px',fontSize:'14px',boxSizing:'border-box' }} />
              {newUserErrors[f.key] && <span style={{ color:'#e74c3c',fontSize:'12px' }}>{newUserErrors[f.key]}</span>}
            </div>
          ))}

          <div style={{ display:'flex',gap:'12px',marginBottom:'14px' }}>
            <div style={{ flex:1 }}>
              <label style={{ display:'block',fontSize:'12px',fontWeight:600,color:'#7f8c8d',marginBottom:'4px',textTransform:'uppercase' }}>Role</label>
              <select value={newUserForm.role} onChange={e => setNewUserForm(p=>({...p,role:e.target.value}))}
                style={{ width:'100%',padding:'9px 12px',border:'1px solid #dde1e7',borderRadius:'6px',fontSize:'14px' }}>
                <option>Admin</option><option>Editor</option><option>Viewer</option>
              </select>
            </div>
            <div style={{ flex:1 }}>
              <label style={{ display:'block',fontSize:'12px',fontWeight:600,color:'#7f8c8d',marginBottom:'4px',textTransform:'uppercase' }}>Status</label>
              <select value={newUserForm.status} onChange={e => setNewUserForm(p=>({...p,status:e.target.value}))}
                style={{ width:'100%',padding:'9px 12px',border:'1px solid #dde1e7',borderRadius:'6px',fontSize:'14px' }}>
                <option>Active</option><option>Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ display:'flex',gap:'10px',marginTop:'20px' }}>
            <button onClick={() => {
              const errs = {};
              if (!newUserForm.name.trim()) errs.name = 'Name is required';
              if (!newUserForm.email.trim()) errs.email = 'Email is required';
              else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUserForm.email)) errs.email = 'Enter a valid email';
              setNewUserErrors(errs);
              if (Object.keys(errs).length > 0) return;
              addUser(newUserForm);
              setNewUserModal(false);
              setNewUserForm({ name:'', email:'', role:'Editor', status:'Active' });
              setNewUserErrors({});
              navigate('/tables');
            }} style={{ flex:1,padding:'10px',background:'var(--primary-color)',color:'#fff',border:'none',borderRadius:'6px',fontWeight:600,cursor:'pointer',fontSize:'14px' }}>
              Create User
            </button>
            <button onClick={() => { setNewUserModal(false); setNewUserErrors({}); }}
              style={{ flex:1,padding:'10px',background:'#f0f2f5',color:'#2c3e50',border:'none',borderRadius:'6px',fontWeight:600,cursor:'pointer',fontSize:'14px' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Header;
