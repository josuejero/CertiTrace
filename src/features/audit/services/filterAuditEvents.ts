import { AuditEvent } from '../../../types';
import { FilterState } from '../hooks/useAuditFilters';

export function filterAuditEvents(events: AuditEvent[], filters: FilterState): AuditEvent[] {
  const filtered = events.filter(event => {
    if (filters.action && event.action !== filters.action) {
      return false;
    }
    if (filters.recordType && event.recordType !== filters.recordType) {
      return false;
    }
    if (filters.startDate && new Date(event.timestamp) < new Date(filters.startDate)) {
      return false;
    }
    if (filters.endDate && new Date(event.timestamp) > new Date(`${filters.endDate}T23:59:59`)) {
      return false;
    }
    return true;
  });

  return [...filtered].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
