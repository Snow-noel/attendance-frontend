import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

function Navbar() {
  const [imageUrl, setImageUrl] = useState('./src/assets/placeholder.jpg');

  const fileInputRef = useRef(null);

  const handleClickButton = ()=>{
    fileInputRef.current.click();
  };

  const handleFileChange = (event)=>{
    const file = event.target.files[0];

    if(file){
      const localUrl = URL.createObjectURL(file);
      setImageUrl(localUrl);
    }
  };
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
<nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex direction-column items-center gap-15">
        <input className="hidden" type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*"/>

        <button class="bg-none border-none cursor-pointer p-0 rounded-full overflow-hidden w-[60px] h-[60px] shadow-md" onClick={handleClickButton}>
          <img src={imageUrl} alt="image" class="w-full h-full object-cover"/>
        </button>
      </div>
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