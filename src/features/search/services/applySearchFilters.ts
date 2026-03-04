import { CredentialRecord, SearchFilters } from '../../../types';

export type SearchSummaryCounts = Record<'Active' | 'Expired' | 'Suspended', number>;

export interface SearchFilterResult {
  filteredRecords: CredentialRecord[];
  summaryCounts: SearchSummaryCounts;
}

const defaultSummaryCounts: SearchSummaryCounts = {
  Active: 0,
  Expired: 0,
  Suspended: 0
};

export function applySearchFilters(records: CredentialRecord[], filters: SearchFilters): SearchFilterResult {
  const normalizedFilters: SearchFilters = {
    firstName: filters.firstName.trim(),
    lastName: filters.lastName.trim(),
    state: filters.state,
    certificationId: filters.certificationId
  };

  const filteredRecords = records.filter(record => {
    if (normalizedFilters.firstName && !record.firstName.toLowerCase().includes(normalizedFilters.firstName.toLowerCase())) {
      return false;
    }
    if (normalizedFilters.lastName && !record.lastName.toLowerCase().includes(normalizedFilters.lastName.toLowerCase())) {
      return false;
    }
    if (normalizedFilters.state && record.state !== normalizedFilters.state) {
      return false;
    }
    if (normalizedFilters.certificationId && record.id !== normalizedFilters.certificationId) {
      return false;
    }
    return true;
  });

  const summaryCounts = filteredRecords.reduce<SearchSummaryCounts>((counts, record) => {
    counts[record.status] += 1;
    return counts;
  }, { ...defaultSummaryCounts });

  return { filteredRecords, summaryCounts };
}
