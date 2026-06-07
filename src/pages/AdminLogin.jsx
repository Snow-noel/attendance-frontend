import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { adminLogin } from "../services/api";

function AdminLogin() {
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
      const response = await adminLogin({ email, password });
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

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "invalid password or email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          Admin Portal
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Restricted access — authorized personnel only
        </p>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg mb-4">
            {error}
          </p>
        )}

        <input
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
          type="email"
          placeholder="Admin email"
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
      </div>
    </div>
  );
}

export default AdminLogin;
