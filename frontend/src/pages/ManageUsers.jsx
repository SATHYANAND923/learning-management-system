import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout.jsx';
import { useData } from '../context/DataContext.jsx';

const roles = ['student', 'instructor', 'admin'];
const emptyForm = { name: '', email: '', role: 'student' };

export default function ManageUsers() {
  const { users, addUser, updateUser, deleteUser } = useData();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const handleOpenEdit = (u) => {
    setEditingId(u.id);
    setForm({ name: u.name, email: u.email, role: u.role });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    // TODO (backend team): deleteUser() currently just resolves with mock success.
    await deleteUser(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // TODO (backend team): replace with a real PUT /users/:id call.
      updateUser(editingId, { name: form.name.trim(), email: form.email.trim(), role: form.role });
    } else {
      // TODO (backend team): replace with a real POST /users call.
      addUser({
        id: `u_${Date.now()}`,
        name: form.name.trim() || 'Unnamed User',
        email: form.email.trim(),
        role: form.role,
        joined: new Date().toISOString().slice(0, 10),
      });
    }
    setShowModal(false);
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout variant="admin">
      <div className="page-title-row">
        <div>
          <h1 style={{ fontSize: '1.6rem' }}>Manage Users</h1>
          <p className="muted">{users.length} users registered on the platform.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div className="search-bar">
            <span aria-hidden="true">&#128269;</span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="button" onClick={handleOpenAdd}>
            Add New User
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="muted" style={{ textAlign: 'center' }}>
                  {users.length === 0 ? 'No one has registered yet.' : 'No users match your search.'}
                </td>
              </tr>
            )}
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td style={{ textTransform: 'capitalize' }}>{u.role}</td>
                <td>{u.joined}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" type="button" onClick={() => handleOpenEdit(u)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => handleDelete(u.id)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem', margin: 0 }}>
                {editingId ? 'Edit User' : 'Add New User'}
              </h3>
              <button
                className="modal-close"
                type="button"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Priya Nambiar"
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
                  placeholder="e.g. priya@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="role">Role</label>
                <select id="role" name="role" value={form.role} onChange={handleChange}>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button className="btn btn-ghost" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  {editingId ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
