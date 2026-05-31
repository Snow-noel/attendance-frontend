import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import QRScanner from "../components/QrScanner";
import { getStudentAttendance } from "../services/api";

function StudentDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudentAttendance()
      .then((res) => {
        setAttendance(res.data.attendance);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h2 style={styles.title}>My Attendance</h2>
        <QRScanner />

        {loading ? (
          <p>Loading...</p>
        ) : attendance.length === 0 ? (
          <p style={styles.empty}>No attendance records found.</p>
        ) : (
          <div>
            {attendance.map((record, index) => (
              <div key={index} style={styles.card}>
                <div style={styles.cardLeft}>
                  <h4 style={styles.moduleName}>{record.module_name}</h4>
                  <p style={styles.date}>
                    {new Date(record.marked_at).toLocaleDateString()}
                  </p>
                </div>
                <span style={styles.badge}>Present</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
  },
  content: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "0 1rem",
  },
  title: {
    fontSize: "22px",
    marginBottom: "1.5rem",
    color: "#1a1a2e",
  },
  card: {
    backgroundColor: "white",
    padding: "1rem 1.5rem",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  cardLeft: {
    display: "flex",
    flexDirection: "column",
  },
  moduleName: {
    margin: 0,
    color: "#1a1a2e",
    fontSize: "15px",
  },
  date: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#888",
  },
  badge: {
    backgroundColor: "#e6f4ea",
    color: "#2e7d32",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: "3rem",
  },
};

export default StudentDashboard;