import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user_icon.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const NavBar = () => {
  //State for user info
  const [name, setName] = useState("Empty User");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  // Load user info from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("user");
    const storedUserRole = localStorage.getItem("role");
    if (storedUserName) {
      setName(storedUserName);
      setRole(storedUserRole || "User");
    }
  }, []);

  //Remove user data from localStorage and navigate to login page
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    navigate("/")
  }

  return (
    <nav
      className="h-16 w-full bg-linear-to-r from-[#FF464D] to-[#FF4169]
      text-gray-50 shadow-md flex items-center justify-between px-6 sm:px-12"
    >
      {/*Logo*/}
      <img src={logo} alt="Logo" className="h-[75px] sm:h-[100px] shadow-sm" />

      {/* User Info */}
      <div className="hidden sm:flex w-auto sm:w-[300px] justify-center items-center gap-2">
        <img
          src={userIcon}
          alt="User"
          className="h-8 sm:h-10 aspect-square rounded-full object-cover border-2 border-gray-200"
        />
        <span className="font-semibold text-lg sm:text-base truncate max-w-[120px] sm:max-w-none">
          {name} ({role})
        </span>
      </div>

      {/* Logout Button*/}
      <button
        className="bg-gray-50 hover:bg-gray-100 transition duration-200 
        text-[#FF4169] font-semibold py-1.5 sm:py-2 px-3 sm:px-4 
        rounded-md cursor-pointer text-sm sm:text-base"
        onClick={handleLogOut}
      >
        LogOut
      </button>
    </nav>
  );
};

export default NavBar;
