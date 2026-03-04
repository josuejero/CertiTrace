import React from 'react';

interface MaintenanceBannerProps {
  message: string;
}

const MaintenanceBanner: React.FC<MaintenanceBannerProps> = ({ message }) => (
  <div className="maintenance-banner" role="status" aria-live="polite">
    <strong>Maintenance mode</strong>
    <span>{message}</span>
  </div>
);

export default MaintenanceBanner;
