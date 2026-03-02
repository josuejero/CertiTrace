import React, { FormEvent, useMemo, useState } from 'react';
import { CredentialRecord, SearchFilters } from '../types';
import { useAuditEvents } from '../context/AuditContext';
import StatusCard from '../components/StatusCard';
import VerificationModal from '../components/VerificationModal';

interface SearchPageProps {
  records: CredentialRecord[];
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const initialFilters: SearchFilters = {
  firstName: '',
  lastName: '',
  state: '',
  certificationId: ''
};

const SearchPage: React.FC<SearchPageProps> = ({ records, maintenanceMode, maintenanceMessage }) => {
  const { logEvent } = useAuditEvents();
  const [filters, setFilters] = useState(initialFilters);
  const [results, setResults] = useState<CredentialRecord[]>(records);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<CredentialRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stateOptions = useMemo(() => {
    const states = Array.from(new Set(records.map(record => record.state)));
    return states.sort();
  }, [records]);

  const summaryCounts = useMemo(
    () => ({
      Active: results.filter(record => record.status === 'Active').length,
      Expired: results.filter(record => record.status === 'Expired').length,
      Suspended: results.filter(record => record.status === 'Suspended').length
    }),
    [results]
  );

  const handleFieldChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const buildFilterDetails = () =>
    `Filters => firstName:${filters.firstName || 'any'} lastName:${filters.lastName || 'any'} state:${
      filters.state || 'any'
    } id:${filters.certificationId || 'any'}`;

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    logEvent({
      action: 'search submitted',
      recordType: 'search',
      recordId: filters.certificationId || 'N/A',
      details: buildFilterDetails()
    });

    const trimmedFirstName = filters.firstName.trim();
    if (filters.firstName && trimmedFirstName.length < 2) {
      setError('First name requires at least 2 characters.');
      return;
    }

    const filtered = records.filter(record => {
      if (trimmedFirstName && !record.firstName.toLowerCase().includes(trimmedFirstName.toLowerCase())) {
        return false;
      }
      if (filters.lastName && !record.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) {
        return false;
      }
      if (filters.state && record.state !== filters.state) {
        return false;
      }
      if (filters.certificationId && record.id !== filters.certificationId) {
        return false;
      }
      return true;
    });

    setResults(filtered);
    setHasSearched(true);

    if (filtered.length === 0) {
      logEvent({
        action: 'no-result search',
        recordType: 'search',
        recordId: 'none',
        details: 'No records matched the filters.'
      });
    } else {
      logEvent({
        action: 'search returned record',
        recordType: 'search',
        recordId: filtered[0].id,
        details: `${filtered.length} results returned`
      });
    }
  };

  const handleRequestVerification = (record: CredentialRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleVerificationSubmit = (recipientName: string, recipientEmail: string) => {
    if (!selectedRecord) {
      return;
    }

    logEvent({
      action: 'verification request submitted',
      recordType: 'verification',
      recordId: selectedRecord.id,
      details: `Letter for ${recipientName} (${recipientEmail})`
    });
    handleModalClose();
  };

  const handleValidationFailure = (message: string) => {
    if (!selectedRecord) {
      return;
    }

    logEvent({
      action: 'verification request validation failure',
      recordType: 'verification',
      recordId: selectedRecord.id,
      details: message
    });
  };

  const summaryText = hasSearched
    ? `${results.length} record${results.length === 1 ? '' : 's'} found`
    : 'Showing all records';

  return (
    <section aria-label="Credential search">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-row">
          <label>
            First name
            <input
              name="firstName"
              value={filters.firstName}
              onChange={event => handleFieldChange('firstName', event.target.value)}
              placeholder="Alex"
              aria-describedby={error && filters.firstName ? 'firstNameHint' : undefined}
            />
          </label>
          <label>
            Last name
            <input
              name="lastName"
              value={filters.lastName}
              onChange={event => handleFieldChange('lastName', event.target.value)}
              placeholder="Jordan"
            />
          </label>
          <label>
            State
            <select
              name="state"
              value={filters.state}
              onChange={event => handleFieldChange('state', event.target.value)}
            >
              <option value="">All states</option>
              {stateOptions.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label>
            Certification ID
            <input
              name="certificationId"
              value={filters.certificationId}
              onChange={event => handleFieldChange('certificationId', event.target.value)}
              placeholder="CT-1001"
            />
          </label>
        </div>

        {error && (
          <p id="firstNameHint" style={{ color: '#b91c1c', margin: 0 }}>
            {error}
          </p>
        )}

        <button type="submit" aria-label="Submit search">
          Search
        </button>
      </form>

      <div className="summary-bar" role="status" aria-live="polite">
        <span>{summaryText}</span>
        <div style={{ display: 'flex', gap: '.5rem' }}>
          <span className="summary-chip active" aria-label={`${summaryCounts.Active} active records`}>
            Active {summaryCounts.Active}
          </span>
          <span className="summary-chip expired" aria-label={`${summaryCounts.Expired} expired records`}>
            Expired {summaryCounts.Expired}
          </span>
          <span className="summary-chip suspended" aria-label={`${summaryCounts.Suspended} suspended records`}>
            Suspended {summaryCounts.Suspended}
          </span>
        </div>
      </div>

      {results.length === 0 && hasSearched ? (
        <div className="empty-state" role="status">
          No records matched your search filters. Try broadening the criteria.
        </div>
      ) : (
        <div className="status-grid">
          {results.map(record => (
            <StatusCard
              key={record.id}
              record={record}
              onRequestVerification={() => handleRequestVerification(record)}
              disabled={maintenanceMode}
              maintenanceMessage={maintenanceMessage}
            />
          ))}
        </div>
      )}

      {selectedRecord && (
        <VerificationModal
          open={isModalOpen}
          record={selectedRecord}
          disabled={maintenanceMode}
          maintenanceMessage={maintenanceMessage}
          onClose={handleModalClose}
          onSubmit={handleVerificationSubmit}
          onValidationError={handleValidationFailure}
        />
      )}
    </section>
  );
};

export default SearchPage;
