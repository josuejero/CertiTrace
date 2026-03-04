import { useMemo } from 'react';
import getMaintenanceConfig from '../config/getMaintenanceConfig';

export function useMaintenanceConfig() {
  return useMemo(() => getMaintenanceConfig(), []);
}
