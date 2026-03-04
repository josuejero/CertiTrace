import React from 'react';
import { AuditEvent } from '../../../types';

interface AuditTableProps {
  events: AuditEvent[];
}

const AuditTable: React.FC<AuditTableProps> = ({ events }) => (
  <table className="audit-table">
    <thead>
      <tr>
        <th scope="col">Timestamp</th>
        <th scope="col">Action</th>
        <th scope="col">Record</th>
        <th scope="col">Details</th>
      </tr>
    </thead>
    <tbody>
      {events.map(event => (
        <tr key={event.id}>
          <td>{new Date(event.timestamp).toLocaleString()}</td>
          <td>{event.action}</td>
          <td>{event.recordId}</td>
          <td>{event.details}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AuditTable;
