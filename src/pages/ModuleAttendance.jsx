import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getStudentModuleAttendance } from "../services/api";

function ModuleAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStudentModuleAttendance(moduleId);
      setAttendance(res.data.attendance);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    const id = setTimeout(() => {
      fetchAttendance();
    }, 0);
    return () => clearTimeout(id);
  }, [fetchAttendance]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            className="text-gray-500 hover:text-gray-900"
            onClick={() => navigate("/student/dashboard")}
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {attendance[0]?.module_name || "Module Attendance"}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          {loading ? (
            <p className="text-gray-400 text-center py-8">Loading...</p>
          ) : attendance.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              No attendance records found.
            </p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">#</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                    <td className="px-4 py-3">
                      {new Date(record.marked_at).toLocaleDateString("en-MW", {
                        timeZone: "Africa/Blantyre",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(record.marked_at).toLocaleTimeString("en-MW", {
                        timeZone: "Africa/Blantyre",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          record.status === "absent"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {record.status === "absent" ? "Absent" : "Present"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModuleAttendance;
