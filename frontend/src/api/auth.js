// -----------------------------------------------------------------------
// api/auth.js
// Placeholder authentication functions. There's no real account database —
// context/AuthContext.jsx builds the session user directly from whatever
// was typed into the Login/Register form and calls these just to keep the
// same async shape (and artificial delay) a real API call would have.
//
// TODO (backend team): replace the mock logic below with real fetch/axios
// calls to your REST API, e.g.:
//
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL; // <-- real backend URL goes here
//
//   export async function loginUser(data) {
//     const res = await fetch(`${BASE_URL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });
//     if (!res.ok) throw new Error('Login failed');
//     return res.json(); // expected: { token, user }
//   }
// -----------------------------------------------------------------------

/**
 * Mock login. Always "succeeds" — real credential checking has to happen
 * on a real backend, which doesn't exist yet.
 * @param {{ email: string, password: string }} data
 */
export async function loginUser(data) {
  console.log('[mock] loginUser called with', data);
  await mockDelay();
  return { token: 'mock-jwt-token' };
}

/**
 * Mock registration. Always "succeeds".
 * @param {{ name: string, email: string, password: string }} data
 */
export async function registerUser(data) {
  console.log('[mock] registerUser called with', data);
  await mockDelay();
  return { token: 'mock-jwt-token' };
}

/** Mock logout. */
export async function logoutUser() {
  console.log('[mock] logoutUser called');
  await mockDelay(200);
  return { success: true };
}

function mockDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
