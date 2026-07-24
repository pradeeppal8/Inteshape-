import React from 'react';
import './FullWidth.css';

const cards = [
  { title: 'Total Revenue', value: '$128,400', sub: 'All time earnings', color: '#3498db' },
  { title: 'Active Projects', value: '24', sub: 'Currently running', color: '#2ecc71' },
  { title: 'Team Members', value: '56', sub: 'Across all departments', color: '#e67e22' },
  { title: 'Support Tickets', value: '18', sub: 'Pending resolution', color: '#e74c3c' },
];

const timeline = [
  { date: 'Jul 20', event: 'Project Alpha launched', type: 'success' },
  { date: 'Jul 18', event: 'Team meeting — Q3 planning', type: 'info' },
  { date: 'Jul 15', event: 'Server maintenance completed', type: 'warning' },
  { date: 'Jul 12', event: 'Bug fix deployed to production', type: 'success' },
  { date: 'Jul 10', event: 'New client onboarding', type: 'info' },
  { date: 'Jul 05', event: 'Critical issue reported', type: 'danger' },
];

const typeColors = { success: '#2ecc71', info: '#3498db', warning: '#f39c12', danger: '#e74c3c' };

const FullWidth = () => (
  <div className="fullwidth-page">
    <div className="page-header">
      <h2>Full Width</h2>
      <span className="breadcrumb">Home &rsaquo; Full Width</span>
    </div>

    <div className="fw-stats-row">
      {cards.map(c => (
        <div key={c.title} className="fw-stat" style={{ background: c.color }}>
          <div className="fw-stat-value">{c.value}</div>
          <div className="fw-stat-title">{c.title}</div>
          <div className="fw-stat-sub">{c.sub}</div>
        </div>
      ))}
    </div>

    <div className="fw-content-row">
      <div className="fw-card fw-wide">
        <div className="fw-card-header">Project Overview</div>
        <div style={{ padding: '20px' }}>
          <table className="fw-table">
            <thead>
              <tr><th>Project</th><th>Status</th><th>Team</th><th>Deadline</th><th>Progress</th></tr>
            </thead>
            <tbody>
              {[
                { name: 'Website Redesign', status: 'In Progress', team: 'Design', deadline: 'Aug 10', progress: 65 },
                { name: 'Mobile App', status: 'Planning', team: 'Dev', deadline: 'Sep 01', progress: 20 },
                { name: 'API Integration', status: 'Completed', team: 'Backend', deadline: 'Jul 15', progress: 100 },
                { name: 'Marketing Campaign', status: 'In Progress', team: 'Marketing', deadline: 'Aug 25', progress: 45 },
                { name: 'Database Migration', status: 'Planning', team: 'DevOps', deadline: 'Oct 01', progress: 10 },
              ].map(p => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td><span className={`fw-badge ${p.status === 'Completed' ? 'fw-success' : p.status === 'In Progress' ? 'fw-info' : 'fw-warning'}`}>{p.status}</span></td>
                  <td>{p.team}</td>
                  <td>{p.deadline}</td>
                  <td>
                    <div className="fw-prog-bg"><div className="fw-prog-fill" style={{ width: `${p.progress}%`, background: p.progress === 100 ? '#2ecc71' : '#3498db' }} /></div>
                    <span style={{ fontSize: '11px', color: '#7f8c8d' }}>{p.progress}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fw-card">
        <div className="fw-card-header">Timeline</div>
        <div className="timeline-list">
          {timeline.map((t, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot" style={{ background: typeColors[t.type] }} />
              <div className="timeline-content">
                <div className="timeline-event">{t.event}</div>
                <div className="timeline-date">{t.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FullWidth;
