import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form);
      const from = location.state?.from;
      navigate(from || (user.role === 'admin' ? '/admin' : '/dashboard'));
    } catch (err) {
      setError('Could not log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-side">
        <h2>Welcome back to Coursewright</h2>
        <p style={{ color: 'var(--champagne)', maxWidth: '34ch' }}>
          Pick up your courses, check assignment deadlines, and keep your progress moving.
        </p>
      </div>
      <div className="auth-form-side">
        <div className="card card-pad form-card" style={{ width: '100%' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Log in</h2>
          <p className="muted mt-8" style={{ marginBottom: 24 }}>
            Enter your details to access your dashboard.
          </p>
          <form onSubmit={handleSubmit}>
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
                placeholder="********"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="role">Log in as</label>
              <select id="role" name="role" value={form.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
              <p className="field-hint">
                No backend yet, so this just decides which area you land in for the demo.
              </p>
            </div>
            {error && (
              <p style={{ color: 'var(--danger)', fontSize: '0.88rem' }}>{error}</p>
            )}
            <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
          <p className="muted mt-16" style={{ fontSize: '0.9rem' }}>
            Don&rsquo;t have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
