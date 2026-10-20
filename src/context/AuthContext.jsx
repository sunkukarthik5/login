import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { USERS } from "../data/users";
import { sha256 } from "../utils/hash";

const AuthContext = createContext(null);
const SESSION_KEY = "itsm_session";
const SESSION_HOURS = 8;

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession); // session persistence

  // Keep tabs in sync (logout in one tab logs out the others)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === SESSION_KEY) setSession(loadSession());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Returns { ok: true, user } or { ok: false, error }
  // The typed password is hashed and compared with the stored hash.
  const login = useCallback((email, password) => {
    const hash = sha256(password);
    const account = USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.passwordHash === hash
    );
    if (!account) return { ok: false, error: "Wrong email or password." };

    const { passwordHash: _h, ...user } = account; // never keep the hash in the session
    const now = Date.now();
    const newSession = {
      user,
      loggedInAt: now,
      expiresAt: now + SESSION_HOURS * 60 * 60 * 1000,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
    return { ok: true, user };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }, []);

  const value = {
    user: session?.user ?? null,
    session,
    isAuthenticated: !!session,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
