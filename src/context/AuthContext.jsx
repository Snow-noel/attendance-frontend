import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

function getUserFromToken(token) {
  if (!token) return null;
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [studentToken, setStudentToken] = useState(
    localStorage.getItem("studentToken") || null,
  );
  const [studentUser, setStudentUser] = useState(
    getUserFromToken(studentToken),
  );

  const [lecturerToken, setLecturerToken] = useState(
    localStorage.getItem("lecturerToken") || null,
  );
  const [lecturerUser, setLecturerUser] = useState(
    getUserFromToken(lecturerToken),
  );
  const login = (userData, userToken) => {
    if (userData.role === "student") {
      setStudentUser(userData);
      setStudentToken(userToken);
      localStorage.setItem("studentToken", userToken);
    } else if (userData.role === "lecturer") {
      setLecturerUser(userData);
      setLecturerToken(userToken);
      localStorage.setItem("lecturerToken", userToken);
    }
  };

  const logout = (role) => {
    if (role === "student") {
      setStudentUser(null);
      setStudentToken(null);
      localStorage.removeItem("studentToken");
    } else if (role === "lecturer") {
      setLecturerUser(null);
      setLecturerToken(null);
      localStorage.removeItem("lecturerToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        studentUser,
        studentToken,
        lecturerUser,
        lecturerToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
