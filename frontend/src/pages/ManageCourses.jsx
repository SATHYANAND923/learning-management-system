import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout.jsx';
import { useData } from '../context/DataContext.jsx';
import { categories } from '../api/mockData';

const courseCategories = categories.filter((c) => c !== 'All');
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const accentColors = ['#1f6f54', '#b3543f', '#8a6d3b', '#3a6b8a'];

const emptyForm = {
  title: '',
  category: courseCategories[0],
  instructor: '',
  level: levels[0],
  duration: '',
};

export default function ManageCourses() {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const handleOpenEdit = (course) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      level: course.level,
      duration: course.duration,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    // TODO (backend team): wire this up to a real "delete course" endpoint.
    deleteCourse(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // TODO (backend team): replace with a real PUT /courses/:id call.
      updateCourse(editingId, {
        title: form.title.trim() || 'Untitled Course',
        category: form.category,
        instructor: form.instructor.trim() || 'To be assigned',
        level: form.level,
        duration: form.duration.trim() || 'TBD',
      });
    } else {
      // TODO (backend team): replace with a real POST /courses call, then
      // refresh the list from the response instead of updating local state.
      addCourse({
        id: `c_${Date.now()}`,
        title: form.title.trim() || 'Untitled Course',
        category: form.category,
        instructor: form.instructor.trim() || 'To be assigned',
        level: form.level,
        duration: form.duration.trim() || 'TBD',
        rating: 0,
        students: 0,
        progress: 0,
        color: accentColors[courses.length % accentColors.length],
        thumbnail: (form.title.trim() || 'NEW').slice(0, 3).toUpperCase(),
        description: 'Course description coming soon.',
        syllabus: [],
      });
    }
    setShowModal(false);
  };

  return (
    <DashboardLayout variant="admin">
      <div className="page-title-row">
        <div>
          <h1 style={{ fontSize: '1.6rem' }}>Manage Courses</h1>
          <p className="muted">{courses.length} courses on the platform.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={handleOpenAdd}>
          Add New Course
        </button>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Instructor</th>
              <th>Level</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 && (
              <tr>
                <td colSpan={6} className="muted" style={{ textAlign: 'center' }}>
                  No courses yet — click "Add New Course" to create the first one.
                </td>
              </tr>
            )}
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>{c.instructor}</td>
                <td>{c.level}</td>
                <td>{c.students.toLocaleString()}</td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-ghost btn-sm" type="button" onClick={() => handleOpenEdit(c)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      type="button"
                      onClick={() => handleDelete(c.id)}
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
                {editingId ? 'Edit Course' : 'Add New Course'}
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
                <label htmlFor="title">Course title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. Introduction to Machine Learning"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="instructor">Instructor</label>
                <input
                  id="instructor"
                  name="instructor"
                  type="text"
                  placeholder="e.g. Dr. Anil Kumar"
                  value={form.instructor}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={form.category} onChange={handleChange}>
                  {courseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="level">Level</label>
                <select id="level" name="level" value={form.level} onChange={handleChange}>
                  {levels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="duration">Duration</label>
                <input
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder="e.g. 6 weeks"
                  value={form.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="modal-actions">
                <button className="btn btn-ghost" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  {editingId ? 'Save Changes' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
