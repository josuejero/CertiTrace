import React, { FormEvent } from 'react';
import { CredentialRecord } from '../../../types';
import { formatTooltipDate } from '../../../lib/date';

interface VerificationModalProps {
  open: boolean;
  record: CredentialRecord | null;
  disabled: boolean;
  maintenanceMessage: string;
  stateOptions: string[];
  isSubmitting: boolean;
  recipientName: string;
  recipientEmail: string;
  destinationState: string;
  error: string;
  previewNumber: string;
  previewTimestamp: string;
  onRecipientNameChange: (value: string) => void;
  onRecipientEmailChange: (value: string) => void;
  onDestinationStateChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  open,
  record,
  disabled,
  maintenanceMessage,
  stateOptions,
  isSubmitting,
  recipientName,
  recipientEmail,
  destinationState,
  error,
  previewNumber,
  previewTimestamp,
  onRecipientNameChange,
  onRecipientEmailChange,
  onDestinationStateChange,
  onClose,
  onSubmit
}) => {
  if (!open || !record) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="verification-dialog-title">
        <h2 id="verification-dialog-title">Request verification letter</h2>
        <p style={{ marginTop: 0 }}>
          Letter for {record.firstName} {record.lastName} ({record.id})
        </p>
        <form onSubmit={onSubmit} noValidate>
          <label>
            Recipient name
            <input
              name="recipientName"
              value={recipientName}
              onChange={event => onRecipientNameChange(event.target.value)}
              placeholder="Quality Assurance Office"
            />
          </label>
          <label>
            Recipient email
            <input
              name="recipientEmail"
              value={recipientEmail}
              onChange={event => onRecipientEmailChange(event.target.value)}
              placeholder="qa.team@example.com"
              type="email"
            />
          </label>
          <label>
            Destination state
            <select
              name="destinationState"
              value={destinationState}
              onChange={event => onDestinationStateChange(event.target.value)}
            >
              <option value="">Select a destination state</option>
              {stateOptions.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          {error && (
            <p style={{ color: '#b91c1c', margin: 0 }} role="alert">
              {error}
            </p>
          )}

          <div className="preview" aria-label="Generated verification letter preview">
            <div className="preview-content">
              <p style={{ fontWeight: 600, margin: 0 }}>Verification letter preview</p>
              <p style={{ margin: '0.5rem 0 0' }}>Request number: {previewNumber}</p>
              <p style={{ margin: '0.25rem 0' }} title={formatTooltipDate(previewTimestamp)}>
                Issued {new Date(previewTimestamp).toLocaleString()}
              </p>
              <p style={{ margin: '0.25rem 0' }}>
                This synthetic letter confirms {record.firstName} {record.lastName} ({record.id}) holds a{' '}
                {record.status} credential in {record.state}.
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569' }}>
                Seal: synthetic demo seal (not NCCPA)
              </p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', margin: '0.5rem 0' }}>
              Document type: Certification verification summary
            </p>
          </div>
          <div>
            <p style={{ margin: 0 }}>
              {disabled ? (
                <span id="maintenance-note">{maintenanceMessage}</span>
              ) : (
                <span>Verification requests are stored for QA evidence.</span>
              )}
            </p>
          </div>
          <footer>
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="primary"
              disabled={disabled || isSubmitting}
              aria-describedby={disabled ? 'maintenance-note' : undefined}
              aria-busy={isSubmitting ? 'true' : undefined}
            >
              Submit request
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;
