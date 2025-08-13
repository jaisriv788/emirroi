import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../features/auth/authSlice";
import Error from "../componenets/elements/Error";
import axios from "axios";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [otpVerfication, setOtpVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [msg, setMsg] = useState("");
  const [signinClicked, setSigninClicked] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseurl = useSelector((state) => state.auth.baseurl);
  const userData = useSelector((state) => state.auth.userData);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp == otpValue) {
      const response = await axios.post(`${baseurl}/api/login_with_otp`, {
        username,
        otp,
      });
      // console.log({ otp: response.data });
      if (response.data.status == 200) {
        if (response.data.user.is_block.toLowerCase() == "yes") {
          setMsg("Your Account is Blocked. Contact Admin");
          setOtpVerification(false);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
          return;
        }
        const data = {
          username,
          id: response.data.user.id,
          sponsorId: response.data.user.sponsor_id,
          accountStatus: response.data.user.status,
          name: response.data.user.first_name,
          email: response.data.user.email,
          activePackage: response.data.user.package_id,
          wallet_address: response.data.user.wallet_address,
          registrationData: response.data.user.created_at,
          is_kyc: response.data.user.is_kyc,
        };
        dispatch(signin(data));
        sessionStorage.setItem("isSignedIn", true);
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        setMsg("Something went wrong.");
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    } else {
      setMsg("Invalid OTP");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigninClicked(true);
    const response = await axios.post(`${baseurl}/api/login`, {
      username,
      password,
    });

    // console.log("ites me:", response.data);
    if (response.data.status == 200) {
      if (response.data.action == "login") {
        if (response.data.status == 200) {
          if (response.data.user.is_block.toLowerCase() == "yes") {
            setMsg("Your Account is Blocked. Contact Admin");
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
              setSigninClicked(false);
            }, 3000);
            return;
          }
          const data = {
            username,
            id: response.data.user.id,
            sponsorId: response.data.user.sponsor_id,
            accountStatus: response.data.user.status,
            name: response.data.user.first_name,
            email: response.data.user.email,
            activePackage: response.data.user.package_id,
            wallet_address: response.data.user.wallet_address,
            registrationData: response.data.user.created_at,
            is_kyc: response.data.user.is_kyc,
          };
          dispatch(signin(data));
          sessionStorage.setItem("isSignedIn", true);
          sessionStorage.setItem("user", JSON.stringify(data));
          navigate("/dashboard");
        } else {
          setMsg("Invalid Credentials.");
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            setSigninClicked(false);
          }, 3000);
        }
      } else {
        if (response.status == 200) {
          setOtpVerification(true);
          setOtpValue(response.data.otp);
        } else {
          setMsg("Invalid Credentials.");
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
            setSigninClicked(false);
          }, 3000);
        }
      }
    } else {
      setMsg("Invalid Credentials.");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setSigninClicked(false);
      }, 3000);
    }
    setSigninClicked(false);
  };

  if (!userData || !userData.legal_template) {
    return (
      <section className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading terms and conditions...</p>
      </section>
    );
  }

  return (
    <div
      className="min-h-screen over flex items-center justify-center p-4"
      style={{ backgroundColor: "#65AB43" }}
    >
      {showError && <Error show={showError} msg={msg} />}
      {otpVerfication && (
        <div
          onClick={() => setOtpVerification(false)}
          className="absolute z-50 bg-black/70 h-full w-full flex justify-center items-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="px-6 pt-6 pb-4">
              <h2
                className="text-2xl font-bold text-center mb-2"
                style={{ color: "black" }}
              >
                OTP Verification
              </h2>
            </div>

            <div className="px-6 pb-6">
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium"
                    style={{ color: "black" }}
                  >
                    OTP
                  </label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="otp"
                      type="number"
                      placeholder="Enter your OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                      style={{
                        focusRingColor: "#09182C",
                        "--tw-ring-color": "#09182C",
                      }}
                      required
                    />
                  </div>
                </div>
                {/* <div className="text-center">OTP : {otpValue}</div> */}

                <button
                  type="submit"
                  className="w-full cursor-pointer text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    backgroundColor: "#65AB43",
                    "--tw-ring-color": "black",
                  }}
                >
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <nav className="bg-white w-full shadow-sm border-b border-gray-100 absolute top-0 z-50 animate-slide-down-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex gap-2 items-center cursor-pointer animate-fade-in-slide-left"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-black rounded-full">
                {" "}
                <img className="h-13" src={userData.logo} />
              </div>
              <span className="text-2xl font-bold" style={{ color: "#65AB43" }}>
                EmirROI
              </span>
            </div>
            <div
              onClick={() => navigate("/")}
              className="border-2 flex items-center gap-2 hover:bg-[#65AB43] hover:text-white transition ease-in-out duration-300 cursor-pointer border-[#65AB43] rounded-md px-2 py-1 text-[#65AB43]"
            >
              Home
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full mt-20 max-w-md">
        <div className="text-center mb-8">
          <div className="flex gap-2 items-center justify-center mb-4">
            <div className="bg-black rounded-full">
              {" "}
              <img className="h-13" src={userData.logo} />
            </div>
            <h1 className="text-3xl font-bold text-white">EmirROI</h1>
          </div>
          <p className="text-white">Your Gateway to Crypto Success</p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="px-6 pt-6 pb-4">
            <h2
              className="text-2xl font-bold text-center mb-2"
              style={{ color: "black" }}
            >
              Welcome Back
            </h2>
            <p className="text-center text-gray-600">
              Sign in to your EmirROI account
            </p>
          </div>

          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium"
                  style={{ color: "black" }}
                >
                  Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="username"
                    type="Text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                    style={{
                      focusRingColor: "#09182C",
                      "--tw-ring-color": "#09182C",
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                  style={{ color: "black" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                    style={{
                      focusRingColor: "#09182C",
                      "--tw-ring-color": "#09182C",
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={signinClicked}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-white font-semibold py-3 px-4 rounded-md transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: "#65AB43",
                  "--tw-ring-color": "black",
                }}
              >
                {signinClicked ? "Please Wait..." : "Sign In"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  onClick={() => navigate("/signup")}
                  className="font-semibold cursor-pointer hover:underline transition-all duration-200"
                  style={{ color: "black" }}
                >
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-xs text-white">
            © 2025 EmirROI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
