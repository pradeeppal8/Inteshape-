import React, { useState, useRef, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';
import {
  MdDashboard, MdBarChart, MdWidgets, MdTableChart, MdFullscreen,
  MdDynamicForm, MdSmartButton, MdBrush, MdCalendarToday, MdErrorOutline,
  MdPerson, MdShoppingCart, MdAddCircle, MdPublic
} from 'react-icons/md';
import './Dashboard.css';

const chartData = [
  { x: 0, sin: 0, cos: 1 },
  { x: 1, sin: 0.84, cos: 0.54 },
  { x: 2, sin: 0.91, cos: -0.42 },
  { x: 3, sin: 0.14, cos: -0.99 },
  { x: 4, sin: -0.76, cos: -0.65 },
  { x: 5, sin: -0.96, cos: 0.28 },
  { x: 6, sin: -0.28, cos: 0.96 },
  { x: 7, sin: 0.66, cos: 0.75 },
  { x: 8, sin: 0.99, cos: 0 },
  { x: 9, sin: 0.41, cos: -0.91 },
  { x: 10, sin: -0.54, cos: -0.84 },
  { x: 11, sin: -1, cos: -0.28 },
];

const tiles = [
  { label: 'Dashboard', icon: <MdDashboard />, color: '#3498db' },
  { label: 'Charts', icon: <MdBarChart />, color: '#2ecc71', wide: true },
  { label: 'Widgets', icon: <MdWidgets />, color: '#f39c12' },
  { label: 'Tables', icon: <MdTableChart />, color: '#e74c3c' },
  { label: 'Full Width', icon: <MdFullscreen />, color: '#2c3e50' },
  { label: 'Forms', icon: <MdDynamicForm />, color: '#e67e22', wide: true },
  { label: 'Buttons', icon: <MdSmartButton />, color: '#2c3e50' },
  { label: 'Elements', icon: <MdBrush />, color: '#3498db' },
  { label: 'Calendar', icon: <MdCalendarToday />, color: '#27ae60' },
  { label: 'Errors', icon: <MdErrorOutline />, color: '#f1c40f' },
];

const stats = [
  { label: 'Total Users', value: '2540', icon: <MdPerson />, color: '#34495e' },
  { label: 'New Users', value: '120', icon: <MdAddCircle />, color: '#2c3e50' },
  { label: 'Total Shop', value: '656', icon: <MdShoppingCart />, color: '#34495e' },
  { label: 'Total Orders', value: '9540', icon: <MdPublic />, color: '#2c3e50' },
  { label: 'Pending Orders', value: '100', icon: <MdTableChart />, color: '#34495e' },
  { label: 'Online Orders', value: '8540', icon: <MdPublic />, color: '#2c3e50' },
];

const latestPosts = [
  { title: 'Getting Started with React', date: 'July 20, 2026', author: 'Admin', views: 210 },
  { title: 'Admin Dashboard Design Tips', date: 'July 18, 2026', author: 'Editor', views: 180 },
  { title: 'Best Practices for UI/UX', date: 'July 15, 2026', author: 'Admin', views: 340 },
  { title: 'Node.js and Express Guide', date: 'July 12, 2026', author: 'Developer', views: 150 },
];

const initialChatMessages = [
  { user: 'Alice', msg: 'Hey! Is the new release ready?', time: '10:20 AM', color: '#e74c3c' },
  { user: 'Bob', msg: 'Working on the last feature now.', time: '10:22 AM', color: '#3498db' },
  { user: 'Carol', msg: 'Please ping me when done.', time: '10:25 AM', color: '#27ae60' },
  { user: 'Admin', msg: 'Will do! Almost there.', time: '10:30 AM', color: '#e67e22' },
];

const autoRepliers = [
  { user: 'Alice', color: '#e74c3c', replies: ['Sure thing!', 'Got it 👍', 'Thanks for the update!', 'Will check now.'] },
  { user: 'Bob', color: '#3498db', replies: ['On it!', 'Almost done.', 'Let me know if you need anything.', 'Sounds good!'] },
  { user: 'Carol', color: '#27ae60', replies: ['Great!', 'Ping me when ready.', 'Noted 👌', 'Thanks!'] },
];

const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const Dashboard = () => {
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = { user: 'Admin', msg: chatInput.trim(), time: getTime(), color: '#e67e22' };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    const replier = autoRepliers[Math.floor(Math.random() * autoRepliers.length)];
    const reply = replier.replies[Math.floor(Math.random() * replier.replies.length)];
    const delay = 1200 + Math.random() * 1000;

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatMessages(prev => [...prev, { user: replier.user, msg: reply, time: getTime(), color: replier.color }]);
    }, delay);
  };

  return (
    <div className="dashboard">
      {/* Breadcrumb */}
      <div className="page-header">
        <h2>Dashboard</h2>
        <span className="breadcrumb">Home &rsaquo; Library</span>
      </div>

      {/* Tiles */}
      <div className="tiles-grid">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`tile ${tile.wide ? 'tile-wide' : ''}`}
            style={{ backgroundColor: tile.color }}
          >
            <span className="tile-icon">{tile.icon}</span>
            <span className="tile-label">{tile.label}</span>
          </div>
        ))}
      </div>

      {/* Site Analysis */}
      <div className="analysis-section">
        <div className="chart-card">
          <h3>Site Analysis</h3>
          <p className="chart-sub">Overview of Latest Month</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="x" tick={{ fontSize: 12 }} />
              <YAxis domain={[-1, 1]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sin" stroke="#e74c3c" dot={{ r: 3 }} name="sin(x)" />
              <Line type="monotone" dataKey="cos" stroke="#3498db" dot={{ r: 3 }} name="cos(x)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card" style={{ backgroundColor: stat.color }}>
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Posts & Chat */}
      <div className="bottom-section">
        <div className="posts-card">
          <div className="card-header">
            <h3>Latest Posts</h3>
          </div>
          <table className="posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Author</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {latestPosts.map((post) => (
                <tr key={post.title}>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td>{post.author}</td>
                  <td>{post.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chat-card">
          <div className="card-header">
            <h3>Chat Option</h3>
          </div>
          <div className="chat-messages">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`chat-message${msg.user === 'Admin' ? ' chat-me' : ''}`}>
                <div className="chat-avatar" style={{ backgroundColor: msg.color }}>
                  {msg.user[0]}
                </div>
                <div className="chat-content">
                  <div className="chat-meta">
                    <strong>{msg.user}</strong>
                    <span className="chat-time">{msg.time}</span>
                  </div>
                  <p>{msg.msg}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message">
                <div className="chat-avatar" style={{ backgroundColor: '#95a5a6' }}>…</div>
                <div className="chat-content">
                  <div className="dash-typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Type a message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
