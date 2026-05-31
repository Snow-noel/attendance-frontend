import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Attendance System</div>
      <div style={styles.right}>
        <span style={styles.email}>{user?.email}</span>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#1a1a2e",
    color: "white",
  },
  brand: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  email: {
    fontSize: "14px",
    color: "#ccc",
  },
  logoutBtn: {
    padding: "6px 16px",
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default Navbar;