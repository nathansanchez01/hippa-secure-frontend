import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../utils/api';

const SignupPage: React.FC = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'clinician' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await signup(form.username, form.password, form.role);
      setSuccess('Signup successful! You can now log in.');
      setForm({ username: '', password: '', role: 'clinician' });
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Your Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" value={form.username} onChange={handleChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required className="form-control" />
        </div>
        <input type="hidden" name="role" value="clinician" />
        <button type="submit" disabled={loading} className="auth-button">
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage; 