import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";
import backGroundImg from "../assets/images/attendance.jpg";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [success]);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await forgotPassword({ email });

      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center rounded-lg w-full flex justify-center items-center p-10"
      style={{ backgroundImage: `url(${backGroundImg})` }}
    >
      <div className="flex flex-col items-center gap-2 w-full bg-gray-500 md:w-1/2 shadow-md p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-100">
          Reset Your password Here
        </h2>

        <p className="text-center text-gray-100 text-lg mb-6">
          Use your university email to reset your password.
        </p>

        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm text-center mb-4">
            Reset link sent! Check your email.
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4">
            {error}
          </div>
        )}

        <input
          className="w-full px-4 py-3 border border-gray-100 rounded-lg text-gray-100 text-sm mb-4 focus:outline-none focus:border-gray-900"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-20 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all disabled:opacity-50"
          onClick={() => {
            handleSubmit();
            setEmail("");
          }}
          disabled={loading}
        >
          Reset
        </button>
        <span
          className=" self-end text-gray-100 font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Sign in
        </span>
      </div>
    </div>
  );
}
export default ForgotPassword;
