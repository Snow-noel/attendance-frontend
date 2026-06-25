import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loding, setLoding] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoding(true);
      await forgotPassword({ email });

      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="h-screen bg-gray-900 rounded-lg w-full flex flex-col justify-center items-center">
      <div className="w-full bg-white mx-w-md shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Reset Your password Here
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
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
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-gray-900"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-20 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all disabled:opacity-50"
          onClick={handleSubmit}
        >
          Reset
        </button>
        <span
          className="text-gray-900 font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Sign in
        </span>
      </div>
    </div>
  );
}
export default ForgotPassword;
