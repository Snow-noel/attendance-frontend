import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { markAttendance } from "../services/api";
import { useTheme } from "../context/ThemeContext";
function QRScanner({ onSuccess }) {
  const { mode } = useTheme();
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
          if (onSuccess) {
            onSuccess();
          }
        } catch (err) {
          setError(err.response?.data?.message || "Failed to mark attendance.");
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
      },
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div
      className={`p-1.5 rounded-lg shadow-md mt-1.5 ${mode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <h3>Scan QR Code</h3>
      <p>Point your camera at the lecturer's QR code</p>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}

      {!success && <div id="qr-reader"></div>}
    </div>
  );
}

export default QRScanner;
