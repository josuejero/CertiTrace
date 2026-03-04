import baseConfig from '../../../config/maintenance.json';

declare global {
  interface Window {
    __CERTITRACE_MAINTENANCE_MODE?: boolean;
    __CERTITRACE_MAINTENANCE_MESSAGE?: string;
  }
}

interface MaintenanceConfig {
  maintenanceMode: boolean;
  message: string;
  lastUpdated: string;
}

const getWindowOverrides = () => (typeof window !== 'undefined' ? window : undefined);
const getQueryParams = () => (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams());

export default function getMaintenanceConfig(): MaintenanceConfig {
  const windowOverrides = getWindowOverrides();
  const envMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE;
  const envMessage = import.meta.env.VITE_MAINTENANCE_MESSAGE;
  const queryParams = getQueryParams();
  const queryMaintenanceMode = queryParams.get('maintenance') === 'true';
  const queryMessage = queryParams.get('maintenanceMessage');

  const maintenanceMode =
    windowOverrides?.__CERTITRACE_MAINTENANCE_MODE ??
    queryMaintenanceMode ??
    (envMaintenanceMode === 'true' ? true : baseConfig.maintenanceMode);

  const message =
    windowOverrides?.__CERTITRACE_MAINTENANCE_MESSAGE ||
    queryMessage ||
    envMessage ||
    baseConfig.message;

  return {
    ...baseConfig,
    maintenanceMode,
    message
  };
}
