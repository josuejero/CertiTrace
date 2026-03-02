export type CredentialStatus = 'Active' | 'Expired' | 'Suspended';

export interface DisciplineInfo {
  summary: string;
  date: string;
}

export interface CredentialRecord {
  id: string;
  firstName: string;
  lastName: string;
  state: string;
  status: CredentialStatus;
  lastVerified: string;
  source: string;
  discipline: DisciplineInfo | null;
}

export type AuditAction =
  | 'search submitted'
  | 'search returned record'
  | 'no-result search'
  | 'verification request submitted'
  | 'verification request validation failure'
  | 'staff filter applied';

export type AuditRecordType = 'search' | 'verification' | 'system';

export interface AuditEvent {
  id: string;
  action: AuditAction;
  user: string;
  recordId: string;
  recordType: AuditRecordType;
  timestamp: string;
  details: string;
}

export type AuditPayload = Omit<AuditEvent, 'id' | 'timestamp'>;

export interface SearchFilters {
  firstName: string;
  lastName: string;
  state: string;
  certificationId: string;
}
