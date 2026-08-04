import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import QRScanner from "../components/QrScanner";
import { getStudentModules } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function StudentDashboard() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();
  const { mode } = useTheme();

  const fetchModules = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStudentModules();
      setModules(res.data.modules);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      fetchModules();
    }, 0);
    return () => clearTimeout(id);
  }, [fetchModules]);

  return (
    <div
      className={`min-h-screen ${mode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-800"}`}
    >
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Modules</h2>
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-700 transition-all"
            onClick={() => setShowScanner(!showScanner)}
          >
            {showScanner ? "Hide Scanner" : "Scan QR Code"}
          </button>
        </div>

        {showScanner && (
          <div
            className={`rounded-2xl shadow-sm p-6 mb-6 ${mode ? "bg-gray-800" : "bg-gray-100"}`}
          >
            <QRScanner onSuccess={fetchModules} />
          </div>
        )}

        <div
          className={` rounded-2xl shadow-sm p-6 ${mode ? "bg-gray-800" : "bg-gray-400"}`}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Attendance by Module
          </h3>

          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading...</p>
          ) : modules.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No modules found.</p>
          ) : (
            <div className="space-y-3">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`flex flex-col justify-between items-start gap-2 p-2 rounded-xl cursor-pointer transition-all md:flex-row ${mode ? "bg-gray-700 text-gray-200 hover:bg-gray-50 text-gray-800" : "bg-gray-100 hover:bg-gray-300 text-gray-800"}`}
                  onClick={() => navigate(`/student/modules/${module.id}`)}
                >
                  <div>
                    <p className="font-semibold">{module.module_name}</p>
                    {module.total_sessions < 2 ? (
                      <p>{module.total_sessions} session</p>
                    ) : (
                      <p>{module.total_sessions} sessions</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {module.total_present} present
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      {module.total_absent} absent
                    </span>
                  </div>
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
