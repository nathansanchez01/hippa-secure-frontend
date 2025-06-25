import React, { useState } from 'react';
import { getUser } from '../utils/auth';

const CreatePatient: React.FC = () => {
  const user = getUser();
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    ssn: '',
    symptoms: '',
    clinicalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (user?.role !== 'clinician') {
    return <div style={{ color: 'red', margin: 24 }}>Only clinicians can create patients.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('http://localhost:3000/api/patients/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${user.id}:${user.role}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || 'Failed to create patient');
      } else {
        setSuccess(data.message || 'Patient created');
        setForm({
          fullName: '',
          dob: '',
          ssn: '',
          symptoms: '',
          clinicalNotes: ''
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-patient-container">
      <h2>Create Patient</h2>
      <form className="create-patient-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input name="dob" type="date" value={form.dob} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>SSN</label>
          <input name="ssn" value={form.ssn} onChange={handleChange} required className="form-control" placeholder="123-45-6788" />
        </div>
        <div className="form-group">
          <label>Symptoms</label>
          <input name="symptoms" value={form.symptoms} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Clinical Notes</label>
          <textarea name="clinicalNotes" value={form.clinicalNotes} onChange={handleChange} required className="form-control" />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Patient'}
        </button>
      </form>
      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}
    </div>
  );
};

export default CreatePatient; 