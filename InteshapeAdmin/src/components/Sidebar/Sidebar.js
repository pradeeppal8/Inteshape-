import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard, MdBarChart, MdWidgets, MdTableChart, MdFullscreen,
  MdDynamicForm, MdErrorOutline, MdPerson, MdChevronRight, MdChevronLeft
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const navItems = [
  { label: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
  { label: 'Charts', icon: <MdBarChart />, path: '/charts' },
  { label: 'Widgets', icon: <MdWidgets />, path: '/widgets' },
  { label: 'Tables', icon: <MdTableChart />, path: '/tables' },
  { label: 'Full Width', icon: <MdFullscreen />, path: '/full-width' },
  {
    label: 'Forms', icon: <MdDynamicForm />, path: '/forms',
    children: [
      { label: 'Basic Forms', path: '/forms/basic' },
      { label: 'Advanced Forms', path: '/forms/advanced' },
      { label: 'Validation', path: '/forms/validation' },
    ]
  },
  {
    label: 'Authentication', icon: <MdPerson />, path: '/auth',
    children: [
      { label: 'Login', path: '/auth/login' },
      { label: 'Register', path: '/auth/register' },
      { label: 'Forgot Password', path: '/auth/forgot-password' },
    ]
  },
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
  const { user } = useAuth();

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-brand">
        {/* <div className="brand-avatar">
           <img src="/favicon-light.ico" alt="Logo" />
        </div> */}
        {/* <span className="brand-text">{(user?.name || 'Matrix').split(/[\s._]/)[0]}</span> */}
        <img src="/favicon-light.ico" alt="Logo" className="brand-avatar" />
        <img src="/header-logo.png" alt="Logo" className="brand-text" />
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
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
