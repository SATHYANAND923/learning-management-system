// -----------------------------------------------------------------------
// api/users.js
// Mock user-management functions (mainly for the Admin area). There are
// no seeded users — the list starts empty and fills up only as real
// people register through the Register page (see context/AuthContext.jsx,
// which adds each new registrant into context/DataContext.jsx's shared
// user list so Admin can see them immediately).
//
// TODO (backend team): replace with real REST calls, e.g.
//   const BASE_URL = 'https://api.yourlms.com/v1'; // <-- real backend URL goes here
//   export async function getAllUsers() {
//     const res = await fetch(`${BASE_URL}/admin/users`);
//     return res.json();
//   }
// -----------------------------------------------------------------------

/** Returns the initial user list. Starts empty — no backend yet. */
export async function getAllUsers() {
  await mockDelay();
  return [];
}

/** Mock update role/status action. */
export async function updateUser(userId, changes) {
  console.log('[mock] updateUser called for', userId, changes);
  await mockDelay();
  return { success: true };
}

/** Mock delete user action. */
export async function deleteUser(userId) {
  console.log('[mock] deleteUser called for', userId);
  await mockDelay();
  return { success: true };
}

function mockDelay(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
