import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "./supabase-client";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginInput = username.trim();
      let signInOptions = {};

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput);
      const isPhone = /^[0-9]{10}$/.test(loginInput);

      if (isEmail) {
        signInOptions = { email: loginInput, password };
      } else if (isPhone) {
        signInOptions = { phone: loginInput, password };
      } else {
        // Query profile by username to get email or phone
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("email, phone")
          .eq("username", loginInput)
          .single();

        if (profileError || !profile) {
          throw new Error("Invalid login credentials.");
        }

        if (profile.email) {
          signInOptions = { email: profile.email, password };
        } else if (profile.phone) {
          signInOptions = { phone: profile.phone, password };
        } else {
          throw new Error("Invalid login credentials.");
        }
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword(signInOptions);

      if (signInError) {
        throw signInError;
      }

      const metadata = data.user?.user_metadata ?? {};
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, username, email, phone, address, dob")
        .eq("id", data.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      const userProfile = {
        id: data.user?.id,
        name: profileData?.name ?? metadata.name ?? "",
        username: profileData?.username ?? metadata.username ?? "",
        email: profileData?.email ?? data.user?.email ?? username.trim(),
        phone: profileData?.phone ?? metadata.phone ?? "",
        address: profileData?.address ?? metadata.address ?? "",
        dob: profileData?.dob ?? metadata.dob ?? "",
      };

      localStorage.setItem("user", JSON.stringify(userProfile));
      navigate("/landing-page");
    } catch (loginError) {
      setError(loginError.message || "Invalid login credentials.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#004777] to-[#A30000] flex items-center justify-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute w-96 h-96 bg-[#FF7700] opacity-10 rounded-full -top-48 -right-48"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#FF7700] opacity-5 rounded-full -bottom-64 -left-64"></div>
      <div className="absolute w-64 h-64 bg-white opacity-5 rounded-full top-1/2 left-1/4"></div>
      
      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 mx-4 animate-slideUp relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#004777] mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue to your account
          </p>
          <div className="w-16 h-1 bg-[#FF7700] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="block text-[#004777] font-semibold text-sm uppercase tracking-wide"
            >
              Email, Phone, or Username
            </label>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF7700] text-sm" />
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                required
                placeholder="Enter email, phone number, or username"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF7700] focus:outline-none focus:ring-4 focus:ring-[#FF7700]/10 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label 
              htmlFor="password" 
              className="block text-[#004777] font-semibold text-sm uppercase tracking-wide"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FF7700] text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF7700] focus:outline-none focus:ring-4 focus:ring-[#FF7700]/10 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#A30000] hover:text-[#FF7700] transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a 
              href="/forgot-password" 
              className="text-sm text-[#FF7700] hover:text-[#A30000] transition-colors duration-300 font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-[#A30000] p-4 rounded-lg animate-shake">
              <p className="text-[#A30000] text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#FF7700] to-[#A30000] text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-[#FF7700]/30 transform hover:-translate-y-0.5 transition-all duration-300 text-lg uppercase tracking-wide"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-[#FF7700] hover:text-[#A30000] font-semibold transition-colors duration-300"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Login;
