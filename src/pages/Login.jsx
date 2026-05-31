import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { studentLogin, lecturerLogin } from "../services/api";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = role === "student"
        ? await studentLogin({ email, password })
        : await lecturerLogin({ email, password });

      login({ email, role }, response.data.token);

      if (role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/lecturer/dashboard");
      }

    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Attendance System</h2>
        <p style={styles.subtitle}>Sign in to continue</p>

        <div style={styles.roleContainer}>
          <button
            style={role === "student" ? styles.roleActive : styles.roleInactive}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            style={role === "lecturer" ? styles.roleActive : styles.roleInactive}
            onClick={() => setRole("lecturer")}
          >
            Lecturer
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    textAlign: "center",
    marginBottom: "0.5rem",
    color: "#1a1a2e",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "1.5rem",
  },
  roleContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "1.5rem",
  },
  roleActive: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  roleInactive: {
    flex: 1,
    padding: "10px",
    backgroundColor: "white",
    color: "#1a1a2e",
    border: "1px solid #1a1a2e",
    borderRadius: "8px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1a1a2e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "1rem",
    textAlign: "center",
  },
};

export default Login;