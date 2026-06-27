import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/api";
import { Eye, EyeOff } from "lucide-react";

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
        navigate("/");
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
    <div>
      <h2>Make a New password that you will remember</h2>
      {success && (
        <div>
          Password changes successifully. Make sure you dont share with anyone
        </div>
      )}
      <div>
        {error && <div>{error}</div>}
        <input
          type={showPassword ? "text" : "password"}
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          placeholder="New Password"
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <Eye size={20}></Eye> : <EyeOff size={20}></EyeOff>}
        </button>
      </div>

      <div>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Retype New Password"
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <Eye size={20}></Eye> : <EyeOff size={20}></EyeOff>}
        </button>
      </div>
      <button type="button" disabled={loading} onClick={handleChangePassword}>
        {loading ? "Changing..." : "Change Password"}
      </button>
    </div>
  );
}
