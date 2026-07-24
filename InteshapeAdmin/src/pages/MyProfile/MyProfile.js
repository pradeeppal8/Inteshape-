import React, { useState } from 'react';
import {
  MdEmail, MdPhone, MdLocationOn, MdWork, MdEdit, MdSave,
  MdClose, MdPerson, MdBarChart, MdArticle, MdStar,
  MdCalendarToday, MdLink, MdCameraAlt
} from 'react-icons/md';
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa';
import './MyProfile.css';

const skills = [
  { name: 'React.js', level: 90, color: '#3498db' },
  { name: 'Node.js', level: 75, color: '#2ecc71' },
  { name: 'UI/UX Design', level: 80, color: '#9b59b6' },
  { name: 'MongoDB', level: 65, color: '#e67e22' },
  { name: 'TypeScript', level: 70, color: '#1abc9c' },
];

const recentActivity = [
  { action: 'Updated dashboard layout', time: '2 hours ago', icon: <MdBarChart />, color: '#3498db' },
  { action: 'Published new blog post', time: '5 hours ago', icon: <MdArticle />, color: '#2ecc71' },
  { action: 'Reviewed 3 user accounts', time: '1 day ago', icon: <MdPerson />, color: '#e67e22' },
  { action: 'Fixed login page bug', time: '2 days ago', icon: <MdStar />, color: '#9b59b6' },
  { action: 'Added new chart widgets', time: '3 days ago', icon: <MdBarChart />, color: '#e74c3c' },
];

