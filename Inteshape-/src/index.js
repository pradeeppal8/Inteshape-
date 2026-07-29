import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./scss/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import '@coreui/coreui-pro/dist/css/coreui.min.css';
import {ThemeProvider} from "../src/Component/ThemeProvider";
import { SettingsProvider } from './context/SettingsContext';
import { BrowserRouter } from "react-router-dom";

// Sync primary color from Admin panel via SSE (real-time)
const savedColor = localStorage.getItem('admin_primary_color');
if (savedColor) document.documentElement.style.setProperty('--primary-color', savedColor);

const eventSource = new EventSource('http://localhost:5000/api/settings/stream');
eventSource.onmessage = (e) => {
  try {
    const settings = JSON.parse(e.data);
    if (settings.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
      localStorage.setItem('admin_primary_color', settings.primaryColor);
    }
    if (settings.headerLogo && !settings.headerLogo.startsWith('blob:')) {
      localStorage.setItem('admin_headerLogo', settings.headerLogo);
      window.dispatchEvent(new CustomEvent('headerLogoUpdated', { detail: settings.headerLogo }));
    }
    if (settings.footerLogo && !settings.footerLogo.startsWith('blob:')) {
      localStorage.setItem('admin_footerLogo', settings.footerLogo);
      window.dispatchEvent(new CustomEvent('headerLogoUpdated', { detail: settings.footerLogo }));
    }
    if (settings.websiteName) {
      localStorage.setItem('admin_websiteName', settings.websiteName);
      window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: {
        websiteName: settings.websiteName,
        tagline: settings.tagline,
        favicon: settings.favicon,
      }}));
    }
  } catch (_) {}
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <ThemeProvider><App/></ThemeProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
