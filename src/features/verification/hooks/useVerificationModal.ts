import { FormEvent, useCallback, useEffect, useState } from 'react';
import { CredentialRecord } from '../../../types';
import { generateFakeRequestNumber } from '../../../lib/date';

interface UseVerificationModalOptions {
  onSubmit: (
    recipientName: string,
    recipientEmail: string,
    destinationState: string,
    record: CredentialRecord
  ) => void;
  onValidationError: (message: string, recordId: string) => void;
}

export interface UseVerificationModalResult {
  selectedRecord: CredentialRecord | null;
  isModalOpen: boolean;
  isSubmitting: boolean;
  recipientName: string;
  recipientEmail: string;
  destinationState: string;
  error: string;
  previewNumber: string;
  previewTimestamp: string;
  openModal: (record: CredentialRecord) => void;
  closeModal: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleRecipientNameChange: (value: string) => void;
  handleRecipientEmailChange: (value: string) => void;
  handleDestinationStateChange: (value: string) => void;
}

export function useVerificationModal({ onSubmit, onValidationError }: UseVerificationModalOptions): UseVerificationModalResult {
  const [selectedRecord, setSelectedRecord] = useState<CredentialRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [destinationState, setDestinationState] = useState('');
  const [error, setError] = useState('');
  const [previewNumber, setPreviewNumber] = useState(generateFakeRequestNumber());
  const [previewTimestamp, setPreviewTimestamp] = useState(new Date().toISOString());

  useEffect(() => {
    if (isModalOpen) {
      setRecipientName('');
      setRecipientEmail('');
      setDestinationState('');
      setError('');
      setPreviewNumber(generateFakeRequestNumber());
      setPreviewTimestamp(new Date().toISOString());
    }
  }, [isModalOpen]);

  const openModal = useCallback((record: CredentialRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRecord(null);
    setIsSubmitting(false);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!selectedRecord) {
        return;
      }

      setError('');

      const trimmedName = recipientName.trim();
      const trimmedEmail = recipientEmail.trim();
      const selectedState = destinationState.trim();

      if (!trimmedName || !trimmedEmail) {
        const message = 'Recipient name and email are required.';
        setError(message);
        onValidationError(message, selectedRecord.id);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        const message = 'Enter a valid email address.';
        setError(message);
        onValidationError(message, selectedRecord.id);
        return;
      }

      if (!selectedState) {
        const message = 'Select a destination state.';
        setError(message);
        onValidationError(message, selectedRecord.id);
        return;
      }

      setIsSubmitting(true);
      onSubmit(trimmedName, trimmedEmail, selectedState, selectedRecord);
      closeModal();
    },
    [closeModal, destinationState, onSubmit, onValidationError, recipientEmail, recipientName, selectedRecord]
  );

  return {
    selectedRecord,
    isModalOpen,
    isSubmitting,
    recipientName,
    recipientEmail,
    destinationState,
    error,
    previewNumber,
    previewTimestamp,
    openModal,
    closeModal,
    handleSubmit,
    handleRecipientNameChange: setRecipientName,
    handleRecipientEmailChange: setRecipientEmail,
    handleDestinationStateChange: setDestinationState
  };
}
