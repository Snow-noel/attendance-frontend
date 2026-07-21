import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import { startSession, endSession, getLecturerModules } from "../services/api";
import { QRCodeSVG } from "qrcode.react";
import { useTheme } from "../context/ThemeContext";

function LecturerDashboard() {
  const [moduleId, setModuleId] = useState("");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [modules, setModules] = useState("");
  const sessionRef = useRef(null);
  const { mode } = useTheme();

  const fetchLecturerModules = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLecturerModules();
      setModules(res.data.modules);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      fetchLecturerModules();
    }, 0);
    return () => {
      clearTimeout(id);
    };
  }, [fetchLecturerModules]);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (!session) return;

    const expiry = new Date(session.expires_at);
    const remaining = expiry - new Date();
    setTimeLeft(remaining);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          if (sessionRef.current) {
            endSession(sessionRef.current.id)
              .then((response) => {
                alert(
                  `Session ended!\nPresent: ${response.data.totalPresent}\nAbsent: ${response.data.totalAbsent}`,
                );
              })
              .catch((err) => console.error(err))
              .finally(() => {
                setSession(null);
                setModuleId("");
                setTimeLeft(null);
                sessionRef.current = null;
              });
          }
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  const handleStartSession = async () => {
    if (!moduleId) {
      setError("Please enter a module ID.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await startSession({ module_id: parseInt(moduleId) });
      setSession(response.data.session);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to start session.");
    } finally {
      setLoading(false);
    }
  };

  const handleEndSession = async () => {
    const sessionId = sessionRef.current?.id;
    if (!sessionId) return;
    try {
      const response = await endSession(sessionId);
      alert(
        `Session ended!\nPresent: ${response.data.totalPresent}\nAbsent: ${response.data.totalAbsent}`,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSession(null);
      setModuleId("");
      setTimeLeft(null);
      sessionRef.current = null;
    }
  };

  return (
    <div
      className={`min-h-screen ${mode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"}`}
    >
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Lecturer Dashboard</h2>

        {!session ? (
          <div
            className={`${mode ? "bg-gray-800" : "bg-white"} rounded-2xl shadow-sm p-6`}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Start a Class Session
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Enter your module ID to generate a QR code for students to scan
            </p>

            {error && (
              <p
                className={`${mode ? "text-red-600 bg-red-100" : "text-red-600 bg-red-100"} text-sm p-3 rounded-lg mb-4`}
              >
                {error}
              </p>
            )}

            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
              type="number"
              placeholder="Module ID (e.g. 1)"
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
            />

            <button
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-700 transition-all disabled:opacity-50"
              onClick={handleStartSession}
              disabled={loading}
            >
              {loading ? "Starting..." : "Start Session & Generate QR"}
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Session Active
              </h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Live
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Students scan this QR code to mark attendance
            </p>

            <div className="flex justify-center py-4">
              <div className="p-4 border-2 border-gray-200 rounded-2xl">
                <QRCodeSVG value={session.session_code} size={200} />
              </div>
            </div>

            <div className="text-center my-4">
              <p className="text-gray-800 font-semibold text-lg">
                {session.session_code}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Expires at{" "}
                {new Date(session.expires_at).toLocaleTimeString("en-MW", {
                  timeZone: "Africa/Blantyre",
                })}
              </p>

              <div
                className={`text-4xl font-bold mt-3 ${timeLeft <= 60000 ? "text-red-600" : "text-gray-800"}`}
              >
                {timeLeft !== null && (
                  <>
                    {String(Math.floor(timeLeft / 60000)).padStart(2, "0")}:
                    {String(Math.floor((timeLeft % 60000) / 1000)).padStart(
                      2,
                      "0",
                    )}
                  </>
                )}
              </div>
              <p className="text-gray-400 text-xs mt-1">Time remaining</p>
            </div>

            <button
              className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all"
              onClick={handleEndSession}
            >
              End Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LecturerDashboard;
