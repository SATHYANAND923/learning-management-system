import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await register(form);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-side">
        <h2>Start learning at your own pace</h2>
        <p style={{ color: 'var(--champagne)', maxWidth: '34ch' }}>
          Create an account to enroll in courses, submit assignments, and track your progress.
        </p>
      </div>
      <div className="auth-form-side">
        <div className="card card-pad form-card" style={{ width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Create an account</h2>
          <p className="muted mt-8" style={{ marginBottom: 24 }}>
            It only takes a minute to get started.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="role">I am joining as a</label>
              <select id="role" name="role" value={form.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin (demo only)</option>
              </select>
            </div>
            {error && <p style={{ color: 'var(--danger)', fontSize: '0.88rem' }}>{error}</p>}
            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
          <p className="muted mt-16" style={{ fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
