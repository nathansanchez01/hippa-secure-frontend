import React, { useEffect, useState, useCallback } from 'react';
import { getUser } from '../utils/auth';

interface AuditLogEntry {
  id: number;
  userId: number;
  role: string;
  action: string;
  patientId: number;
  timestamp: string;
}

const AuditLog: React.FC = () => {
  const user = getUser();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/audit/logs', {
        headers: {
          'Authorization': `${user.id}:${user.role}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch audit logs');
      const data = await res.json();
      setLogs(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching audit logs');
    } finally {
      setLoading(false);
    }
  }, [user.id, user.role]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  if (loading) return <div>Loading audit logs...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="auditlog-container">
      <h2>Audit Logs</h2>
      {logs.length === 0 ? (
        <div>No audit logs found.</div>
      ) : (
        <div className="auditlog-table-wrapper">
          <table className="auditlog-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Role</th>
                <th>Action</th>
                <th>Patient ID</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.userId}</td>
                  <td>{log.role}</td>
                  <td>{log.action}</td>
                  <td>{log.patientId}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditLog; 