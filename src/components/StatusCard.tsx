import React from 'react';
import { CredentialRecord, CredentialStatus } from '../types';
import { formatRelativeDate, formatTooltipDate } from '../utils/date';

interface StatusCardProps {
  record: CredentialRecord;
  onRequestVerification: () => void;
  disabled: boolean;
  maintenanceMessage: string;
}

const statusStyles: Record<CredentialStatus, { color: string; background: string; icon: string }> = {
  Active: { color: '#0f766e', background: '#ecfeff', icon: '✅' },
  Expired: { color: '#c2410c', background: '#fff1f2', icon: '⚠️' },
  Suspended: { color: '#991b1b', background: '#fee2e2', icon: '⛔' }
};

const StatusCard: React.FC<StatusCardProps> = ({ record, onRequestVerification, disabled, maintenanceMessage }) => {
  const status = statusStyles[record.status];
  const summaryId = `discipline-${record.id}`;
  const shouldShowDisciplineBanner = record.disciplinaryAction && record.discipline;

  return (
    <article className="status-card">
      <div className="card-header">
        <div>
          <p style={{ margin: 0, fontWeight: 600 }}>{`${record.firstName} ${record.lastName}`}</p>
          <p style={{ margin: 0, color: '#475569' }}>{record.id}</p>
        </div>
        <span
          className={`status-pill ${record.status.toLowerCase()}`}
          style={{ color: status.color, background: status.background }}
        >
          <span aria-hidden>{status.icon}</span>
          {record.status}
        </span>
      </div>
      <p style={{ margin: 0 }}>
        <span title={formatTooltipDate(record.lastVerified)} aria-label="Last verified timestamp">
          {formatRelativeDate(record.lastVerified)}
        </span>{' '}
        · {record.source}
      </p>

      {shouldShowDisciplineBanner && (
        <div className="discipline-banner" role="status" aria-live="polite" id={summaryId}>
          <p style={{ margin: '0 0 0.25rem 0', fontWeight: 600 }}>Disciplinary action</p>
          <p style={{ margin: 0 }}>{record.discipline.summary}</p>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
            Date: {record.discipline.date}
            {' · '}
            <a href="#" onClick={event => event.preventDefault()}>
              View incident details
            </a>
          </p>
        </div>
      )}

      <div className="card-actions">
        <button
          type="button"
          onClick={onRequestVerification}
          disabled={disabled}
          aria-describedby={disabled ? `maintenance-${record.id}` : undefined}
        >
          Request verification
        </button>
        {disabled && (
          <span id={`maintenance-${record.id}`} style={{ fontSize: '0.8rem', color: '#475569' }}>
            {maintenanceMessage}
          </span>
        )}
      </div>
    </article>
  );
};

export default StatusCard;
