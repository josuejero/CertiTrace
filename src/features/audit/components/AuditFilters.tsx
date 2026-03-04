import React from 'react';
import { AuditAction, AuditRecordType } from '../../../types';
import { FilterState } from '../hooks/useAuditFilters';

interface AuditFiltersProps {
  filters: FilterState;
  actionOptions: AuditAction[];
  recordTypeOptions: AuditRecordType[];
  onFilterChange: (field: keyof FilterState, value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

const AuditFilters: React.FC<AuditFiltersProps> = ({
  filters,
  actionOptions,
  recordTypeOptions,
  onFilterChange,
  onApply,
  onReset
}) => (
  <div className="audit-controls">
    <label>
      Action
      <select value={filters.action} onChange={event => onFilterChange('action', event.target.value)}>
        <option value="">All actions</option>
        {actionOptions.map(action => (
          <option key={action} value={action}>
            {action}
          </option>
        ))}
      </select>
    </label>
    <label>
      Record type
      <select value={filters.recordType} onChange={event => onFilterChange('recordType', event.target.value)}>
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
      <input type="date" value={filters.startDate} onChange={event => onFilterChange('startDate', event.target.value)} />
    </label>
    <label>
      End date
      <input type="date" value={filters.endDate} onChange={event => onFilterChange('endDate', event.target.value)} />
    </label>
    <div className="actions">
      <button type="button" className="apply" onClick={onApply}>
        Apply filters
      </button>
      <button type="button" className="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  </div>
);

export default AuditFilters;
