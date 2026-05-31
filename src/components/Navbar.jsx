import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
<nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-lg font-bold">Attendance System</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">{user?.first_name} {user?.last_name}</span>
        <button
          className="px-4 py-1.5 border border-white rounded-lg text-sm hover:bg-white hover:text-gray-900 transition-all"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;