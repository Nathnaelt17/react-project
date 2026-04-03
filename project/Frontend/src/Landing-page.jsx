import { useEffect, useState } from "react";
import { FaRocket, FaSmile, FaCheckCircle, FaUserCircle, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase-client";

function LandingPage() {
  const navigate = useNavigate();
  const [loadError, setLoadError] = useState("");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const username = user.username || (user.name ? user.name.split(" ")[0] : "Guest");

  useEffect(() => {
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      const metadata = data.user.user_metadata ?? {};
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, name, username, email, phone, address, dob, created_at")
        .eq("id", data.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        setLoadError("Signed in, but your profile could not be loaded from Supabase.");
      }

      const profile = {
        id: data.user.id,
        name: profileData?.name ?? metadata.name ?? "",
        username: profileData?.username ?? metadata.username ?? "",
        email: profileData?.email ?? data.user.email ?? "",
        phone: profileData?.phone ?? metadata.phone ?? "",
        address: profileData?.address ?? metadata.address ?? "",
        dob: profileData?.dob ?? metadata.dob ?? "",
        created_at: profileData?.created_at ?? "",
      };

      localStorage.setItem("user", JSON.stringify(profile));
      setUser(profile);
    };

    loadUser();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#004777] to-[#A30000] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute w-96 h-96 bg-[#FF7700] opacity-10 rounded-full -top-48 -right-48"></div>
      <div className="absolute w-[600px] h-[600px] bg-[#FF7700] opacity-5 rounded-full -bottom-80 -left-80"></div>
      <div className="absolute w-80 h-80 bg-white opacity-5 rounded-full top-1/3 right-1/4"></div>
      <div className="absolute w-40 h-40 bg-[#FF7700] opacity-20 rounded-full bottom-20 right-20"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Welcome Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#FF7700] to-[#A30000] px-8 py-12 text-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                    <FaSmile className="text-4xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                      Welcome back, {username}!
                    </h1>
                    <p className="text-white/90 text-lg">
                      You have successfully signed in. Here's your profile information.
                    </p>
                  </div>
                </div>
               
              </div>
            </div>

          

            {/* Profile Header Section */}
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#004777] mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-[#FF7700] rounded-full"></div>
                Profile Information
              </h2>
              
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6">
                {loadError && (
                  <div className="mb-6 rounded-xl border border-[#A30000]/20 bg-red-50 px-4 py-3 text-sm font-medium text-[#A30000]">
                    {loadError}
                  </div>
                )}
                {/* Profile Avatar and Basic Info */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-6 border-b border-gray-200">
                  <div className="relative">
                    <div className="w-28 h-28 bg-gradient-to-br from-[#FF7700] to-[#A30000] rounded-full flex items-center justify-center shadow-lg">
                      <FaUserAlt className="text-4xl text-white" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-[#FF7700] text-white p-2 rounded-full hover:bg-[#A30000] transition-colors duration-300">
                      <FaUserCircle className="text-sm" />
                    </button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-[#004777]">{user.name || user.username}</h3>
                    <p className="text-gray-500">@{user.username}</p>
                  </div>
                  
                </div>

                {/* Detailed Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors duration-300">
                    <div className="bg-[#FF7700]/10 p-2 rounded-lg">
                      <FaUserAlt className="text-[#FF7700] text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Full Name</p>
                      <p className="text-[#004777] font-semibold text-lg">{user.name || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors duration-300">
                    <div className="bg-[#FF7700]/10 p-2 rounded-lg">
                      <FaUserCircle className="text-[#FF7700] text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Username</p>
                      <p className="text-[#004777] font-semibold text-lg">@{user.username || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors duration-300">
                    <div className="bg-[#FF7700]/10 p-2 rounded-lg">
                      <FaEnvelope className="text-[#FF7700] text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Email Address</p>
                      <p className="text-[#004777] font-semibold text-lg">{user.email || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors duration-300">
                    <div className="bg-[#FF7700]/10 p-2 rounded-lg">
                      <FaPhoneAlt className="text-[#FF7700] text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Phone Number</p>
                      <p className="text-[#004777] font-semibold text-lg">{user.phone || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors duration-300 md:col-span-2">
                    <div className="bg-[#FF7700]/10 p-2 rounded-lg">
                      <FaMapMarkerAlt className="text-[#FF7700] text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Address</p>
                      <p className="text-[#004777] font-semibold text-lg">{user.address || "Not provided"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors duration-300">
                    <div className="bg-[#FF7700]/10 p-2 rounded-lg">
                      <FaCalendarAlt className="text-[#FF7700] text-lg" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Date of Birth</p>
                      <p className="text-[#004777] font-semibold text-lg">
                        {user.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 border-b border-gray-200">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-orange-50 to-white rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-[#FF7700]/10 p-3 rounded-xl">
                  <FaRocket className="text-2xl text-[#FF7700]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Account Status</p>
                  <p className="text-2xl font-bold text-[#004777]">Active</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-red-50 to-white rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-[light green]/10 p-3 rounded-xl">
                  <FaCheckCircle className="text-2xl text-[green]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Member Since</p>
                  <p className="text-2xl font-bold text-[#004777]">
                    {user.created_at ? new Date(user.created_at).getFullYear() : "2024"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-white rounded-2xl hover:shadow-lg transition-shadow duration-300">
                <div className="bg-[#004777]/10 p-3 rounded-xl">
                  <FaCheckCircle className="text-2xl text-[#004777]" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">Profile Status</p>
                  <p className="text-2xl font-bold text-[#004777]">Complete</p>
                </div>
              </div>
            </div>

    

            {/* Footer */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">
                Copyright 2024 Your App Name. All rights reserved.
              </p>
            </div>
          </div>
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
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
