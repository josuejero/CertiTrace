import { useState } from 'react';
import { AuditAction, AuditRecordType } from '../../../types';

export interface FilterState {
  action: AuditAction | '';
  recordType: AuditRecordType | '';
  startDate: string;
  endDate: string;
}

export const defaultAuditFilters: FilterState = {
  action: '',
  recordType: '',
  startDate: '',
  endDate: ''
};

export function useAuditFilters(initialFilters = defaultAuditFilters) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(initialFilters);

  const handleFieldChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    setFilters(defaultAuditFilters);
    setAppliedFilters(defaultAuditFilters);
  };

  return {
    filters,
    appliedFilters,
    handleFieldChange,
    applyFilters,
    resetFilters
  };
}
