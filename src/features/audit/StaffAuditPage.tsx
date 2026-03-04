import React, { useMemo } from 'react';
import { AuditAction, AuditRecordType } from '../../types';
import { useAuditEvents } from '../../core/audit';
import AuditFilters from './components/AuditFilters';
import AuditTable from './components/AuditTable';
import { useAuditFilters } from './hooks/useAuditFilters';
import { filterAuditEvents } from './services/filterAuditEvents';

const availableActions: AuditAction[] = [
  'search submitted',
  'search returned record',
  'no-result search',
  'verification request submitted',
  'verification request validation failure',
  'staff filter applied'
];

const recordTypeOptions: AuditRecordType[] = ['search', 'verification', 'system'];

const StaffAuditPage: React.FC = () => {
  const { events, logEvent } = useAuditEvents();
  const { filters, appliedFilters, handleFieldChange, applyFilters, resetFilters } = useAuditFilters();

  const filteredEvents = useMemo(() => filterAuditEvents(events, appliedFilters), [events, appliedFilters]);

  const handleApplyFilters = () => {
    applyFilters();
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
    resetFilters();
  };

  return (
    <section aria-label="Staff audit log">
      <AuditFilters
        filters={filters}
        actionOptions={availableActions}
        recordTypeOptions={recordTypeOptions}
        onFilterChange={handleFieldChange}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />

      <p aria-live="polite" style={{ marginBottom: '0.75rem' }}>
        Showing {filteredEvents.length} audit event{filteredEvents.length === 1 ? '' : 's'}.
      </p>

      {filteredEvents.length === 0 ? (
        <div className="empty-state" role="status">
          No audit events match the selected criteria yet. Generate activity via the search or verification workflows.
        </div>
      ) : (
        <AuditTable events={filteredEvents} />
      )}
    </section>
  );
};

export default StaffAuditPage;
