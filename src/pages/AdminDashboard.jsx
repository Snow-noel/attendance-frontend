import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import {
  getAdminLecturers,
  getAdminStudents,
  createLecturer,
} from "../services/api";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [lecturers, setLecturers] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const fetchLecturers = useCallback(async () => {
    try {
      const res = await getAdminLecturers();
      setLecturers(res.data.lecturers);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await getAdminStudents();
      setStudents(res.data.students);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const setTimeID = setTimeout(() => {
      fetchLecturers();
      fetchStudents();
    }, 0);
    return () => clearTimeout(setTimeID);
  }, [fetchLecturers, fetchStudents]);
  const handleCreateLecturer = async () => {
    setFormError("");
    setFormSuccess("");

    if (!firstName || !lastName || !email || !password) {
      setFormError("All fields are required.");
      return;
    }

    if (!email.endsWith("@mubas.ac.mw")) {
      setFormError("Email must be a university email (@mubas.ac.mw)");
      return;
    }

    setLoading(true);

    try {
      await createLecturer({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });
      setFormSuccess("Lecturer created successfully!");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      fetchLecturers();
    } catch (err) {
      setFormError(err.response?.data?.message || "Error creating lecturer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />

      <div className=" flex justify-center items-center flex-col h-full max-w-2xl mx-auto px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        <div className="flex justify-center gap-2 mb-5">
          {["overview", "lecturers", "students"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 rounded-lg text-sm font-semibold capitalize transition-all ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-gray-800">
                {students.length}
              </p>
              <p className="text-gray-500 text-sm mt-2">Total Students</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-gray-800">
                {lecturers.length}
              </p>
              <p className="text-gray-500 text-sm mt-2">Total Lecturers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-gray-800">49</p>
              <p className="text-gray-500 text-sm mt-2">Total Programs</p>
            </div>
          </div>
        )}

        {activeTab === "lecturers" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Create Lecturer Form */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Create New Lecturer
              </h3>

              {formError && (
                <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg mb-4">
                  {formError}
                </p>
              )}
              {formSuccess && (
                <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg mb-4">
                  {formSuccess}
                </p>
              )}

              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:border-gray-900"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:border-gray-900"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:border-gray-900"
                type="email"
                placeholder="University email (@mubas.ac.mw)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-700 transition-all disabled:opacity-50"
                onClick={handleCreateLecturer}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Lecturer"}
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                All Lecturers ({lecturers.length})
              </h3>
              <div className="space-y-3">
                {lecturers.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">
                    No lecturers found.
                  </p>
                ) : (
                  lecturers.map((lecturer) => (
                    <div
                      key={lecturer.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {lecturer.first_name[0]}
                        {lecturer.last_name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {lecturer.first_name} {lecturer.last_name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {lecturer.email}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              All Students ({students.length})
            </h3>
            <div className="space-y-3">
              {students.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  No students found.
                </p>
              ) : (
                students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {student.first_name[0]}
                        {student.last_name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {student.first_name} {student.last_name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {student.registration_number}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 text-right max-w-[150px]">
                      {student.program_name}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
