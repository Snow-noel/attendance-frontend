import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { mode, changeMode } = useTheme();
  console.log(mode);
  const profileKey = `profileImage_${user?.email}`;
  const [imageUrl, setImageUrl] = useState(
    localStorage.getItem(`profileImage_${user?.email}`) || null,
  );
  const [openMenu, setOpenMenu] = useState(false);
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
    <div className="relative">
      <nav
        className={` px-6 py-4 flex justify-between items-center sticky top-0 z-10 ${mode ? "bg-black text-gray-400" : "bg-gray-200 text-gray-800"}`}
      >
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

        <div className="hidden md:flex items-center gap-4">
          <span
            className={`${mode ? "text-gray-400" : "text-gray-900"} text-sm`}
          >
            {user?.first_name} {user?.last_name}
          </span>
          <button
            className={`border h-9 w-9 rounded-full flex items-center justify-center ${mode ? "border-gray-600 text-gray-100" : "border-gray-800 text-gray-800"}`}
            onClick={() => {
              changeMode();
            }}
          >
            {mode ? <Sun size={20}></Sun> : <Moon size={20}></Moon>}
          </button>
          <button
            className={`px-4 py-1.5 text-sm rounded-lg border transition-all ${mode ? "hover:bg-gray-100 hover:text-gray-900 border-gray-100" : "hover:bg-gray-900 hover:text-gray-100 border-gray-800"}`}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="flex md:hidden items-center justify-center gap-4">
          <button
            className={`border h-9 w-9 rounded-full flex items-center justify-center ${mode ? "border-gray-600 text-gray-400" : "border-gray-800 text-gray-800"}`}
            onClick={() => {
              changeMode();
            }}
          >
            {mode ? <Sun size={20}></Sun> : <Moon size={20}></Moon>}
          </button>
          <button
            className="flex md:hidden"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            <Menu size={30}></Menu>
          </button>
        </div>
      </nav>
      {openMenu && (
        <div className="absolute top-2  right-0 w-1/2 bg-gray-900 rounded-sm flex md:hidden flex-col gap-2 p-4 z-10">
          <button
            className="flex md:hidden right-0 self-end mb-2 text-white px-4 py-1.5 border-white rounded-lg text-sm hover:bg-white hover:text-gray-900 transition-all"
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            <X size={25}></X>
          </button>
          <span className={`text-gray-100 text-sm`}>
            {user?.first_name} {user?.last_name}
          </span>
          <button
            className="text-white px-4 py-1.5 border border-white rounded-lg text-sm hover:bg-white transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
