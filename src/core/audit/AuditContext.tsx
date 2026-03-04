import React, { createContext, useContext } from 'react';
import { AuditEvent, AuditPayload } from '../../types';
import { useLocalStorageState } from '../../lib/storage';
import { generateUniqueId } from '../../lib/id';

const STORAGE_KEY = 'certitrace-audit-events';
const SYNTHETIC_USER = 'CertiTrace QA Staff';

interface AuditContextValue {
  events: AuditEvent[];
  logEvent: (payload: AuditPayload) => void;
}

const AuditContext = createContext<AuditContextValue | null>(null);

export const AuditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useLocalStorageState<AuditEvent[]>(STORAGE_KEY, []);

  const logEvent = (payload: AuditPayload) => {
    const timestamp = new Date().toISOString();
    const newEvent: AuditEvent = {
      ...payload,
      id: generateUniqueId(),
      timestamp,
      user: SYNTHETIC_USER
    };

    setEvents(prev => [newEvent, ...prev]);
  };

  return <AuditContext.Provider value={{ events, logEvent }}>{children}</AuditContext.Provider>;
};

export function useAuditEvents(): AuditContextValue {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAuditEvents must be used within an AuditProvider');
  }
  return context;
}
