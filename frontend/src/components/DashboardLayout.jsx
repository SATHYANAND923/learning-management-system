import Navbar from './Navbar.jsx';
import AdminNavbar from './AdminNavbar.jsx';
import Sidebar from './Sidebar.jsx';

// Wraps pages that use the app chrome: top bar + sidebar + content area.
// variant: 'student' | 'admin' — picks BOTH which top bar and which
// sidebar links to show, so the Admin area is visually and navigationally
// separate from the student area (different top bar, no shared nav links).
export default function DashboardLayout({ children, variant = 'student' }) {
  const TopBar = variant === 'admin' ? AdminNavbar : Navbar;
  return (
    <div className="app-shell">
      <TopBar />
      <div className="app-with-sidebar">
        <Sidebar variant={variant} />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}
