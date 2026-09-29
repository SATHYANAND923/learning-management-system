import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout.jsx';
import StatCard from '../components/StatCard.jsx';
import { useData } from '../context/DataContext.jsx';

export default function AdminDashboard() {
  const { users, courses, assignments } = useData();
  const recentUsers = [...users].slice(0, 5);
  const recentCourses = [...courses].slice(0, 5);
  const totalEnrollments = courses.filter((c) => c.progress > 0).length;

  return (
    <DashboardLayout variant="admin">
      <h1 style={{ fontSize: '1.6rem' }}>Admin Overview</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        A snapshot of activity across the whole platform — every number here reflects real
        registrations and content added through this app, not seeded demo data.
      </p>

      <div className="grid grid-4">
        <StatCard label="Total users" value={users.length} accent />
        <StatCard label="Total courses" value={courses.length} />
        <StatCard label="Total enrollments" value={totalEnrollments} />
        <StatCard label="Total assignments" value={assignments.length} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 32 }}>
        <div>
          <div className="section-head" style={{ marginBottom: 12 }}>
            <h2 style={{ fontSize: '1.15rem' }}>Recent users</h2>
            <Link to="/admin/users" className="btn btn-ghost btn-sm">
              Manage users
            </Link>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="muted" style={{ textAlign: 'center' }}>
                      No one has registered yet.
                    </td>
                  </tr>
                ) : (
                  recentUsers.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td style={{ textTransform: 'capitalize' }}>{u.role}</td>
                      <td>{u.joined}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="section-head" style={{ marginBottom: 12 }}>
            <h2 style={{ fontSize: '1.15rem' }}>Recent courses</h2>
            <Link to="/admin/courses" className="btn btn-ghost btn-sm">
              Manage courses
            </Link>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                {recentCourses.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="muted" style={{ textAlign: 'center' }}>
                      No courses have been added yet.
                    </td>
                  </tr>
                ) : (
                  recentCourses.map((c) => (
                    <tr key={c.id}>
                      <td>{c.title}</td>
                      <td>{c.category}</td>
                      <td>{c.students.toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
