import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Responsive top navigation bar shown on every page.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navItem = ({ isActive }) => (isActive ? 'active' : undefined);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-mark">C</span>
        Coursewright
      </Link>

      <nav>
        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          <li>
            <NavLink to="/" end className={navItem} onClick={() => setOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={navItem} onClick={() => setOpen(false)}>
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={navItem} onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/assignments" className={navItem} onClick={() => setOpen(false)}>
              Assignments
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="navbar-actions">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="btn btn-champagne btn-sm">
              Log in
            </Link>
            <Link to="/register" className="btn btn-ghost btn-sm" style={{ color: 'var(--cream)', borderColor: 'rgba(243,230,200,0.4)' }}>
              Sign up
            </Link>
          </>
        ) : (
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              className="navbar-avatar"
              style={{ border: 'none', cursor: 'pointer' }}
              onClick={() => setMenuOpen((v) => !v)}
              title={user.name}
            >
              {user.avatarInitials}
            </button>
            {menuOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 46,
                  minWidth: 180,
                  padding: 8,
                  zIndex: 50,
                }}
              >
                <p style={{ padding: '8px 10px', margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Signed in as<br />
                  <strong style={{ color: 'var(--ink)' }}>{user.name}</strong>
                </p>
                <Link
                  to="/profile"
                  className="sidebar-link"
                  onClick={() => setMenuOpen(false)}
                  style={{ margin: 0 }}
                >
                  View Profile
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="sidebar-link"
                    onClick={() => setMenuOpen(false)}
                    style={{ margin: 0 }}
                  >
                    Go to Admin Panel
                  </Link>
                )}
                <button
                  type="button"
                  className="sidebar-link"
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--danger)',
                  }}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          &#9776;
        </button>
      </div>
    </header>
  );
}
