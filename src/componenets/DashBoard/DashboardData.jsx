import imageSrc from "../../assets/p2.jpg";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardData() {
  const [data, setData] = useState(null);

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  const fetchPackages = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/user_data`, {
        user_id,
      });
      setData(response.data.data);
      // console.log("dost",response.data.data);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchPackages();

    return () => {
      controller.abort();
    };
  }, []);

  const colors = {
    0: "border-x-gray-500",
    1: "border-x-blue-700",
    2: "border-x-emerald-700",
    3: "border-x-orange-600",
    4: "border-indigo-700",
    5: "border-x-[#FFD700]",
  };

  const liveClr = {
    0: "bg-gray-500",
    1: "bg-blue-700",
    2: "bg-emerald-700",
    3: "bg-orange-600",
    4: "bg-indigo-700",
    5: "bg-white",
  };

  if (!data) {
    return (
      <div className="fixed flex justify-center items-center w-full h-full bg-black/70 backdrop-blur-sm top-0 left-0 z-50">
        <div className="loading loading-spinner text-white loading-xl"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-[#09182C] rounded-2xl p-8 shadow-[10px_10px_20px_#d1d9e6,_-10px_-10px_20px_#ffffff]">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row gap-6">
          <header className="lg:w-1/2 relative mb-8 sm:mb-0 ">
            <div
              className={`flex flex-col sm:flex-row bg-white ${
                colors[data.package_id]
              } h-full p-4 gap-4 sm:gap-6 rounded-2xl shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff] border-x-4 border-[#2C3E50]`}
            >
              {/* Left: Avatar + Info */}
              <div className="flex overflow-hidden items-center gap-4 sm:gap-6">
                <div className="relative">
                  <img
                    src={imageSrc}
                    alt="User Profile"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-gray-200"
                  />
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 ${
                      liveClr[data.package_id]
                    } rounded-full border-4 border-white flex items-center justify-center`}
                  >
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#65AB43]">
                    {data.first_name}
                  </h1>
                  <p
                    className="text-sm sm:text-base font-medium text-[#65AB43] break-words sm:truncate sm:overflow-hidden sm:text-ellipsis"
                    title={data.email}
                  >
                    {data.email}
                  </p>
                  <p className="md:hidden mt-1 text-xs font-semibold text-[#6d9c56]">
                    {data.created_at
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </p>
                </div>
              </div>

              <div className="hidden absolute bottom-2 right-5 md:flex items-start justify-end flex-1">
                <span className="text-sm font-semibold text-[#6d9c56]">
                  {data.created_at.slice(0, 10).split("-").reverse().join("-")}
                </span>
              </div>
            </div>
          </header>

          <section className="lg:w-1/2 grid grid-cols-1 lg:grid-cols-1 gap-6">
            <article className="bg-white rounded-2xl p-6 shadow-[6px_6px_12px_#d1d9e6,_-6px_-6px_12px_#ffffff] transition-shadow">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm lg:text-lg font-semibold mb-2 text-[#6d9c56]">
                  UserId
                </h3>
                <p className="text-sm md:text-xl font-bold text-[#65AB43]">
                  {data.username}
                </p>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm lg:text-lg font-semibold mb-2 text-[#6d9c56]">
                  Sponsor Id
                </h3>
                <p className="text-sm md:text-xl font-bold text-[#65AB43]">
                  {data.sponsor_id.toUpperCase()}
                </p>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm lg:text-lg font-semibold mb-2 text-[#6d9c56]">
                  Active Package
                </h3>
                <p className="text-sm md:text-xl font-bold text-[#65AB43]">
                  Package {data.package_id}
                </p>
              </div>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardData;
