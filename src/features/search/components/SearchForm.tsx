import React, { FormEvent } from 'react';
import { SearchFilters } from '../../../types';

interface SearchFormProps {
  filters: SearchFilters;
  error: string;
  stateOptions: string[];
  onFieldChange: (field: keyof SearchFilters, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ filters, error, stateOptions, onFieldChange, onSubmit }) => (
  <form className="search-form" onSubmit={onSubmit}>
    <div className="form-row">
      <label>
        First name
        <input
          name="firstName"
          value={filters.firstName}
          onChange={event => onFieldChange('firstName', event.target.value)}
          placeholder="Alex"
          aria-describedby={error && filters.firstName ? 'firstNameHint' : undefined}
        />
      </label>
      <label>
        Last name
        <input
          name="lastName"
          value={filters.lastName}
          onChange={event => onFieldChange('lastName', event.target.value)}
          placeholder="Jordan"
        />
      </label>
      <label>
        State
        <select name="state" value={filters.state} onChange={event => onFieldChange('state', event.target.value)}>
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
          onChange={event => onFieldChange('certificationId', event.target.value)}
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
);

export default SearchForm;