const MyProfile = () => {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [profile, setProfile] = useState({
    name: 'Admin User',
    role: 'Super Administrator',
    email: 'admin@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    company: 'Matrix Technologies',
    website: 'https://matrixadmin.com',
    bio: 'Passionate full-stack developer and system administrator with 5+ years of experience building scalable web applications and managing enterprise-level admin panels.',
    joined: 'January 2022',
  });
  const [formData, setFormData] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...formData });
    setEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2>My Profile</h2>
        <span className="breadcrumb">Home &rsaquo; My Profile</span>
      </div>

      <div className="profile-layout">
        {/* Left Column */}
        <div className="profile-left">
          {/* Avatar Card */}
          <div className="profile-avatar-card">
            <div className="profile-cover" />
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">AD</div>
              <button className="avatar-edit-btn" title="Change photo">
                <MdCameraAlt />
              </button>
            </div>
            <div className="profile-identity">
              <h3>{profile.name}</h3>
              <span className="profile-role-badge">{profile.role}</span>
              <p className="profile-bio-short">{profile.bio.substring(0, 80)}...</p>
            </div>
            <div className="profile-stats-row">
              <div className="profile-stat">
                <div className="profile-stat-value">128</div>
                <div className="profile-stat-label">Posts</div>
              </div>
              <div className="profile-stat-divider" />
              <div className="profile-stat">
                <div className="profile-stat-value">4.2k</div>
                <div className="profile-stat-label">Followers</div>
              </div>
              <div className="profile-stat-divider" />
              <div className="profile-stat">
                <div className="profile-stat-value">312</div>
                <div className="profile-stat-label">Following</div>
              </div>
            </div>
            <div className="profile-social">
              <a href="#github" className="social-btn github"><FaGithub /></a>
              <a href="#twitter" className="social-btn twitter"><FaTwitter /></a>
              <a href="#linkedin" className="social-btn linkedin"><FaLinkedin /></a>
              <a href="#web" className="social-btn web"><FaGlobe /></a>
            </div>
          </div>

          {/* Skills Card */}
          <div className="profile-card">
            <div className="profile-card-header">Skills</div>
            <div className="skills-list">
              {skills.map(skill => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-label">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${skill.level}%`, background: skill.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right">
          {/* Tabs */}
          <div className="profile-card profile-tabs-card">
            <div className="profile-tab-nav">
              {['about', 'activity', 'settings'].map(tab => (
                <button
                  key={tab}
                  className={`profile-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="tab-pane">
                <div className="section-header">
                  <h4>Personal Information</h4>
                  {!editing ? (
                    <button className="edit-btn" onClick={() => setEditing(true)}>
                      <MdEdit /> Edit
                    </button>
                  ) : (
                    <div className="edit-actions">
                      <button className="save-btn" onClick={handleSave}><MdSave /> Save</button>
                      <button className="cancel-btn" onClick={handleCancel}><MdClose /> Cancel</button>
                    </div>
                  )}
                </div>

                {!editing ? (
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-icon"><MdPerson /></span>
                      <div>
                        <div className="info-label">Full Name</div>
                        <div className="info-value">{profile.name}</div>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon"><MdEmail /></span>
                      <div>
                        <div className="info-label">Email</div>
                        <div className="info-value">{profile.email}</div>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon"><MdPhone /></span>
                      <div>
                        <div className="info-label">Phone</div>
                        <div className="info-value">{profile.phone}</div>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon"><MdLocationOn /></span>
                      <div>
                        <div className="info-label">Location</div>
                        <div className="info-value">{profile.location}</div>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon"><MdWork /></span>
                      <div>
                        <div className="info-label">Company</div>
                        <div className="info-value">{profile.company}</div>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon"><MdLink /></span>
                      <div>
                        <div className="info-label">Website</div>
                        <div className="info-value">{profile.website}</div>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon"><MdCalendarToday /></span>
                      <div>
                        <div className="info-label">Member Since</div>
                        <div className="info-value">{profile.joined}</div>
                      </div>
                    </div>
                    <div className="info-item info-item-full">
                      <span className="info-icon"><MdArticle /></span>
                      <div>
                        <div className="info-label">Bio</div>
                        <div className="info-value">{profile.bio}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="edit-form">
                    {[
                      { key: 'name', label: 'Full Name', type: 'text' },
                      { key: 'email', label: 'Email', type: 'email' },
                      { key: 'phone', label: 'Phone', type: 'text' },
                      { key: 'location', label: 'Location', type: 'text' },
                      { key: 'company', label: 'Company', type: 'text' },
                      { key: 'website', label: 'Website', type: 'url' },
                    ].map(f => (
                      <div key={f.key} className="edit-form-group">
                        <label>{f.label}</label>
                        <input
                          type={f.type}
                          value={formData[f.key]}
                          onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                        />
                      </div>
                    ))}
                    <div className="edit-form-group edit-form-full">
                      <label>Bio</label>
                      <textarea
                        rows={4}
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="tab-pane">
                <h4 style={{ marginBottom: '16px', color: '#2c3e50' }}>Recent Activity</h4>
                <div className="activity-timeline">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="timeline-entry">
                      <div className="timeline-icon" style={{ background: item.color }}>
                        {item.icon}
                      </div>
                      <div className="timeline-body">
                        <div className="timeline-action">{item.action}</div>
                        <div className="timeline-time">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="tab-pane">
                <h4 style={{ marginBottom: '20px', color: '#2c3e50' }}>Account Settings</h4>
                <div className="settings-section">
                  <div className="settings-title">Change Password</div>
                  {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                    <div key={label} className="edit-form-group">
                      <label>{label}</label>
                      <input type="password" placeholder={`Enter ${label.toLowerCase()}`} />
                    </div>
                  ))}
                  <button className="save-btn" style={{ marginTop: '8px' }}>
                    <MdSave /> Update Password
                  </button>
                </div>
                <div className="settings-divider" />
                <div className="settings-section">
                  <div className="settings-title">Notifications</div>
                  {[
                    'Email notifications for new messages',
                    'Push notifications for activity',
                    'Weekly summary reports',
                    'Security alerts',
                  ].map(label => (
                    <div key={label} className="settings-toggle-row">
                      <span>{label}</span>
                      <div className="settings-toggle on">
                        <div className="settings-knob" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
