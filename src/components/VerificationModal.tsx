import React, { FormEvent, useEffect, useState } from 'react';
import { CredentialRecord } from '../types';
import { generateFakeRequestNumber, formatTooltipDate } from '../utils/date';

interface VerificationModalProps {
  open: boolean;
  record: CredentialRecord;
  disabled: boolean;
  maintenanceMessage: string;
  onClose: () => void;
  onSubmit: (recipientName: string, recipientEmail: string) => void;
  onValidationError: (message: string) => void;
}

const VerificationModal: React.FC<VerificationModalProps> = ({
  open,
  record,
  disabled,
  maintenanceMessage,
  onClose,
  onSubmit,
  onValidationError
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [error, setError] = useState('');
  const [previewNumber, setPreviewNumber] = useState(generateFakeRequestNumber());
  const [previewTimestamp, setPreviewTimestamp] = useState(new Date().toISOString());

  useEffect(() => {
    if (open) {
      setRecipientName('');
      setRecipientEmail('');
      setError('');
      setPreviewNumber(generateFakeRequestNumber());
      setPreviewTimestamp(new Date().toISOString());
    }
  }, [open]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const trimmedName = recipientName.trim();
    const trimmedEmail = recipientEmail.trim();

    if (!trimmedName || !trimmedEmail) {
      const message = 'Recipient name and email are required.';
      setError(message);
      onValidationError(message);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      const message = 'Enter a valid email address.';
      setError(message);
      onValidationError(message);
      return;
    }

    onSubmit(trimmedName, trimmedEmail);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="verification-dialog-title">
        <h2 id="verification-dialog-title">Request verification letter</h2>
        <p style={{ marginTop: 0 }}>
          Letter for {record.firstName} {record.lastName} ({record.id})
        </p>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Recipient name
            <input
              name="recipientName"
              value={recipientName}
              onChange={event => setRecipientName(event.target.value)}
              placeholder="Quality Assurance Office"
            />
          </label>
          <label>
            Recipient email
            <input
              name="recipientEmail"
              value={recipientEmail}
              onChange={event => setRecipientEmail(event.target.value)}
              placeholder="qa.team@example.com"
              type="email"
            />
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
            <button type="submit" className="primary" disabled={disabled} aria-describedby={disabled ? 'maintenance-note' : undefined}>
              Submit request
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;
