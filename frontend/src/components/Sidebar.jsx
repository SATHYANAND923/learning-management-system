import { NavLink } from 'react-router-dom';

const studentLinks = [
  { to: '/dashboard', icon: '\u2302', label: 'Dashboard' },
  { to: '/my-courses', icon: '\u25A4', label: 'My Courses' },
  { to: '/assignments', icon: '\u2711', label: 'Assignments' },
  { to: '/profile', icon: '\u25CF', label: 'Profile' },
];

const adminLinks = [
  { to: '/admin', icon: '\u2302', label: 'Overview' },
  { to: '/admin/users', icon: '\u25A4', label: 'Manage Users' },
  { to: '/admin/courses', icon: '\u25A6', label: 'Manage Courses' },
  { to: '/admin/assignments', icon: '\u2711', label: 'Manage Assignments' },
];

// variant: 'student' | 'admin' — chooses which link set to render.
export default function Sidebar({ variant = 'student' }) {
  const links = variant === 'admin' ? adminLinks : studentLinks;
  const sectionLabel = variant === 'admin' ? 'Administration' : 'Learning';

  return (
    <aside className="sidebar">
      <div className="sidebar-section-title">{sectionLabel}</div>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/dashboard' || link.to === '/admin'}
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <span className="sidebar-icon">{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}
