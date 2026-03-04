import { FormEvent, useState } from 'react';
import { CredentialRecord, SearchFilters } from '../../../types';
import { applySearchFilters, SearchSummaryCounts } from '../services/applySearchFilters';

export const initialSearchFilters: SearchFilters = {
  firstName: '',
  lastName: '',
  state: '',
  certificationId: ''
};

export interface SearchActionResult {
  filteredRecords: CredentialRecord[];
}

export interface UseSearchFiltersResult {
  filters: SearchFilters;
  results: CredentialRecord[];
  summaryCounts: SearchSummaryCounts;
  error: string;
  hasSearched: boolean;
  handleFieldChange: (field: keyof SearchFilters, value: string) => void;
  handleSearch: (event: FormEvent<HTMLFormElement>) => SearchActionResult | undefined;
}

export function useSearchFilters(records: CredentialRecord[]): UseSearchFiltersResult {
  const [filters, setFilters] = useState<SearchFilters>(initialSearchFilters);
  const [results, setResults] = useState<CredentialRecord[]>(records);
  const [summaryCounts, setSummaryCounts] = useState<SearchSummaryCounts>(() =>
    applySearchFilters(records, initialSearchFilters).summaryCounts
  );
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleFieldChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (filters.firstName && filters.firstName.trim().length < 2) {
      setError('First name requires at least 2 characters.');
      return;
    }

    const searchFilters: SearchFilters = {
      ...filters,
      firstName: filters.firstName.trim()
    };

    const { filteredRecords, summaryCounts: counts } = applySearchFilters(records, searchFilters);

    setResults(filteredRecords);
    setSummaryCounts(counts);
    setHasSearched(true);

    return { filteredRecords };
  };

  return {
    filters,
    results,
    summaryCounts,
    error,
    hasSearched,
    handleFieldChange,
    handleSearch
  };
}
