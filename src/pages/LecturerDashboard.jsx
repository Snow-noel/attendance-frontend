import { useState } from "react";
import Navbar from "../components/Navbar";
import { startSession } from "../services/api";
import { QRCodeSVG } from "qrcode.react";

function LecturerDashboard() {
  const [moduleId, setModuleId] = useState("");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleEndSession = () => {
    setSession(null);
    setModuleId("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Lecturer Dashboard
        </h2>

        {!session ? (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Start a Class Session
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Enter your module ID to generate a QR code for students to scan
            </p>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg mb-4">
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