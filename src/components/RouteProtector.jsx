import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RouterProtector({ children, role }) {
  const { token, user } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
