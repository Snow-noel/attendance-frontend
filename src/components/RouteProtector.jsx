import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RouterProtector({ children, role }) {
  const { studentToken, studentUser, lecturerToken, lecturerUser } = useAuth();

  const token = role === "student" ? studentToken : lecturerToken;
  const user = role === "student" ? studentUser : lecturerUser;
  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}
