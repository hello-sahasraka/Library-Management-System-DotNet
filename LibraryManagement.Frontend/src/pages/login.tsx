import { useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

interface LoginResponse {
  token: string;
  name: string;
  role: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL as string;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      //Send login request
      const response = await axios.post<LoginResponse>(`${baseURL}/api/v1/auth/login`, { email, password });

      navigate("/admin");

      //Store user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.name);
      localStorage.setItem("role", response.data.role);
      toast.success("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 relative px-3 py-6">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10">
          <Loading />
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-[650px] bg-white rounded-xl flex flex-col md:flex-row shadow-lg overflow-hidden">

        {/* Left side */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6 p-6 md:p-0 md:py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Login</h1>

          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center gap-4 w-full px-2 sm:px-6"
          >
            {/* email */}
            <div className="w-full">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-200 rounded p-2 w-full outline-none focus:ring-2 focus:ring-[#FF4169]"
              />
            </div>

            {/* password */}
            <div className="w-full relative">
              <label htmlFor="password" className="text-sm">
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-200 rounded p-2 w-full pr-10 outline-none focus:ring-2 focus:ring-[#FF4169]"
              />

              {/* toggle */}
              {showPassword ? (
                <VisibilityOutlinedIcon
                  fontSize="small"
                  className="absolute right-3 top-9 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  fontSize="small"
                  className="absolute right-3 top-9 cursor-pointer text-gray-600"
                  onClick={() => setShowPassword(true)}
                />
              )}

              <Link
                to="/create-account"
                className="block text-right text-xs text-[#FF4169] hover:underline font-semibold mt-2"
              >
                Create New Account
              </Link>
            </div>

            {/* button */}
            <button
              type="submit"
              className="bg-[#FF464D] px-8 py-2 rounded-full hover:bg-[#fd708f] transition text-gray-50 cursor-pointer font-medium w-full sm:w-auto"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 bg-linear-to-r from-[#FF464D] to-[#FF4169] text-gray-50 flex flex-col justify-center items-center p-6 text-center md:rounded-r-xl">
          <img src={Logo} alt="logo" className="h-[130px] sm:h-[175px]" />
          <h2 className="text-3xl font-bold mb-4 drop-shadow-md">Welcome Back!</h2>
          <p className="mb-4 drop-shadow-md">
            Please enter your credentials to access your account
          </p>
        </div>
      </div>
    </div>
  );
};

  export default Login;
