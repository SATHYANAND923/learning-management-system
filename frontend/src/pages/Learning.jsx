import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import { useData } from '../context/DataContext.jsx';

export default function Learning() {
  const { courses, completeLesson } = useData();
  const [activeWeek, setActiveWeek] = useState(0);

  const course = courses.find((c) => c.progress > 0 && c.progress < 100) || courses.find((c) => c.progress > 0);

  if (!course) {
    return (
      <DashboardLayout variant="student">
        <div className="empty-state">
          <h3>No lessons to show yet</h3>
          <p className="muted">Enroll in a course to start learning.</p>
          <Link to="/courses" className="btn btn-primary mt-16">
            Browse Courses
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  if (course.syllabus.length === 0) {
    return (
      <DashboardLayout variant="student">
        <div className="empty-state">
          <h3>{course.title}</h3>
          <p className="muted">This course doesn&rsquo;t have a published syllabus yet.</p>
        </div>
      </DashboardLayout>
    );
  }

  const lesson = course.syllabus[activeWeek];

  const handleNext = () => {
    completeLesson(course.id, lesson.week);
    setActiveWeek((w) => Math.min(course.syllabus.length - 1, w + 1));
  };

  return (
    <DashboardLayout variant="student">
      <div className="page-title-row">
        <div>
          <span className="course-category">{course.title}</span>
          <h1 style={{ fontSize: '1.6rem' }}>{lesson.title}</h1>
        </div>
        <div style={{ minWidth: 200 }}>
          <ProgressBar value={course.progress} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28 }}>
        <div className="card card-pad">
          <div
            style={{
              background: 'var(--ink)',
              color: 'var(--champagne)',
              borderRadius: 'var(--radius-md)',
              height: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              marginBottom: 20,
            }}
          >
            Lesson video placeholder
          </div>
          <h3 style={{ fontSize: '1.1rem' }}>About this lesson</h3>
          <p className="muted">
            This is placeholder lesson content for week {lesson.week}. Once the backend is
            connected, real lesson video, notes, and downloadable material will load here.
          </p>
          <div className="flex-between mt-24">
            <button
              className="btn btn-ghost"
              type="button"
              disabled={activeWeek === 0}
              onClick={() => setActiveWeek((w) => Math.max(0, w - 1))}
            >
              Previous Lesson
            </button>
            <button
              className="btn btn-primary"
              type="button"
              disabled={activeWeek === course.syllabus.length - 1 && lesson.done}
              onClick={handleNext}
            >
              {activeWeek === course.syllabus.length - 1 ? 'Mark Complete' : 'Mark Complete & Next'}
            </button>
          </div>
        </div>

        <div className="card card-pad">
          <h3 style={{ fontSize: '1rem' }}>Course content</h3>
          <div className="mt-16">
            {course.syllabus.map((item, idx) => (
              <button
                key={item.week}
                type="button"
                onClick={() => setActiveWeek(idx)}
                className="flex-between"
                style={{
                  width: '100%',
                  background: idx === activeWeek ? 'var(--emerald-pale)' : 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  marginBottom: 4,
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span style={{ fontSize: '0.88rem' }}>
                  Week {item.week}: {item.title}
                </span>
                <span>{item.done ? '\u2713' : '\u25CB'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
