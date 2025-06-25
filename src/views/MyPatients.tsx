import React, { useEffect, useState, useCallback } from 'react';
import { getUser } from '../utils/auth';

interface Patient {
  id: number;
  fullName: string;
  dob: string;
  ssn: string;
  symptoms: string;
  clinicalNotes: string;
  creatorId: number;
}

const MyPatients: React.FC = () => {
  const user = getUser();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/patients/data', {
        headers: {
          'Authorization': `${user.id}:${user.role}`
        }
      });
      const data = await res.json();
      setPatients(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Error fetching patients');
      setLoading(false);
    }
  }, [user.id, user.role]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  if (loading) return <div>Loading your patients...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="patients-container">
      <h2>My Patients</h2>
      {patients.length === 0 ? (
        <div>No patients found.</div>
      ) : (
        <div className="patients-table-wrapper">
          <table className="patients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>DOB</th>
                <th>SSN</th>
                <th>Symptoms</th>
                <th>Clinical Notes</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.fullName}</td>
                  <td>{p.dob}</td>
                  <td>{p.ssn}</td>
                  <td>{p.symptoms}</td>
                  <td>{p.clinicalNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPatients; 