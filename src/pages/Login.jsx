import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { studentLogin, lecturerLogin } from "../services/api";
import { Eye, EyeOff } from "lucide-react";
import logoImg from "../assets/images/logo.jpg";
import backGroundImg from "../assets/images/attendance.jpg";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response =
        role === "student"
          ? await studentLogin({ email, password })
          : await lecturerLogin({ email, password });
      const decoded = JSON.parse(atob(response.data.token.split(".")[1]));
      login(
        {
          email: decoded.email,
          role: decoded.role,
          first_name: decoded.first_name,
          last_name: decoded.last_name,
        },
        response.data.token,
      );
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
    <div
      className="min-h-screen h-full flex flex-col items-center justify-center bg-cover bg-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${backGroundImg})` }}
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between">
          <div className="flex justify-center items-center bg-sky-600 px-4 py-3 border-none rounded-t-md shadow-md">
            <p className="font-bold text-sm text-white">SIGN IN</p>
          </div>
        </div>

        <div className="bg-gray-500 p-3 rounded-b-2xl shadow-md w-full">
          <img
            className="h-30 w-30 rounded-lg mix-blend-multiply object-contain ml-auto mr-auto"
            src={logoImg}
            alt="Logo"
          />

          <div className="flex gap-2 mb-3">
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-white placeholder:text-gray-400 mb-4 focus:outline-none focus:border-gray-900"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative w-full mb-6">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-900"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none"
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold text-base hover:bg-gray-700 transition-all disabled:opacity-50"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-gray-100 text-sm mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-gray-300 font-semibold hover:underline"
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
