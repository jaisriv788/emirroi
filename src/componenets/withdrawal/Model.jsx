import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

function Modal({ closeModel }) {
  const userid = useSelector((state) => state.auth.user.id);
  const baseurl = useSelector((state) => state.auth.baseurl);
  const walletAddress = useSelector((state) => state.auth.user.wallet_address);
  const kyc = useSelector((state) => state.auth.user.is_kyc);
  const [amount, setAmount] = useState("");
  const [currentBal, setCurrentBal] = useState(0);

  // fetch current balance when modal opens
  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await axios.post(
          `${baseurl}/api/user_wallet_balance`,
          null,
          {
            params: { user_id: userid },
          }
        );
        setCurrentBal(res.data.data.withdrawl_wallet ?? 0);
      } catch (err) {
        console.log(err);
      }
    }
    fetchBalance();
  }, [userid]);

  async function handleWithdraw() {
    if (!amount) {
      alert("Please enter amount");
      return;
    }

    const isSure = window.confirm("Are you sure you want to withdraw?");
    if (!isSure) return;

    try {
      await axios.post(`${baseurl}/api/withdrawRequest`, null, {
        params: {
          user_id: userid,
          amount: amount,
        },
      });
      closeModel();
      window.location.reload(); // reload page after submit
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  }

  return (
    <div
      onClick={closeModel}
      className="fixed bg-black/60 backdrop-blur-xs w-screen h-screen top-0 left-0 z-50 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white gap-3 py-3 px-5 w-[400px] sm:w-[500px] text-[#09182C] flex flex-col rounded-xl"
      >
        <div className="text-xl pb-1 border-b-1 border-gray-400 font-semibold">
          Withdrawal Now
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm sm:text-md font-semibold text-center">
            Current Balance : $ {Number(currentBal).toFixed(4)}
          </div>
          <div className="text-sm sm:text-md font-semibold text-center">
            Wallet Address :{" "}
            {walletAddress == null ? (
              <a className="text-red-500">Not Found.</a>
            ) : (
              walletAddress
            )}
          </div>

          <div>
            <label className="text-lg font-semibold">Amount</label>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="focus:outline-none border-1 border-[#09182C] rounded w-full px-3 py-1"
            />
          </div>

          {kyc == "no" && (
            <div className="text-sm text-red-600">
              <a className="font-bold"> Note:</a> KYC Incomplete.
            </div>
          )}
          {walletAddress == null && (
            <div className="text-sm text-red-600">
              <a className="font-bold"> Note:</a> Wallet Address Not Updated
              Please Update.
            </div>
          )}

          <div className="flex gap-10 justify-between mt-3 text-white">
            <button
              disabled={walletAddress == null || kyc == "no"}
              onClick={handleWithdraw}
              className={`${
                walletAddress == null ? "cursor-not-allowed" : "cursor-pointer"
              } bg-emerald-500 hover:bg-emerald-700 transition ease-in-out duration-300 rounded py-1 flex-1 disabled:opacity-50`}
            >
              Submit
            </button>
            <button
              onClick={closeModel}
              className="bg-rose-500 rounded py-1 cursor-pointer transition ease-in-out duration-300 flex-1 hover:bg-rose-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
