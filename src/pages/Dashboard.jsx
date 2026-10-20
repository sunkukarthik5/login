import { useAuth } from "../context/AuthContext";
import { ROLES } from "../data/users";

// After login, only the top heading bar is shown.
export default function Dashboard() {
  const { user, logout } = useAuth();
  const initials = user.name.split(" ").map((n) => n[0]).join("");

  return (
    <header className="topbar">
      <strong>IT Support &amp; SLA Monitor</strong>
      <div className="who">
        <span className={`badge badge-${user.role}`}>{ROLES[user.role].label}</span>
        <span className="avatar" aria-hidden="true">{initials}</span>
        <span className="name">{user.name}</span>
        <button className="btn small" onClick={logout}>Log out</button>
      </div>
    </header>
  );
}
