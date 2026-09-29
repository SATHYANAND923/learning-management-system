import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '../api/auth';
import { useData } from './DataContext.jsx';

// -----------------------------------------------------------------------
// AuthContext
//
// This is a FRONTEND-ONLY mock of a login session. There is no real
// password check and no server session/JWT — logging in or registering
// just builds a user object from what was typed and stores it so the rest
// of the app (Navbar, Dashboard, Profile) can display it consistently.
//
// Registering also adds the person to DataContext's shared `users` list,
// which is exactly what the Admin "Manage Users" page and Admin Overview
// read from — so a real registration shows up there immediately, with no
// seeded/demo accounts pretending to already exist.
//
// The session itself is persisted to localStorage purely so a page refresh
// doesn't log you out during a demo. It is NOT secure and is NOT a
// substitute for real authentication.
//
// TODO (backend team): replace the bodies of login()/register() below with
// real calls that verify credentials against the server and store a real
// auth token (see the TODO comments already in src/api/auth.js).
// -----------------------------------------------------------------------

const AuthContext = createContext(null);
const STORAGE_KEY = 'coursewright_session_user';

function initialsFromName(name) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'U'
  );
}

export function AuthProvider({ children }) {
  const { users, addUser, updateUser } = useData();
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing) — session just
      // won't survive a refresh, which is fine for this mock.
    }
  }, [user]);

  /**
   * Mock login. Since there's no real backend/account database, this does
   * not check the password — it signs you in using the email you typed and
   * a display name derived from it, plus whatever role you selected on the
   * form. It does NOT create a Manage Users entry — only Register does
   * that, since logging in isn't the same as creating an account.
   */
  async function login({ email, password, role = 'student' }) {
    await apiLogin({ email, password }); // keeps the mock network delay/shape
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const namePart = email.split('@')[0].replace(/[._]/g, ' ');
    const displayName = namePart.replace(/\b\w/g, (c) => c.toUpperCase()) || 'Student';
    const nextUser = existing
      ? { id: existing.id, name: existing.name, email: existing.email, role: existing.role, avatarInitials: initialsFromName(existing.name), joined: existing.joined }
      : {
          id: `u_${Date.now()}`,
          name: displayName,
          email,
          role,
          avatarInitials: initialsFromName(displayName),
          joined: new Date().toISOString().slice(0, 10),
        };
    setUser(nextUser);
    return nextUser;
  }

  /**
   * Mock registration — builds the session user from the form AND adds
   * them to the shared users list so they show up for Admin right away.
   */
  async function register({ name, email, password, role = 'student' }) {
    await apiRegister({ name, email, password });
    const nextUser = {
      id: `u_${Date.now()}`,
      name: name || 'New User',
      email,
      role,
      avatarInitials: initialsFromName(name || 'New User'),
      joined: new Date().toISOString().slice(0, 10),
    };
    addUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }

  function logout() {
    setUser(null);
  }

  /** Update profile fields for the current session user, and mirror the change into Manage Users. */
  function updateProfile(changes) {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...changes, avatarInitials: initialsFromName(changes.name || prev.name) };
      updateUser(prev.id, { name: next.name, email: next.email });
      return next;
    });
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
