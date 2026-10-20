import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ROLES } from "./data/users";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// "/" sends people to login, or to their own role home if already signed in
function HomeRedirect() {
  const { isAuthenticated, user } = useAuth();
  return <Navigate to={isAuthenticated ? ROLES[user.role].path : "/login"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />

      {/* Role-based routes: each path is only open to its own role */}
      {Object.entries(ROLES).map(([role, { path }]) => (
        <Route
          key={role}
          path={`${path}/*`}
          element={
            <ProtectedRoute allowedRoles={[role]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      ))}

      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}
