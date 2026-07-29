import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './Layout.css';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className={`main-wrapper ${sidebarOpen ? '' : 'collapsed'}`}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content">
          <Outlet />
        </div>
        <footer className="admin-footer">
          <span>© {new Date().getFullYear()} <strong>Inteshape</strong></span>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
