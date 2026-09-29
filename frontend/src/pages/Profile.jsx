import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    // TODO (backend team): wire this up to a real "update profile" endpoint.
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout variant={user.role === 'admin' ? 'admin' : 'student'}>
      <h1 style={{ fontSize: '1.6rem' }}>Profile</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Manage your account details.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 28 }}>
        <div className="card card-pad" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: '50%',
              background: 'var(--emerald)',
              color: 'var(--cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              fontWeight: 600,
              margin: '0 auto 16px',
            }}
          >
            {user.avatarInitials}
          </div>
          <h3 style={{ fontSize: '1.1rem' }}>{user.name}</h3>
          <p className="muted" style={{ fontSize: '0.88rem', textTransform: 'capitalize' }}>{user.role}</p>
          <p className="muted" style={{ fontSize: '0.8rem' }}>
            Joined {new Date(user.joined).toLocaleDateString(undefined, {
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="card card-pad">
          <h3 style={{ fontSize: '1.05rem' }}>Account details</h3>
          <form onSubmit={handleSave} className="mt-16">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="field">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" name="bio" rows={3} placeholder="Tell us a little about yourself" />
            </div>
            <button className="btn btn-primary" type="submit">
              Save changes
            </button>
            {saved && (
              <span className="muted" style={{ marginLeft: 12, fontSize: '0.85rem' }}>
                Saved.
              </span>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
