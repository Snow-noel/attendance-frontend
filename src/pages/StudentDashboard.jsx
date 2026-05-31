import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import QRScanner from "../components/QrScanner";
import { getStudentAttendance } from "../services/api";

function StudentDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Attendance</h2>
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-all"
            onClick={() => setShowScanner(!showScanner)}
          >
            {showScanner ? "Hide Scanner" : "Scan QR Code"}
          </button>
        </div>

        {/* QR Scanner */}
        {showScanner && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <QRScanner />
          </div>
        )}

        {/* Attendance Records */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Attendance Records
          </h3>

          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading...</p>
          ) : attendance.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No attendance records found.
            </p>
          ) : (
            <div className="space-y-3">
              {attendance.map((record, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {record.module_name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(record.marked_at).toLocaleDateString("en-MW", {
                        timeZone: "Africa/Blantyre",
                      })}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Present
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;