import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard, MdBarChart, MdWidgets, MdTableChart, MdFullscreen,
  MdDynamicForm, MdErrorOutline, MdPerson, MdChevronRight, MdChevronLeft, MdMail, MdImage, MdMenuOpen, MdPeople, MdArticle
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { useAdminSettings } from '../../context/AdminSettingsContext';
import './Sidebar.css';

const navItems = [
  { label: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
  { label: 'Charts', icon: <MdBarChart />, path: '/charts' },
  { label: 'Widgets', icon: <MdWidgets />, path: '/widgets' },
  { label: 'Tables', icon: <MdTableChart />, path: '/tables' },
  { label: 'Messages', icon: <MdMail />, path: '/messages' },
  { label: 'Banners', icon: <MdImage />, path: '/banners' },
  {
    label: 'Pages', icon: <MdArticle />, path: '/pages',
    children: [
      { label: 'About Us', path: '/pages/about' },
      { label: 'Portfolio', path: '/pages/portfolio' },
      { label: 'Blog', path: '/pages/blog' },
      { label: 'Projects', path: '/pages/projects' },
      { label: 'Contact Us', path: '/pages/contact' },
    ]
  },
  { label: 'Navigation', icon: <MdMenuOpen />, path: '/navigation' },
  { label: 'Experts', icon: <MdPeople />, path: '/experts' },
  { label: 'Full Width', icon: <MdFullscreen />, path: '/full-width' },
  {
    label: 'Forms', icon: <MdDynamicForm />, path: '/forms',
    children: [
      { label: 'Basic Forms', path: '/forms/basic' },
      { label: 'Advanced Forms', path: '/forms/advanced' },
      { label: 'Validation', path: '/forms/validation' },
    ]
  },
  // {
  //   label: 'Authentication', icon: <MdPerson />, path: '/auth',
  //   children: [
  //     { label: 'Login', path: '/auth/login' },
  //     { label: 'Register', path: '/auth/register' },
  //     { label: 'Forgot Password', path: '/auth/forgot-password' },
  //   ]
  // },
  {
    label: 'Errors', icon: <MdErrorOutline />, path: '/errors',
    children: [
      { label: '404 Not Found', path: '/errors/404' },
      { label: '500 Server Error', path: '/errors/500' },
    ]
  },
];

const Sidebar = ({ sidebarOpen }) => {
  const [openMenus, setOpenMenus] = useState({});
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();
  const { headerLogo } = useAdminSettings();

  useEffect(() => {
    const fetchUnread = () =>
      fetch('http://localhost:5000/api/messages')
        .then(r => r.json())
        .then(d => { if (d.success) setUnreadCount(d.data.filter(m => !m.read).length); })
        .catch(() => { });

    fetchUnread();

    // Poll every 10s as reliable fallback
    const pollInterval = setInterval(fetchUnread, 10000);

    // SSE for instant badge update
    let es;
    try {
      es = new EventSource('http://localhost:5000/api/settings/stream');
      es.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === 'newMessage') {
            setUnreadCount(prev => prev + 1);
          }
        } catch { }
      };
    } catch { }

    return () => {
      clearInterval(pollInterval);
      if (es) es.close();
    };
  }, []);

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-brand">
        <img src='/user_img.png' alt="Logo" className="brand-avatar" />
        <img src='/header-logo.png' alt="Logo" className="brand-text" />
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div key={item.label} title={item.label}>
            {item.children ? (
              <>
                <div
                  className="nav-item has-children"
                  onClick={() => toggleMenu(item.label)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  <span className="nav-arrow">
                    {openMenus[item.label] ? <MdChevronLeft /> : <MdChevronRight />}
                  </span>
                </div>
                {openMenus[item.label] && (
                  <div className="sub-menu">
                    {item.children.map(child => (
                      <NavLink key={child.label} to={child.path} className={({ isActive }) => `sub-nav-item${isActive ? ' sub-active' : ''}`}>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={() => item.path === '/messages' && setUnreadCount(0)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.path === '/messages' && unreadCount > 0 && (
                  <span className="nav-badge">{unreadCount}</span>
                )}
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
