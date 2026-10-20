import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../data/users";

// Usage: <ProtectedRoute allowedRoles={["admin"]}> ... </ProtectedRoute>
// No allowedRoles = any logged-in user.
export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but wrong role -> send to their own home
    return <Navigate to={ROLES[user.role].path} replace state={{ denied: true }} />;
  }

  return children;
}
