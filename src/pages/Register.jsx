import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { studentRegister, getSchools, getDepartments, getPrograms } from "../services/api";

function Register() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registration_number, setRegistrationNumber] = useState("");

  const [schools, setSchools] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [school_id, setSchoolId] = useState("");
  const [department_id, setDepartmentId] = useState("");
  const [program_id, setProgramId] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getSchools()
      .then((res) => setSchools(res.data.schools))
      .catch((err) => console.error(err));
  }, []);

  
  useEffect(() => {
    if (!school_id) return;
    setDepartmentId("");
    setProgramId("");
    setDepartments([]);
    setPrograms([]);
    getDepartments(school_id)
      .then((res) => setDepartments(res.data.departments))
      .catch((err) => console.error(err));
  }, [school_id]);

  
  useEffect(() => {
    if (!department_id) return;
    setProgramId("");
    setPrograms([]);
    getPrograms(department_id)
      .then((res) => setPrograms(res.data.programs))
      .catch((err) => console.error(err));
  }, [department_id]);

  const handleRegister = async () => {
    setError("");

    if (!email.endsWith("@mubas.ac.mw")) {
      setError("You must use your university email (@mubas.ac.mw)");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!program_id) {
      setError("Please select your program.");
      return;
    }

    setLoading(true);

    try {
      await studentRegister({
        first_name,
        last_name,
        email,
        password,
        registration_number,
        program_id: parseInt(program_id),
      });

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Register with your university email
        </p>

        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm text-center mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4">
            {error}
          </div>
        )}

        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
          type="text"
          placeholder="First name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
          type="text"
          placeholder="Last name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
          type="text"
          placeholder="Registration number (e.g. BIS/23/SS/024)"
          value={registration_number}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
          type="email"
          placeholder="University email (@mubas.ac.mw)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900 bg-white"
          value={school_id}
          onChange={(e) => setSchoolId(e.target.value)}
        >
          <option value="">Select your school</option>
          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>

        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900 bg-white"
          value={department_id}
          onChange={(e) => setDepartmentId(e.target.value)}
          disabled={!school_id}
        >
          <option value="">Select your department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-6 focus:outline-none focus:border-gray-900 bg-white"
          value={program_id}
          onChange={(e) => setProgramId(e.target.value)}
          disabled={!department_id}
        >
          <option value="">Select your program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>

        <button
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold text-base hover:bg-gray-700 transition-all disabled:opacity-50"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-gray-900 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;