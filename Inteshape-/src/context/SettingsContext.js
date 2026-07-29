import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext({});

export function SettingsProvider({ children }) {
  const [configData, setConfigData] = useState(() => {
    // Load cached settings from localStorage (non-blob only)
    const headerLogo = localStorage.getItem('admin_headerLogo');
    const footerLogo = localStorage.getItem('admin_footerLogo');
    return {
      headerLogo: headerLogo && !headerLogo.startsWith('blob:') ? headerLogo : null,
      footerLogo: footerLogo && !footerLogo.startsWith('blob:') ? footerLogo : null,
      primaryColor: localStorage.getItem('admin_primary_color') || '#29abe2',
      websiteName: localStorage.getItem('admin_websiteName') || 'Inteshape',
      tagline: localStorage.getItem('admin_tagline') || '',
      favicon: (() => { const f = localStorage.getItem('admin_favicon'); return f && !f.startsWith('blob:') ? f : null; })(),
    };
  });

  // Fetch settings from backend on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(r => r.json())
      .then(({ data }) => {
        if (!data) return;
        const update = {};
        if (data.headerLogo && !data.headerLogo.startsWith('blob:')) {
          update.headerLogo = data.headerLogo;
          localStorage.setItem('admin_headerLogo', data.headerLogo);
        }
        if (data.footerLogo && !data.footerLogo.startsWith('blob:')) {
          update.footerLogo = data.footerLogo;
          localStorage.setItem('admin_footerLogo', data.footerLogo);
        }
        if (data.primaryColor) {
          update.primaryColor = data.primaryColor;
          document.documentElement.style.setProperty('--primary-color', data.primaryColor);
          localStorage.setItem('admin_primary_color', data.primaryColor);
        }
        if (data.websiteName) {
          update.websiteName = data.websiteName;
          localStorage.setItem('admin_websiteName', data.websiteName);
        }
        if (data.tagline) {
          update.tagline = data.tagline;
          localStorage.setItem('admin_tagline', data.tagline);
        }
        if (data.favicon && !data.favicon.startsWith('blob:')) {
          update.favicon = data.favicon;
          localStorage.setItem('admin_favicon', data.favicon);
        }
        setConfigData(prev => ({ ...prev, ...update }));
      })
      .catch(() => {});
  }, []);

  // Real-time SSE updates
  useEffect(() => {
    const handleLogoUpdate = (e) => {
      if (e.detail && !e.detail.startsWith('blob:')) {
        setConfigData(prev => ({ ...prev, headerLogo: e.detail, footerLogo: e.detail }));
      }
    };
    const handleSettingsUpdate = (e) => {
      const { websiteName, tagline, favicon } = e.detail || {};
      if (favicon && !favicon.startsWith('blob:')) {
        localStorage.setItem('admin_favicon', favicon);
      }
      setConfigData(prev => ({
        ...prev,
        ...(websiteName ? { websiteName } : {}),
        ...(tagline ? { tagline } : {}),
        ...(favicon && !favicon.startsWith('blob:') ? { favicon } : {}),
      }));
    };
    window.addEventListener('headerLogoUpdated', handleLogoUpdate);
    window.addEventListener('settingsUpdated', handleSettingsUpdate);
    return () => {
      window.removeEventListener('headerLogoUpdated', handleLogoUpdate);
      window.removeEventListener('settingsUpdated', handleSettingsUpdate);
    };
  }, []);

  // Update favicon <link> tag whenever favicon changes
  useEffect(() => {
    if (!configData.favicon) return;
    const updateFavicon = (href) => {
      document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = href;
      document.head.appendChild(link);
    };
    updateFavicon(configData.favicon);
  }, [configData.favicon]);

  return (
    <SettingsContext.Provider value={configData}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
