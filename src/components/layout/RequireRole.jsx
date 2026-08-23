import { Navigate } from "react-router-dom";
import { useRole } from "../../context/RoleContext.jsx";

export default function RequireRole({ children }) {
  const { role } = useRole();
  if (!role) return <Navigate to="/login" replace />;
  return children;
}