import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Mail, User, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import Success from "../componenets/elements/Success";
import Error from "../componenets/elements/Error";
import ReCAPTCHA from "react-google-recaptcha";

export default function Signup({ toggleModel, getDetails }) {
  const [sponsorFound, setSponsorFound] = useState(false);
  const [foundUser, setFoundUser] = useState("");
  const [otpResponse, setOtpResponse] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showErr, setShowErr] = useState(false);
  // const [captchaToken, setCaptchaToken] = useState(null);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState({
    sponsor_id: "",
    name: "",
    email: "",
    phone_no: "",
    country_code: "+1",
    position: "",
  });

  const [showSendOtp, setShowSendOtp] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [checked, setChecked] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const baseurl = useSelector((state) => state.auth.baseurl);
  const userData = useSelector((state) => state.auth.userData);

  const { sponsorId, parentId, position, disable } = useParams();
  const isDisabled = disable === "true";
  const SITE_KEY = "6LfQFpgrAAAAAECzVZ71oo5Cy0vuoDL3Za7CJAM7";
  useEffect(() => {
    if (sponsorId && position) {
      setFormData((prev) => ({
        ...prev,
        sponsor_id: sponsorId,
        position: position.toLowerCase() === "left" ? "L" : "R",
      }));
    }
  }, [sponsorId, position]);

  useEffect(() => {
    if (formData.sponsor_id.trim() === "") return;
    setFoundUser(false);
    const delayDebounce = setTimeout(() => {
      fetchUsername(formData.sponsor_id);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [formData.sponsor_id]);

  const fetchUsername = async () => {
    const response = await axios.post(`${baseurl}/api/checkUsername`, {
      username: formData.sponsor_id,
    });
    if (response.data.status == 200) {
      setSponsorFound(true);
      setFoundUser(response.data.user.first_name);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setShowSendOtp(value.trim() !== "");
      setShowOtpInput(false);
      setOtpResponse("");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (token) => {
    setShowSuccess(true);
    setMsg("Captcha Successful!");
    setTimeout(() => {
      setShowSuccess(false);
    }, 1800);
    setCaptchaValue(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitted(true);
      const endpoint = `${baseurl}/api/${
        isDisabled ? "registration" : "registration_simple"
      }`;
      const payload = isDisabled
        ? { ...formData, parent_id: parentId }
        : formData;
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      getDetails({
        username: response.data.user.username,
        password: response.data.user.show_password,
      });
      navigate("/signin");
      toggleModel(true);
    } catch (error) {
      console.log(error);
    }
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
      className="min-h-screen flex items-center justify-center p-3"
      style={{ backgroundColor: "#65AB43" }}
    >
      {showErr && <Error show={showErr} msg={msg} />}
      {showSuccess && <Success show={showSuccess} msg={msg} />}
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
      <div className="w-full  mt-20 max-w-md">
        <div className="text-center mb-4">
          <div className="flex gap-2 items-center justify-center mb-2">
            <div className="bg-black rounded-full">
              {" "}
              <img className="h-13" src={userData.logo} />
            </div>
            <h1 className="text-3xl font-bold text-white">EmirROI</h1>
          </div>
          <p className="text-white">Join the Future of Crypto Success</p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="px-6 pt-3 pb-4">
            <h2
              className="text-2xl font-bold text-center mb-2"
              style={{ color: "black" }}
            >
              Create Account
            </h2>
            <p className="text-center text-gray-600">
              Start your EmirROI journey today
            </p>
          </div>

          <div className="px-6 pb-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {/* Sponsor ID */}
              <div className="space-y-2">
                <label
                  htmlFor="sponsor"
                  className="text-sm font-medium flex justify-between"
                  style={{ color: "black" }}
                >
                  <div>
                    Sponsor ID<span className="text-red-500 ">*</span>
                  </div>
                  {formData.sponsor_id === "" ? (
                    <div></div>
                  ) : foundUser ? (
                    <div className="text-emerald-500">User Found</div>
                  ) : (
                    <div className="text-red-500">User Not Found</div>
                  )}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="sponsor"
                    name="sponsor_id"
                    type="text"
                    placeholder="Enter sponsor ID"
                    value={formData.sponsor_id}
                    onChange={handleInputChange}
                    className={` ${
                      isDisabled && "cursor-not-allowed"
                    } w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200`}
                    style={{
                      focusRingColor: "black",
                      "--tw-ring-color": "black",
                    }}
                    required
                    disabled={isDisabled}
                  />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium"
                  style={{ color: "black" }}
                >
                  Full Name<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200"
                    style={{
                      focusRingColor: "black",
                      "--tw-ring-color": "black",
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                  style={{ color: "black" }}
                >
                  Email Address<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="true"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${
                      otpVerified && "cursor-not-allowed"
                    } w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200`}
                    style={{
                      focusRingColor: "black",
                      "--tw-ring-color": "black",
                    }}
                    required
                    disabled={otpVerified}
                  />
                </div>

                {showSendOtp && !showOtpInput && (
                  <button
                    type="button"
                    onClick={async () => {
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(formData.email)) {
                        setShowErr(true);
                        setTimeout(() => setShowErr(false), 1800);
                        setMsg("Please enter a valid email address.");
                        return;
                      }
                      if (!formData.name.trim()) {
                        setShowErr(true);
                        setTimeout(() => setShowErr(false), 1800);
                        setMsg("Please enter your full name.");
                        return;
                      }

                      setShowOtpInput(true);
                      const response = await axios.post(
                        `${baseurl}/api/send_otp_for_registration`,
                        {
                          name: formData.name,
                          email: formData.email,
                        }
                      );
                      console.log(response.data.otp);
                      setOtpResponse(response.data.otp);
                    }}
                    className="text-sm mt-1 font-semibold text-[#65AB43] cursor-pointer hover:underline"
                  >
                    Send OTP
                  </button>
                )}

                {showOtpInput && (
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="number"
                      value={otp}
                      disabled={otpVerified}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className={`${
                        otpVerified && "cursor-not-allowed"
                      } flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200`}
                      style={{ "--tw-ring-color": "black" }}
                    />
                    <button
                      type="button"
                      disabled={otpVerified}
                      onClick={() => {
                        if (setOtpResponse) {
                          if (otpResponse === parseInt(otp)) {
                            setOtpVerified(true);
                            setShowSuccess(true);
                            setTimeout(() => {
                              setShowSuccess(false);
                            }, 1800);
                            setMsg("Otp Verfied Successful.");
                          } else {
                            setShowErr(true);
                            setTimeout(() => setShowErr(false), 1800);
                            setMsg("Wrong Otp Entered.");
                          }
                        }
                      }}
                      className={`${
                        otpVerified
                          ? "bg-[#96b984] cursor-not-allowed"
                          : "bg-[#65AB43] cursor-pointer"
                      } text-white font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-all duration-200`}
                    >
                      Verify
                    </button>
                  </div>
                )}
              </div>

              {/* {showOtpInput && (
                <div className="text-center">OTP: {otpResponse}</div>
              )} */}

              <div className="space-y-2">
                <label
                  htmlFor="phone_no"
                  className="block text-sm font-medium"
                  style={{ color: "black" }}
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <select
                    name="country_code"
                    value={formData.country_code}
                    onChange={handleInputChange}
                    className="rounded-l-md w-26 border border-gray-300 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                    style={{ "--tw-ring-color": "black" }}
                  >
                    <option value="+1">Canada (+1)</option>
                    <option value="+1">United States (+1)</option>
                    <option value="+20">Egypt (+20)</option>
                    <option value="+212">Morocco (+212)</option>
                    <option value="+213">Algeria (+213)</option>
                    <option value="+233">Ghana (+233)</option>
                    <option value="+234">Nigeria (+234)</option>
                    <option value="+249">Sudan (+249)</option>
                    <option value="+254">Kenya (+254)</option>
                    <option value="+255">
                      Tanzania, United Republic of (+255)
                    </option>
                    <option value="+256">Uganda (+256)</option>
                    <option value="+27">South Africa (+27)</option>
                    <option value="+30">Greece (+30)</option>
                    <option value="+31">Netherlands (+31)</option>
                    <option value="+32">Belgium (+32)</option>
                    <option value="+33">France (+33)</option>
                    <option value="+34">Spain (+34)</option>
                    <option value="+380">Ukraine (+380)</option>
                    <option value="+39">Italy (+39)</option>
                    <option value="+41">Switzerland (+41)</option>
                    <option value="+43">Austria (+43)</option>
                    <option value="+44">United Kingdom (+44)</option>
                    <option value="+46">Sweden (+46)</option>
                    <option value="+48">Poland (+48)</option>
                    <option value="+49">Germany (+49)</option>
                    <option value="+52">Mexico (+52)</option>
                    <option value="+54">Argentina (+54)</option>
                    <option value="+55">Brazil (+55)</option>
                    <option value="+60">Malaysia (+60)</option>
                    <option value="+61">Australia (+61)</option>
                    <option value="+62">Indonesia (+62)</option>
                    <option value="+63">Philippines (+63)</option>
                    <option value="+64">New Zealand (+64)</option>
                    <option value="+65">Singapore (+65)</option>
                    <option value="+66">Thailand (+66)</option>
                    <option value="+7">Russian Federation (+7)</option>
                    <option value="+81">Japan (+81)</option>
                    <option value="+82">Korea, Republic of (+82)</option>
                    <option value="+84">Viet Nam (+84)</option>
                    <option value="+852">Hong Kong (+852)</option>
                    <option value="+86">China (+86)</option>
                    <option value="+880">Bangladesh (+880)</option>
                    <option value="+90">Turkey (+90)</option>
                    <option value="+91">India (+91)</option>
                    <option value="+92">Pakistan (+92)</option>
                    <option value="+964">Iraq (+964)</option>
                    <option value="+966">Saudi Arabia (+966)</option>
                    <option value="+971">United Arab Emirates (+971)</option>
                    <option value="+972">Israel (+972)</option>
                    <option value="+98">Iran, Islamic Republic of (+98)</option>
                  </select>

                  <input
                    id="phone_no"
                    name="phone_no"
                    type="number"
                    placeholder="Enter your phone number"
                    value={formData.phone_no}
                    onChange={handleInputChange}
                    className="w-full rounded-r-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                    style={{ "--tw-ring-color": "black" }}
                    required
                  />
                </div>
              </div>

              {/* POSITION */}
              <div className="space-y-2">
                <label
                  className="block text-sm font-medium"
                  style={{ color: "black" }}
                >
                  Position<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-6">
                  <div className="flex items-center">
                    <input
                      id="left"
                      name="position"
                      type="radio"
                      value="L"
                      checked={formData.position === "L"}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300"
                      style={{
                        accentColor: "black",
                        "--tw-ring-color": "black",
                      }}
                      required
                      disabled={isDisabled}
                    />
                    <label
                      htmlFor="left"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Left
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="right"
                      name="position"
                      type="radio"
                      value="R"
                      checked={formData.position === "R"}
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300"
                      style={{
                        accentColor: "black",
                        "--tw-ring-color": "black",
                      }}
                      required
                      disabled={isDisabled}
                    />
                    <label
                      htmlFor="right"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Right
                    </label>
                  </div>
                </div>
              </div>

              <ReCAPTCHA
                className="self-center"
                sitekey={SITE_KEY}
                onChange={handleCaptchaChange}
              />
              <label className="label my-1 text-sm">
                <input
                  value={checked}
                  onChange={() => setChecked((prev) => !prev)}
                  type="checkbox"
                  className="checkbox border checkbox-success"
                />{" "}
                I accept the{" "}
                <span
                  onClick={() => navigate("/terms")}
                  className="text-blue-900 cursor-pointer"
                >
                  Terms
                </span>{" "}
                of Service and{" "}
                <span
                  onClick={() => navigate("/terms")}
                  className="text-blue-900 cursor-pointer"
                >
                  Privacy Policy
                </span>
                .
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                className={`w-full ${
                  sponsorFound &&
                  otpVerified &&
                  captchaValue &&
                  checked &&
                  foundUser
                    ? "bg-[#65AB43] cursor-pointer"
                    : "bg-[#96b984] cursor-not-allowed"
                } text-white relative overflow-hidden font-semibold h-10 px-4 rounded-md transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                style={{ "--tw-ring-color": "#09182C" }}
                disabled={
                  !sponsorFound &&
                  !otpVerified &&
                  !captchaValue &&
                  !checked &&
                  !foundUser
                }
              >
                {formSubmitted ? (
                  <div className="top-0 left-0 bg-black/40 z-50 h-full w-full absolute flex items-center justify-center">
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  className="font-semibold hover:underline cursor-pointer transition-all duration-200"
                  style={{ color: "black" }}
                  onClick={() => navigate("/signin")}
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-white">
            © 2025 EmirROI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
