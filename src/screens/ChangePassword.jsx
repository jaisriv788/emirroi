import { useState } from "react";
import { useSelector } from "react-redux";
import Success from "../componenets/elements/Success";
import Error from "../componenets/elements/Error";
import axios from "axios";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const user_id = useSelector((state) => state.auth.user.id);
  const baseurl = useSelector((state) => state.auth.baseurl);

  const updatePassword = () => {
    if (newPassword !== confirmPassword) {
      console.log("I am here");
      setMessage("New password and confirmation do not match");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1800);
      return;
    }
    setLoading(true);
    setMessage("");

    axios
      .post(`${baseurl}/api/update_password`, {
        user_id: user_id,
        old_password: oldPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 201) {
          setMessage(res.data.msg);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 1800);
        }
        if (res.data.status == 200) {
          setMessage("Password updated successfully!");
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
          }, 1800);
        }
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setMessage(error.response?.data?.msg || "Failed to update password.");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1800);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-[80vh] h-fit rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#65AB43] shadow-lg">
      {/* <div className="font-semibold flex items-center justify-center mb-6 border-b border-gray-200 pb-2">
        <div className=" text-2xl ">Change Password</div>
      </div> */}
      {showSuccess && <Success show={showSuccess} msg={message} />}
      {showError && <Error show={showError} msg={message} />}
      <div className="w-full border border-gray-100 max-w-lg mx-auto flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center font-semibold text-2xl underline">
          Change Password
        </div>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#65AB43]"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#65AB43]"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#65AB43]"
        />
      </div>
      <button
        disabled={loading}
        onClick={updatePassword}
        className="bg-[#65AB43] max-w-lg self-center mt-3 text-white w-full px-6 py-3 rounded-lg hover:bg-[#4f8e35] transition-all disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}

export default ChangePassword;
