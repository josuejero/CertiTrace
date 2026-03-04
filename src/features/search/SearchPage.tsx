import React, { FormEvent, useMemo } from 'react';
import { CredentialRecord } from '../../types';
import { useAuditEvents } from '../../core/audit';
import SearchForm from './components/SearchForm';
import SearchSummary from './components/SearchSummary';
import SearchResults from './components/SearchResults';
import VerificationModal from '../verification/components/VerificationModal';
import { useSearchFilters } from './hooks/useSearchFilters';
import { useVerificationModal } from '../verification/hooks/useVerificationModal';
import {
  logVerificationRequest,
  logVerificationValidationFailure
} from '../verification/services/verificationLogger';

interface SearchFeatureProps {
  records: CredentialRecord[];
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const SearchFeature: React.FC<SearchFeatureProps> = ({ records, maintenanceMode, maintenanceMessage }) => {
  const { logEvent } = useAuditEvents();
  const { filters, results, summaryCounts, error, hasSearched, handleFieldChange, handleSearch } =
    useSearchFilters(records);
  const stateOptions = useMemo(() => {
    const states = Array.from(new Set(records.map(record => record.state)));
    return states.sort();
  }, [records]);

  const buildFilterDetails = () =>
    `Filters => firstName:${filters.firstName || 'any'} lastName:${filters.lastName || 'any'} state:${
      filters.state || 'any'
    } id:${filters.certificationId || 'any'}`;

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    const searchDetails = buildFilterDetails();
    logEvent({
      action: 'search submitted',
      recordType: 'search',
      recordId: filters.certificationId || 'N/A',
      details: searchDetails
    });

    const searchResult = handleSearch(event);
    if (!searchResult) {
      return;
    }

    if (searchResult.filteredRecords.length === 0) {
      logEvent({
        action: 'no-result search',
        recordType: 'search',
        recordId: 'none',
        details: 'No records matched the filters.'
      });
      return;
    }

    logEvent({
      action: 'search returned record',
      recordType: 'search',
      recordId: searchResult.filteredRecords[0].id,
      details: `${searchResult.filteredRecords.length} results returned`
    });
  };

  const handleVerificationSubmit = (
    recipientName: string,
    recipientEmail: string,
    destinationState: string,
    record: CredentialRecord
  ) => {
    logVerificationRequest(logEvent, record, recipientName, recipientEmail, destinationState);
  };

  const handleValidationFailure = (message: string, recordId: string) => {
    logVerificationValidationFailure(logEvent, recordId, message);
  };

  const verification = useVerificationModal({
    onSubmit: handleVerificationSubmit,
    onValidationError: handleValidationFailure
  });

  const handleRequestVerification = (record: CredentialRecord) => {
    verification.openModal(record);
  };

  const summaryText = hasSearched
    ? `${results.length} record${results.length === 1 ? '' : 's'} found`
    : 'Showing all records';

  return (
    <section aria-label="Credential search">
      <SearchForm
        filters={filters}
        error={error}
        stateOptions={stateOptions}
        onFieldChange={handleFieldChange}
        onSubmit={handleSearchSubmit}
      />

      <SearchSummary summaryText={summaryText} summaryCounts={summaryCounts} />

      {results.length === 0 && hasSearched ? (
        <div className="empty-state" role="status">
          No records matched your search filters. Try broadening the criteria.
        </div>
      ) : (
        <SearchResults
          results={results}
          onRequestVerification={handleRequestVerification}
          disabled={maintenanceMode}
          maintenanceMessage={maintenanceMessage}
        />
      )}

      <VerificationModal
        open={verification.isModalOpen}
        record={verification.selectedRecord}
        disabled={maintenanceMode}
        maintenanceMessage={maintenanceMessage}
        stateOptions={stateOptions}
        isSubmitting={verification.isSubmitting}
        recipientName={verification.recipientName}
        recipientEmail={verification.recipientEmail}
        destinationState={verification.destinationState}
        error={verification.error}
        previewNumber={verification.previewNumber}
        previewTimestamp={verification.previewTimestamp}
        onRecipientNameChange={verification.handleRecipientNameChange}
        onRecipientEmailChange={verification.handleRecipientEmailChange}
        onDestinationStateChange={verification.handleDestinationStateChange}
        onClose={verification.closeModal}
        onSubmit={verification.handleSubmit}
      />
    </section>
  );
};

export default SearchFeature;
