import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminSettingsProvider } from './context/AdminSettingsContext';
import { UsersProvider } from './context/UsersContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Charts from './pages/Charts/Charts';
import Widgets from './pages/Widgets/Widgets';
import Tables from './pages/Tables/Tables';
import FullWidth from './pages/FullWidth/FullWidth';
import BasicForms from './pages/Forms/BasicForms';
import AdvancedForms from './pages/Forms/AdvancedForms';
import ValidationForms from './pages/Forms/ValidationForms';
import Buttons from './pages/Buttons/Buttons';
import MyProfile from './pages/MyProfile/MyProfile';
import Settings from './pages/Settings/Settings';
import Messages from './pages/Messages/Messages';
import ContactDetails from './pages/ContactDetails/ContactDetails';
import Banners from './pages/Banners/Banners';
import Navigation from './pages/Navigation/Navigation';
import Experts from './pages/Experts/Experts';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Error404 from './pages/Errors/Error404';
import Error500 from './pages/Errors/Error500';
import './App.css';

const pageTitles = {
  '/pages/contact': 'Contact Details',
  '/navigation': 'Navigation Management',
  '/experts': 'Our Experts',
  '/messages': 'Messages',
  '/banners': 'Home Banners',
  '/dashboard': 'Dashboard',
  '/charts': 'Charts',
  '/widgets': 'Widgets',
  '/tables': 'Tables',
  '/full-width': 'Full Width',
  '/forms': 'Basic Forms',
  '/forms/basic': 'Basic Forms',
  '/forms/advanced': 'Advanced Forms',
  '/forms/validation': 'Form Validation',
  '/buttons': 'Buttons',
  '/profile': 'My Profile',
  '/settings': 'General Settings',
  '/errors/404': '404 Not Found',
  '/errors/500': '500 Server Error',
  '/auth/login': 'Login',
  '/auth/register': 'Register',
  '/auth/forgot-password': 'Forgot Password',
};

const PageTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const title = pageTitles[pathname];
    document.title = title ? `${title} | Inteshape` : 'Inteshape';
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AdminSettingsProvider>
      <UsersProvider>
        <AuthProvider>
          <Router>
            <PageTitle />
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/auth/login" replace />} />

              {/* Public auth routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />

              {/* Protected admin routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/widgets" element={<Widgets />} />
                  <Route path="/tables" element={<Tables />} />
                  <Route path="/full-width" element={<FullWidth />} />
                  <Route path="/forms" element={<BasicForms />} />
                  <Route path="/forms/basic" element={<BasicForms />} />
                  <Route path="/forms/advanced" element={<AdvancedForms />} />
                  <Route path="/forms/validation" element={<ValidationForms />} />
                  <Route path="/buttons" element={<Buttons />} />
                  <Route path="/profile" element={<MyProfile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/pages/contact" element={<ContactDetails />} />
                  <Route path="/banners" element={<Banners />} />
                  <Route path="/navigation" element={<Navigation />} />
                  <Route path="/experts" element={<Experts />} />
                  <Route path="/errors/404" element={<Error404 />} />
                  <Route path="/errors/500" element={<Error500 />} />
                </Route>
              </Route>

              <Route path="*" element={<Error404 />} />
            </Routes>
          </Router>
        </AuthProvider>
      </UsersProvider>
    </AdminSettingsProvider>
  );
}

export default App;
