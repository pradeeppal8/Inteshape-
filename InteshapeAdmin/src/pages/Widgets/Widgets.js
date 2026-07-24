import React from 'react';
import { MdTrendingUp, MdPeople, MdShoppingCart, MdAttachMoney, MdBarChart, MdNotifications } from 'react-icons/md';
import './Widgets.css';

const widgets = [
  { title: 'Total Revenue', value: '$48,295', change: '+12%', icon: <MdAttachMoney />, color: '#3498db' },
  { title: 'New Users', value: '3,842', change: '+8%', icon: <MdPeople />, color: '#2ecc71' },
  { title: 'Orders', value: '1,290', change: '+5%', icon: <MdShoppingCart />, color: '#e67e22' },
  { title: 'Growth', value: '84%', change: '+3%', icon: <MdTrendingUp />, color: '#9b59b6' },
];

const progressItems = [
  { label: 'Sales', value: 75, color: '#3498db' },
  { label: 'Marketing', value: 60, color: '#2ecc71' },
  { label: 'Development', value: 85, color: '#e67e22' },
  { label: 'Support', value: 45, color: '#e74c3c' },
  { label: 'Design', value: 70, color: '#9b59b6' },
];

const activities = [
  { msg: 'New user registered', time: '2 min ago', icon: <MdPeople />, color: '#3498db' },
  { msg: 'New order received #1042', time: '15 min ago', icon: <MdShoppingCart />, color: '#2ecc71' },
  { msg: 'Revenue milestone reached', time: '1 hr ago', icon: <MdAttachMoney />, color: '#e67e22' },
  { msg: 'Monthly report generated', time: '3 hrs ago', icon: <MdBarChart />, color: '#9b59b6' },
  { msg: 'System alert: high traffic', time: '5 hrs ago', icon: <MdNotifications />, color: '#e74c3c' },
];

const Widgets = () => (
  <div className="widgets-page">
    <div className="page-header">
      <h2>Widgets</h2>
      <span className="breadcrumb">Home &rsaquo; Widgets</span>
    </div>

    <div className="widget-stats-grid">
      {widgets.map(w => (
        <div key={w.title} className="widget-stat-card" style={{ borderTop: `4px solid ${w.color}` }}>
          <div className="widget-stat-icon" style={{ color: w.color }}>{w.icon}</div>
          <div className="widget-stat-info">
            <div className="widget-stat-value">{w.value}</div>
            <div className="widget-stat-title">{w.title}</div>
            <div className="widget-stat-change" style={{ color: '#2ecc71' }}>{w.change} this month</div>
          </div>
        </div>
      ))}
    </div>

    <div className="widgets-bottom">
      <div className="widget-card">
        <div className="widget-card-header">Department Progress</div>
        <div className="progress-list">
          {progressItems.map(item => (
            <div key={item.label} className="progress-item">
              <div className="progress-label">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${item.value}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="widget-card">
        <div className="widget-card-header">Recent Activity</div>
        <div className="activity-list">
          {activities.map((a, i) => (
            <div key={i} className="activity-item">
              <div className="activity-icon" style={{ background: a.color }}>{a.icon}</div>
              <div className="activity-content">
                <div className="activity-msg">{a.msg}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Widgets;
