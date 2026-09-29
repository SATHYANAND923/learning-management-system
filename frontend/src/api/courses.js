// -----------------------------------------------------------------------
// api/courses.js
// Mock course-related functions. There are no seeded courses — the app
// starts empty and fills up only from what an admin adds via the
// "Add New Course" modal (see context/DataContext.jsx, which is the real
// source of truth for the course list while there's no backend).
//
// TODO (backend team): replace with real REST calls, e.g.
//   const BASE_URL = 'https://api.yourlms.com/v1'; // <-- real backend URL goes here
//   export async function getCourses() {
//     const res = await fetch(`${BASE_URL}/courses`);
//     return res.json();
//   }
// -----------------------------------------------------------------------

/** Returns the initial course list. Starts empty — no backend yet. */
export async function getCourses() {
  await mockDelay();
  return [];
}

/** Mock enroll action. */
export async function enrollInCourse(courseId) {
  console.log('[mock] enrollInCourse called for', courseId);
  await mockDelay();
  return { success: true };
}

function mockDelay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
