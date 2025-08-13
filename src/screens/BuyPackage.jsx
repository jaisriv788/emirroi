import axios from "axios";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BuyModel from "../componenets/buypackage/BuyModel";
import tokenAbi from "../abis/token.json";

function BuyPackage() {
  const [packageData, setPackageData] = useState([]);
  const [dataloaded, setDataLoaded] = useState(false);
  const [balance, setBalance] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const colors = {
    Silver: "bg-[#999999] text-white",
    Gold: "bg-[#B8860B] text-white",
    Platinum: "bg-[#8E8E93] text-white",
    Diamond: "bg-[#5DADE2] text-white",
    "Emir Diamond": "bg-[#4B0000] text-white",
  };

  const txtColors = {
    Silver: "#999999",
    Gold: "#B8860B",
    Platinum: "#8E8E93",
    Diamond: "#5DADE2",
    "Emir Diamond": "#4B0000",
  };

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  const fetchPackages = async () => {
    try {
      const response = await axios.post(`${baseurl}/api/all_packages`, {
        user_id,
      });
      setPackageData(response.data.data);
      setDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchPackages();
    return () => controller.abort();
  }, []);

  function closeModel(reload = false) {
    setShowModel(false);
    if (reload) fetchPackages();
  }

  const handleModel = async (item) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });

        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const walletAddress = accounts[0];

        const tokenContract = new web3.eth.Contract(
          tokenAbi,
          "0x55d398326f99059fF775485246999027B3197955"
        );

        const rawBalance = await tokenContract.methods
          .balanceOf(walletAddress)
          .call();

        const decimals = await tokenContract.methods.decimals().call();
        const formattedBalance = (
          Number(rawBalance) / Math.pow(10, Number(decimals))
        ).toFixed(2);

        setBalance(formattedBalance);
        setSelectedPackage(item);
        setShowModel(true);
      } catch (error) {
        console.error("MetaMask Error:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div
      className="overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#09182C] shadow-lg"
      style={{ backgroundColor: "#ffffff", fontFamily: "Segoe UI, sans-serif" }}
    >
      {showModel && (
        <BuyModel
          metmaskBalance={balance}
          packageData={selectedPackage}
          closeModel={(reload) => closeModel(reload)}
        />
      )}

      <div
        className="font-semibold mb-6 text-2xl border-b border-gray-200 pb-2"
        style={{ color: "#65AB43" }}
      >
        BuyPackage
      </div>

      <div className="flex flex-wrap justify-evenly gap-5">
        {!dataloaded
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden shadow-md w-[200px] sm:w-[240px] md:w-[280px] max-w-[384px] border border-gray-200"
                style={{ backgroundColor: "#f5f5f5" }}
              >
                <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-400 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-gray-400 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-400 rounded w-full animate-pulse"></div>
                  <div className="h-10 bg-gray-400 rounded w-full animate-pulse"></div>
                </div>
              </div>
            ))
          : packageData.map((item, index) => (
              <div
                key={index}
                className={` ${
                  item.status == 0
                    ? "bg-[#585b5e] text-white"
                    : colors[item.title]
                } `}
                style={{
                  borderRadius: "16px",
                  padding: "16px",
                  width: "280px",
                  maxWidth: "384px",
                  margin: "16px auto",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 6px 18px rgba(0, 0, 0, 0.6)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(0, 0, 0, 0.4)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={`packages/${item.image}`}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    marginBottom: "16px",
                  }}
                />

                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    lineHeight: "1.4",
                  }}
                >
                  {item.title}
                </h2>

                <div style={{ marginBottom: "8px" }}>
                  <strong>Price:</strong> ${item.price}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>ROI (Monthly):</strong> {item.per_month_roi}%
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <strong>Referral Bonus:</strong> {item.referral_bonus}%
                </div>

                <button
                  onClick={() => handleModel(item)}
                  disabled={item.status == 0}
                  className={`${
                    item.status == 0
                      ? "bg-white/60 cursor-not-allowed"
                      : "bg-white cursor-pointer "
                  }`}
                  style={{
                    width: "100%",
                    color: txtColors[item.title],
                    padding: "10px",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    transition: "opacity 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                  onMouseOut={(e) => (e.target.style.opacity = "1")}
                >
                  Buy Now
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BuyPackage;
