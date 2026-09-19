import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [studentUser, setStudentUser] = useState(null);
  const [studentToken, setStudentToken] = useState(
    localStorage.getItem("studentToken") || null,
  );

  const [lecturerUser, setLecturerUser] = useState(null);
  const [lecturerToken, setLecturerToken] = useState(
    localStorage.getItem("lecturerToken") || null,
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
