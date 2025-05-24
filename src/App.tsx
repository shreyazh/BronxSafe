import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContext';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import SafetyMapPage from './pages/SafetyMapPage';
import AlertsPage from './pages/AlertsPage';
import ResourcesPage from './pages/ResourcesPage';
import CommunityPage from './pages/CommunityPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <UserProvider>
        <AlertProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/map" element={<SafetyMapPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </AlertProvider>
      </UserProvider>
    </Router>
  );
}

export default App;