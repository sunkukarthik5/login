import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../data/users";

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Already logged in -> go straight to the role home
  if (isAuthenticated) return <Navigate to={ROLES[user.role].path} replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Enter your email and password.");

    const result = login(email, password);
    if (!result.ok) return setError(result.error);

    // Role is detected from the account -> open that role's page
    const home = ROLES[result.user.role].path;
    const from = location.state?.from?.pathname;
    navigate(from && from.startsWith(home) ? from : home, { replace: true });
  };

  return (
    <main className="login">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1>IT Support &amp; SLA Monitor</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn primary">
          Sign in
        </button>
      </form>
    </main>
  );
}
