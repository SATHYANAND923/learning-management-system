import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useData } from '../context/DataContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function CourseDetails() {
  const { id } = useParams();
  const { courses, loading, enrollCourse } = useData();
  const { isAuthenticated } = useAuth();
  const [enrolling, setEnrolling] = useState(false);

  const course = courses.find((c) => c.id === id);

  const handleEnroll = async () => {
    setEnrolling(true);
    await enrollCourse(id);
    setEnrolling(false);
  };

  if (loading) {
    return (
      <PublicLayout>
        <div className="container section">
          <p className="muted">Loading course...</p>
        </div>
      </PublicLayout>
    );
  }

  if (!course) {
    return (
      <PublicLayout>
        <div className="container section empty-state">
          <h2>Course not found</h2>
          <Link to="/courses" className="btn btn-primary mt-16">
            Back to Courses
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <section style={{ background: course.color }} className="section">
        <div className="container" style={{ color: 'var(--cream)' }}>
          <span style={{ opacity: 0.85 }}>{course.category}</span>
          <h1 style={{ color: 'var(--paper)', marginTop: 8 }}>{course.title}</h1>
          <p style={{ color: 'var(--champagne)', maxWidth: '60ch' }}>{course.description}</p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 20, opacity: 0.9 }}>
            <span>Instructor: {course.instructor}</span>
            <span>Level: {course.level}</span>
            <span>Duration: {course.duration}</span>
            <span>&#9733; {course.rating} ({course.students} students)</span>
          </div>
        </div>
      </section>

      <section className="container section" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
        <div>
          <h2 style={{ fontSize: '1.3rem' }}>Syllabus</h2>
          <div className="card mt-16">
            {course.syllabus.length === 0 ? (
              <p className="muted card-pad">Syllabus for this course hasn&rsquo;t been published yet.</p>
            ) : (
              course.syllabus.map((item, idx) => (
                <div
                  key={item.week}
                  className="flex-between"
                  style={{
                    padding: '16px 20px',
                    borderBottom: idx === course.syllabus.length - 1 ? 'none' : '1px solid var(--line)',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.92rem' }}>
                      Week {item.week}: {item.title}
                    </strong>
                  </div>
                  <span className={`badge ${item.done ? 'badge-completed' : 'badge-pending'}`}>
                    {item.done ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <div className="card card-pad">
            {!isAuthenticated ? (
              <>
                <p className="muted" style={{ fontSize: '0.9rem', marginBottom: 12 }}>
                  Log in to enroll and track your progress in this course.
                </p>
                <Link to="/login" state={{ from: `/courses/${course.id}` }} className="btn btn-primary btn-block">
                  Log in to Enroll
                </Link>
              </>
            ) : course.progress > 0 ? (
              <>
                <ProgressBar value={course.progress} />
                <Link to="/learning" className="btn btn-primary btn-block mt-16">
                  Continue Learning
                </Link>
              </>
            ) : (
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={handleEnroll}
                disabled={enrolling}
              >
                {enrolling ? 'Enrolling...' : 'Enroll in this Course'}
              </button>
            )}
            <p className="muted mt-16" style={{ fontSize: '0.85rem' }}>
              Enrollment gives you access to all lessons, assignments, and progress tracking for
              this course.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
