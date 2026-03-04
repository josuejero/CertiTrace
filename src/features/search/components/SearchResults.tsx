import React from 'react';
import StatusCard from '../../../shared/components/StatusCard';
import { CredentialRecord } from '../../../types';

interface SearchResultsProps {
  results: CredentialRecord[];
  onRequestVerification: (record: CredentialRecord) => void;
  disabled: boolean;
  maintenanceMessage: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onRequestVerification, disabled, maintenanceMessage }) => (
  <div className="status-grid">
    {results.map(record => (
      <StatusCard
        key={record.id}
        record={record}
        onRequestVerification={() => onRequestVerification(record)}
        disabled={disabled}
        maintenanceMessage={maintenanceMessage}
      />
    ))}
  </div>
);

export default SearchResults;
