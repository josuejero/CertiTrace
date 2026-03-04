import React from 'react';
import { SearchSummaryCounts } from '../services/applySearchFilters';

interface SearchSummaryProps {
  summaryText: string;
  summaryCounts: SearchSummaryCounts;
}

const SearchSummary: React.FC<SearchSummaryProps> = ({ summaryText, summaryCounts }) => (
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
);

export default SearchSummary;
