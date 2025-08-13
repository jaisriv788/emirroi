import Links from "../componenets/DashBoard/Links";
import DetailCards from "../componenets/DashBoard/DetailCards";
import Table from "../componenets/DashBoard/Table";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardData from "../componenets/DashBoard/DashboardData";
import BasicPurchase from "../componenets/DashBoard/BasicPurchase";
import MaximumEarning from "../componenets/DashBoard/MaximumEarning";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseurl}/api/dashboard_data`, {
        user_id,
      });
      // console.log("dashboard", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchPackages();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading || !data) {
    return (
      <div className="fixed flex justify-center items-center w-full h-full bg-black/70 backdrop-blur-sm top-0 left-0 z-50">
        <div className="loading loading-spinner text-white loading-xl"></div>
      </div>
    );
  }
  return (
    <div className="bg-white overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#65AB43] shadow-lg">
      <div className="font-semibold pb-2 mb-5 text-2xl border-b border-gray-200 ">
        Dashboard
      </div>
      <div className="flex 0 flex-col gap-10 sm:gap-16">
        <BasicPurchase />
        <DashboardData />
        <Links />
        <DetailCards
          user={data.users}
          binary={data.binary}
          wallet={data.user_wallet}
        />
        <MaximumEarning wallet={data.user_wallet} />
        <Table data={data.trans} />
      </div>
    </div>
  );
}

export default Dashboard;
