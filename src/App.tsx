import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import recordsData from './data/records.json';
import { AuditProvider } from './core/audit';
import { MaintenanceBanner, useMaintenanceConfig } from './features/maintenance';
import SearchFeature from './features/search';
import StaffAuditFeature from './features/audit';

function App() {
  const { maintenanceMode, message: maintenanceMessage } = useMaintenanceConfig();

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

      {maintenanceMode && <MaintenanceBanner message={maintenanceMessage} />}

      <main>
        <AuditProvider>
          <Routes>
            <Route
              path="/"
              element={<SearchFeature records={recordsData} maintenanceMode={maintenanceMode} maintenanceMessage={maintenanceMessage} />}
            />
            <Route path="/staff-audit" element={<StaffAuditFeature />} />
          </Routes>
        </AuditProvider>
      </main>
    </div>
  );
}

export default App;
