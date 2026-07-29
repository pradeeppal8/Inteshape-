import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSettings } from '../Appcall/settingsApi';

const AdminSettingsContext = createContext({});

const isValidUrl = (val) => val && !val.startsWith('blob:');

const applyFavicon = (href) => {
  document.querySelectorAll("link[rel*='icon']").forEach(el => el.remove());
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = href;
  document.head.appendChild(link);
};

export function AdminSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => ({
    headerLogo: (() => { const v = localStorage.getItem('admin_headerLogo'); return isValidUrl(v) ? v : null; })(),
    footerLogo: (() => { const v = localStorage.getItem('admin_footerLogo'); return isValidUrl(v) ? v : null; })(),
    favicon:    (() => { const v = localStorage.getItem('admin_favicon');    return isValidUrl(v) ? v : null; })(),
    websiteName: localStorage.getItem('admin_websiteName') || 'Inteshape Admin',
    primaryColor: localStorage.getItem('admin_primary_color') || '#29abe2',
  }));

  useEffect(() => {
    getSettings()
      .then(data => {
        if (!data) return;
        const update = {};
        if (isValidUrl(data.headerLogo)) { update.headerLogo = data.headerLogo; localStorage.setItem('admin_headerLogo', data.headerLogo); }
        if (isValidUrl(data.footerLogo)) { update.footerLogo = data.footerLogo; localStorage.setItem('admin_footerLogo', data.footerLogo); }
        if (isValidUrl(data.favicon))    { update.favicon    = data.favicon;    localStorage.setItem('admin_favicon', data.favicon); }
        if (data.websiteName)            { update.websiteName = data.websiteName; localStorage.setItem('admin_websiteName', data.websiteName); }
        if (data.primaryColor)           { update.primaryColor = data.primaryColor; }
        setSettings(prev => ({ ...prev, ...update }));
      })
      .catch(() => {});
  }, []);

  // Apply favicon whenever it changes
  useEffect(() => {
    if (settings.favicon) applyFavicon(settings.favicon);
  }, [settings.favicon]);

  return (
    <AdminSettingsContext.Provider value={settings}>
      {children}
    </AdminSettingsContext.Provider>
  );
}

export const useAdminSettings = () => useContext(AdminSettingsContext);
