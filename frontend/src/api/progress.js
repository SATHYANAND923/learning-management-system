// -----------------------------------------------------------------------
// api/progress.js
// Placeholder progress-tracking functions. Actual per-course progress is
// tracked live in context/DataContext.jsx (updated when a lesson is
// completed) since there's no backend yet to persist it. This file exists
// so the shape of a future real endpoint is obvious.
//
// TODO (backend team): replace with real REST calls, e.g.
//   const BASE_URL = 'https://api.yourlms.com/v1'; // <-- real backend URL goes here
//   export async function getProgress() {
//     const res = await fetch(`${BASE_URL}/progress/me`);
//     return res.json();
//   }
// -----------------------------------------------------------------------

/** Mock fetch of a progress summary — not currently used (see DataContext). */
export async function getProgress() {
  await mockDelay();
  return { enrolledCount: 0, completedCount: 0, averageProgress: 0, recentActivity: [] };
}

/** Mock update-progress action, e.g. after finishing a lesson. */
export async function updateProgress(courseId, percent) {
  console.log('[mock] updateProgress called for', courseId, percent);
  await mockDelay();
  return { success: true };
}

function mockDelay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
