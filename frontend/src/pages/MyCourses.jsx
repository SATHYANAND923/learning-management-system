import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout.jsx';
import CourseCard from '../components/CourseCard.jsx';
import { useData } from '../context/DataContext.jsx';

export default function MyCourses() {
  const { courses, loading } = useData();
  const myCourses = courses.filter((c) => c.progress > 0);
  const inProgress = myCourses.filter((c) => c.progress < 100);
  const completed = myCourses.filter((c) => c.progress === 100);

  return (
    <DashboardLayout variant="student">
      <div className="page-title-row">
        <div>
          <h1 style={{ fontSize: '1.6rem' }}>My Courses</h1>
          <p className="muted">Everything you're currently enrolled in.</p>
        </div>
      </div>

      {loading ? (
        <p className="muted">Loading your courses...</p>
      ) : myCourses.length === 0 ? (
        <div className="empty-state">
          <h3>You haven't enrolled in any courses yet</h3>
          <p>Browse the catalog to get started.</p>
          <Link to="/courses" className="btn btn-primary mt-16">
            Browse Courses
          </Link>
        </div>
      ) : (
        <>
          <h2 style={{ fontSize: '1.1rem' }}>In Progress</h2>
          <div className="grid grid-3 mt-16" style={{ marginBottom: 36 }}>
            {inProgress.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {completed.length > 0 && (
            <>
              <h2 style={{ fontSize: '1.1rem' }}>Completed</h2>
              <div className="grid grid-3 mt-16">
                {completed.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
