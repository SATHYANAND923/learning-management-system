import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetails from './pages/CourseDetails.jsx';
import MyCourses from './pages/MyCourses.jsx';
import Learning from './pages/Learning.jsx';
import Assignments from './pages/Assignments.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import Profile from './pages/Profile.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ManageUsers from './pages/ManageUsers.jsx';
import ManageCourses from './pages/ManageCourses.jsx';
import ManageAssignments from './pages/ManageAssignments.jsx';
import NotFound from './pages/NotFound.jsx';
import { RequireAuth, RequireAdmin } from './components/RouteGuards.jsx';

// NOTE: Student and Admin routes are wrapped in RequireAuth/RequireAdmin —
// a frontend-only "conceptual" guard (see components/RouteGuards.jsx).
// There is no real backend/JWT check; it only reads the mock session from
// AuthContext. Replace with real auth once the backend exists.
export default function App() {
  return (
    <Routes>
      {/* Public / marketing pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />

      {/* Student area */}
      <Route path="/dashboard" element={<RequireAuth><StudentDashboard /></RequireAuth>} />
      <Route path="/my-courses" element={<RequireAuth><MyCourses /></RequireAuth>} />
      <Route path="/learning" element={<RequireAuth><Learning /></RequireAuth>} />
      <Route path="/assignments" element={<RequireAuth><Assignments /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

      {/* Admin area */}
      <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
      <Route path="/admin/users" element={<RequireAdmin><ManageUsers /></RequireAdmin>} />
      <Route path="/admin/courses" element={<RequireAdmin><ManageCourses /></RequireAdmin>} />
      <Route path="/admin/assignments" element={<RequireAdmin><ManageAssignments /></RequireAdmin>} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
