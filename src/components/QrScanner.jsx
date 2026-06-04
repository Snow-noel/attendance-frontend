import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { markAttendance } from "../services/api";

function QRScanner({onSuccess}) {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      async (decodedText) => {
        scanner.clear();
        setResult(decodedText);

        try {
          await markAttendance({ session_code: decodedText });
          setSuccess("Attendance marked successfully!");
          if(onSuccess) onSuccess();
        } catch (err) {
          setError(err.response?.data?.message || "Failed to mark attendance.");
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Scan QR Code</h3>
      <p style={styles.sub}>Point your camera at the lecturer's QR code</p>

      {success && <p style={styles.success}>{success}</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!success && <div id="qr-reader" style={styles.scanner}></div>}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    marginTop: "1.5rem",
  },
  title: {
    margin: "0 0 0.5rem",
    color: "#1a1a2e",
  },
  sub: {
    color: "#888",
    fontSize: "13px",
    marginBottom: "1rem",
  },
  scanner: {
    width: "100%",
  },
  success: {
    backgroundColor: "#e6f4ea",
    color: "#2e7d32",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  error: {
    backgroundColor: "#fdecea",
    color: "#c62828",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
};

export default QRScanner;