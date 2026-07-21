import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RouterProtector({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}
