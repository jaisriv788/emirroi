import imageSrc from "../assets/p2.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [updating2FA, setUpdating2FA] = useState(false);

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  // Fetch user data function
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseurl}/api/user_data`, {
        user_id,
      });
      const userData = response.data.data;
      setData(userData);

      if (userData.two_factor_authentication == "enable") {
        setTwoFactorEnabled(true);
      } else {
        setTwoFactorEnabled(false);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle toggle 2FA
  const handleToggle2FA = async () => {
    try {
      setUpdating2FA(true);
      const newStatus = twoFactorEnabled ? "disable" : "enable";

      const response = await axios.post(`${baseurl}/api/2fa-toggle`, {
        user_id,
        status: newStatus,
      });

      if (response.data.status) {
        // Optimistic update
        setTwoFactorEnabled(newStatus === "enable");
        // Re-fetch data for sync
      } else {
        console.error("2FA toggle failed:", response);
      }
    } catch (error) {
      console.error("Failed to toggle 2FA:", error);
    } finally {
      setUpdating2FA(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const colors = {
    0: "border-x-gray-500",
    1: "border-x-blue-700",
    2: "border-x-emerald-700",
    3: "border-x-orange-600",
    4: "border-x-[#FFD700]",
  };
  const textClr = {
    0: "text-gray-500",
    1: "text-blue-700",
    2: "text-emerald-600",
    3: "text-orange-600",
    4: "text-white",
  };
  const bgColor = {
    0: "bg-gray-200",
    1: "bg-blue-200",
    2: "bg-emerald-200",
    3: "bg-orange-200",
    4: "bg-yellow-400",
  };

  if (loading || !data) {
    return (
      <div className="fixed flex justify-center items-center w-full h-full bg-black/70 backdrop-blur-sm top-0 left-0 z-50">
        <div className="loading loading-spinner text-white loading-xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#65AA43] shadow-lg">
      <div className="font-semibold mb-6 text-2xl border-b border-gray-200 pb-2">
        Profile
      </div>
      <div className="flex flex-col gap-5">
        <header className="mb-8">
          <div
            className={`flex bg-white ${
              colors[data.package_id]
            } items-center justify-between p-6 rounded-2xl shadow-sm border-x-4`}
          >
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={imageSrc}
                  alt="User Profile"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "#65AA43" }}
                >
                  {data.first_name}
                </h1>
                <h1
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: "#65AA43" }}
                >
                  {data.email}
                </h1>
                <h1 className="sm:hidden text-sm font-semibold text-gray-600">
                  {data.created_at.slice(0, 10).split("-").reverse().join("-")}
                </h1>
              </div>
            </div>
            <div className="hidden sm:block text-right text-sm font-semibold text-gray-600">
              {data.created_at.slice(0, 10).split("-").reverse().join("-")}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* User ID */}
          <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "#65AA43" }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-2 5v6m0 0l-2-2m2 2l2-2"
                  />
                </svg>
              </div>
              <span
                className={`text-xs px-2 py-1 ${bgColor[data.package_id]} ${
                  textClr[data.package_id]
                } rounded-full font-bold`}
              >
                ID
              </span>
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#65AA43" }}
            >
              UserId
            </h3>
            <p className="text-2xl font-bold text-[#65AB43]">{data.username}</p>
          </article>

          {/* Sponsor ID */}
          <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "#65AA43" }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span
                className={`text-xs px-2 py-1 ${bgColor[data.package_id]} ${
                  textClr[data.package_id]
                } rounded-full font-bold`}
              >
                SPONSORID
              </span>
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#65AA43" }}
            >
              Sponsor Id
            </h3>
            <div className="text-2xl font-bold text-[#65AB43]">
              {data.sponsor_id.toUpperCase()}
            </div>
          </article>

          {/* Package */}
          <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "#65AA43" }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span
                className={`text-xs px-2 py-1 ${bgColor[data.package_id]} ${
                  textClr[data.package_id]
                } rounded-full font-bold`}
              >
                PACKAGE
              </span>
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#65AA43" }}
            >
              Active Package
            </h3>
            <div className="text-2xl font-bold text-[#65AB43]">
              Package {data.package_id}
            </div>
          </article>

          {/* 2FA Toggle */}
          <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: "#65AA43" }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0-1.1.9-2 2-2s2 .9 2 2m-2 3v.01M6 10v1a6 6 0 0012 0v-1m-1 0V9a5 5 0 00-10 0v1m5 5h.01"
                  />
                </svg>
              </div>
              <span
                className={`text-xs px-2 py-1 ${bgColor[data.package_id]} ${
                  textClr[data.package_id]
                } rounded-full font-bold`}
              >
                SECURITY
              </span>
            </div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "#65AA43" }}
            >
              2-FA
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </span>
              <button
                className={`px-4 py-1 rounded-full text-sm font-semibold text-white ${
                  twoFactorEnabled ? "bg-red-500" : "bg-green-500"
                }`}
                onClick={handleToggle2FA}
                disabled={updating2FA}
              >
                {updating2FA
                  ? "Updating..."
                  : twoFactorEnabled
                  ? "Disable"
                  : "Enable"}
              </button>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}

export default Profile;
