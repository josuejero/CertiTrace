import React, { useMemo, useState } from 'react';
import { AuditAction, AuditRecordType } from '../types';
import { useAuditEvents } from '../context/AuditContext';

const availableActions: AuditAction[] = [
  'search submitted',
  'search returned record',
  'no-result search',
  'verification request submitted',
  'verification request validation failure',
  'staff filter applied'
];

const recordTypeOptions: AuditRecordType[] = ['search', 'verification', 'system'];

interface FilterState {
  action: AuditAction | '';
  recordType: AuditRecordType | '';
  startDate: string;
  endDate: string;
}

const defaultFilters: FilterState = {
  action: '',
  recordType: '',
  startDate: '',
  endDate: ''
};

const StaffAuditPage: React.FC = () => {
  const { events, logEvent } = useAuditEvents();
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (appliedFilters.action && event.action !== appliedFilters.action) {
        return false;
      }
      if (appliedFilters.recordType && event.recordType !== appliedFilters.recordType) {
        return false;
      }
      if (appliedFilters.startDate && new Date(event.timestamp) < new Date(appliedFilters.startDate)) {
        return false;
      }
      if (appliedFilters.endDate && new Date(event.timestamp) > new Date(`${appliedFilters.endDate}T23:59:59`)) {
        return false;
      }
      return true;
    });
  }, [events, appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    logEvent({
      action: 'staff filter applied',
      recordType: 'system',
      recordId: 'filter',
      details: `Filters => action:${filters.action || 'any'} recordType:${filters.recordType || 'any'} start:${
        filters.startDate || 'any'
      } end:${filters.endDate || 'any'}`
    });
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const sortedEvents = useMemo(
    () => [...filteredEvents].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [filteredEvents]
  );

  return (
    <section aria-label="Staff audit log">
      <div className="audit-controls">
        <label>
          Action
          <select value={filters.action} onChange={event => setFilters(prev => ({ ...prev, action: event.target.value as AuditAction | '' }))}>
            <option value="">All actions</option>
            {availableActions.map(action => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </label>
        <label>
          Record type
          <select value={filters.recordType} onChange={event => setFilters(prev => ({ ...prev, recordType: event.target.value as AuditRecordType | '' }))}>
            <option value="">All types</option>
            {recordTypeOptions.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Start date
          <input
            type="date"
            value={filters.startDate}
            onChange={event => setFilters(prev => ({ ...prev, startDate: event.target.value }))}
          />
        </label>
        <label>
          End date
          <input type="date" value={filters.endDate} onChange={event => setFilters(prev => ({ ...prev, endDate: event.target.value }))} />
        </label>
        <div className="actions">
          <button type="button" className="apply" onClick={handleApplyFilters}>
            Apply filters
          </button>
          <button type="button" className="reset" onClick={handleResetFilters}>
            Reset
          </button>
        </div>
      </div>

      <p aria-live="polite" style={{ marginBottom: '0.75rem' }}>
        Showing {sortedEvents.length} audit event{sortedEvents.length === 1 ? '' : 's'}.
      </p>

      {sortedEvents.length === 0 ? (
        <div className="empty-state" role="status">
          No audit events match the selected criteria yet. Generate activity via the search or verification workflows.
        </div>
      ) : (
        <table className="audit-table">
          <thead>
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Action</th>
              <th scope="col">Record</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents.map(event => (
              <tr key={event.id}>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
                <td>{event.action}</td>
                <td>{event.recordId}</td>
                <td>{event.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default StaffAuditPage;
