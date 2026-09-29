// -----------------------------------------------------------------------
// api/assignments.js
// Mock assignment-related functions. There are no seeded assignments —
// the app starts empty and fills up only from what an admin adds via the
// "Add New Assignment" modal (see context/DataContext.jsx, the real
// source of truth while there's no backend).
//
// TODO (backend team): replace with real REST calls, e.g.
//   const BASE_URL = 'https://api.yourlms.com/v1'; // <-- real backend URL goes here
//   export async function getAssignments() {
//     const res = await fetch(`${BASE_URL}/assignments`);
//     return res.json();
//   }
// -----------------------------------------------------------------------

/** Returns the initial assignment list. Starts empty — no backend yet. */
export async function getAssignments() {
  await mockDelay();
  return [];
}

/** Mock submit action for an assignment. */
export async function submitAssignment(assignmentId, payload) {
  console.log('[mock] submitAssignment called for', assignmentId, payload);
  await mockDelay();
  return { success: true };
}

function mockDelay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
