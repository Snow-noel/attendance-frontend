import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { studentLogin, lecturerLogin } from "../services/api";

function Login() {
  
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = role === "student"
        ? await studentLogin({ email, password })
        : await lecturerLogin({ email, password });
      const decoded = JSON.parse(atob(response.data.token.split(".")[1]));
      console.log("decoded:", decoded);
      login({ 
        email: decoded.email, 
        role: decoded.role, 
        first_name: decoded.first_name, 
        last_name: decoded.last_name 
      }, response.data.token);


      if (role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/lecturer/dashboard");
      }

    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Attendance System
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to continue
        </p>

        <div className="flex gap-3 mb-6">
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              role === "student"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900 border border-gray-900"
            }`}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              role === "lecturer"
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900 border border-gray-900"
            }`}
            onClick={() => setRole("lecturer")}
          >
            Lecturer
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-6 focus:outline-none focus:border-gray-900"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold text-base hover:bg-gray-700 transition-all disabled:opacity-50"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-gray-500 text-sm mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-gray-900 font-semibold hover:underline"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;