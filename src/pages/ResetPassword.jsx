import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/api";
import { Eye, EyeOff } from "lucide-react";
import backGroundImg from "../assets/images/attendance.jpg";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      if (newPassword !== confirmPassword) {
        setError("password do not match");
        return;
      }
      await resetPassword({ newPassword, token });
      setSuccess(true);
      setTimeout(() => {
        navigate(`http://localhost:5173/reset/password?token=${token}`);
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "error while reseting the password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center w-full rounded-lg flex justify-center items-center p-4"
      style={{ backgroundImage: `url(${backGroundImg})` }}
    >
      <div className="w-full max-w-md bg-gray-500 rounded-lg flex flex-col gap-2 items-center p-8 shadow-md ">
        <h2 className="text-2xl font-bold text-center text-gray-100">
          Make a New password that you will remember
        </h2>
        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm text-center mb-4">
            Password changes successifully. Make sure you dont share with anyone
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4">
            {error}
          </div>
        )}
        <div className="w-full relative mb-1">
          <input
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-900 bg-transparent"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder="New Password"
          />
          <button
            className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20}></Eye> : <EyeOff size={20}></EyeOff>}
          </button>
        </div>

        <div className="w-full relative mb-1">
          <input
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-900 bg-transparent"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Retype New Password"
          />
          <button
            className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20}></Eye> : <EyeOff size={20}></EyeOff>}
          </button>
        </div>
        <button
          className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all disabled:opacity-50"
          type="button"
          disabled={loading}
          onClick={() => {
            handleChangePassword;
            setNewPassword("");
            setConfirmPassword("");
          }}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </div>
  );
}
