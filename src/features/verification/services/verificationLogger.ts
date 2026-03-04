import { AuditPayload, CredentialRecord } from '../../../types';

type LogEventFn = (payload: AuditPayload) => void;

export function logVerificationRequest(
  logEvent: LogEventFn,
  record: CredentialRecord,
  recipientName: string,
  recipientEmail: string,
  destinationState: string
) {
  logEvent({
    action: 'verification request submitted',
    recordType: 'verification',
    recordId: record.id,
    details: `Letter for ${recipientName} (${recipientEmail}) to ${destinationState}`
  });
}

export function logVerificationValidationFailure(logEvent: LogEventFn, recordId: string, message: string) {
  logEvent({
    action: 'verification request validation failure',
    recordType: 'verification',
    recordId,
    details: message
  });
}
