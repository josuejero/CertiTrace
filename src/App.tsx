import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import recordsData from './data/records.json';
import maintenanceConfig from './config/maintenance.json';
import SearchPage from './pages/SearchPage';
import StaffAuditPage from './pages/StaffAuditPage';
import MaintenanceBanner from './components/MaintenanceBanner';
import { AuditProvider } from './context/AuditContext';

function App() {
  const maintenanceMode = maintenanceConfig.maintenanceMode;

  return (
    <div className="app-shell">
      <header>
        <nav aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
            Search
          </NavLink>
          <NavLink to="/staff-audit" className={({ isActive }) => (isActive ? 'active' : '')}>
            Staff audit log
          </NavLink>
        </nav>
      </header>

      {maintenanceMode && <MaintenanceBanner message={maintenanceConfig.message} />}

      <main>
        <AuditProvider>
          <Routes>
            <Route
              path="/"
              element={
                <SearchPage
                  records={recordsData}
                  maintenanceMode={maintenanceMode}
                  maintenanceMessage={maintenanceConfig.message}
                />
              }
            />
            <Route path="/staff-audit" element={<StaffAuditPage />} />
          </Routes>
        </AuditProvider>
      </main>
    </div>
  );
}

export default App;
