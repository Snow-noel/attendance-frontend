import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const profileKey = `profileImage_${user?.email}`;
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem(`profileImage_${user?.email}`) || null,
  );
  const fileInputRef = useRef(null);

  const handleClickButton = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImageUrl(base64);
        localStorage.setItem(profileKey, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <button
          className="bg-transparent border-none cursor-pointer p-0 rounded-full overflow-hidden w-10 h-10 shadow-md flex-shrink-0"
          onClick={handleClickButton}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.first_name?.[0] || "U"}
            </div>
          )}
        </button>
        <h1 className="text-lg font-bold">Attendance System</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-400 text-sm">
          {user?.first_name} {user?.last_name}
        </span>
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
