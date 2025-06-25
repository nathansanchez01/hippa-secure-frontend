import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import { setUser } from '../utils/auth';

const LoginPage: React.FC = () => {
    const [form, setForm] = useState({ username: '', password: '', role: 'clinician' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const user = await login(form.username, form.password, form.role);
            setUser(user);
            setSuccess('Login successful!');
            setForm({ username: '', password: '', role: 'clinician' });
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" value={form.username} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select id="role" name="role" value={form.role} onChange={handleChange} className="form-control">
                        <option value="clinician">Clinician</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" disabled={loading} className="auth-button">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <div className="message error">{error}</div>}
            {success && <div className="message success">{success}</div>}
            <p className="auth-switch">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginPage; 