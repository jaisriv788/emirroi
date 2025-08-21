//common imports
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
//screen imports
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import KYC from "./screens/KYC.jsx";
import KYCStatus from "./screens/KYCStatus.jsx";
import Deposite from "./screens/Deposite";
import BuyPackage from "./screens/BuyPackage";
import PurchaseHistory from "./screens/PurchaseHistory";
import MyReferal from "./screens/MyReferals";
import Mylevels from "./screens/MyLevels";
import MyTree from "./screens/MyTree";
import ReferalBonus from "./screens/ReferralBonus";
import BinaryBonus from "./screens/BinaryBonus";
import RoiBonus from "./screens/RoiBonus";
import MileStoneBonus from "./screens/MileBonus";
import DailyPassiveBonus from "./screens/DailyPassiveBonus";
import Landing from "./screens/Landing";
import Transaction from "./screens/Transaction";
import Withdrawal from "./screens/Withdrawl";
import History from "./screens/History";
import Support from "./screens/Support";
import Faq from "./screens/Faq";
import Terms from "./screens/Terms";
import Profile from "./screens/Profile";
import ChangePassword from "./screens/ChangePassword.jsx";
//components import
import ProtectedLayout from "./componenets/common/ProtectedLayout";
// import PublicRoute from "./componenets/common/PublicRoute.jsx";
import Model from "./componenets/signup/OneTimeShowDetails/Model";
//redux imports
import { useDispatch } from "react-redux";
import { setData, signin, signout } from "./features/auth/authSlice";

function App() {
  const [showModel, setShowModel] = useState(false);
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();

  function toggleModel(val) {
    setShowModel(val);
  }

  function getDetails(val) {
    setDetails(val);
  }

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      if (e.key === "F12") e.preventDefault();
      if (
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "S"))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // console.log("running");
    const isSignedIn = sessionStorage.getItem("isSignedIn");
    const user = sessionStorage.getItem("user");
    if (isSignedIn && user) {
      const data = JSON.parse(user);
      dispatch(signin(data));
    } else {
      dispatch(signout());
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("isSignedIn");
    }
    const data = localStorage.getItem("nomaldata");
    if (data) {
      dispatch(setData(JSON.parse(data)));
    }
  }, []);

  return (
    <>
      {showModel && (
        <Model
          getDetails={getDetails}
          details={details}
          toggleModel={toggleModel}
        />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/signup"
          element={<Signup getDetails={getDetails} toggleModel={toggleModel} />}
        />
        <Route
          path="/signup/:sponsorId/:parentId/:position/:disable"
          element={<Signup getDetails={getDetails} toggleModel={toggleModel} />}
        />
        <Route path="/faq" element={<Faq />} />
        <Route path="/terms" element={<Terms />} />

        {/*These are the routes to the sidebar*/}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/deposite" element={<Deposite />} /> */}
          <Route path="/buypackage" element={<BuyPackage />} />
          <Route path="/purchasehistory" element={<PurchaseHistory />} />
          <Route path="/myreferals" element={<MyReferal />} />
          {/* <Route path="/mylevels" element={<Mylevels />} /> */}
          <Route path="/mytree" element={<MyTree />} />
          <Route path="/referalbonus" element={<ReferalBonus />} />
          <Route path="/binarybonus" element={<BinaryBonus />} />
          <Route path="/roibonus" element={<RoiBonus />} />
          <Route path="/rankbonus" element={<MileStoneBonus />} />
          {/* <Route path="/dailypassivebonus" element={<DailyPassiveBonus />} /> */}
          {/* <Route path="/dailypassivebonus" element={<DailyPassiveBonus />} /> */}
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/withdrawal" element={<Withdrawal />} />
          <Route path="/history" element={<History />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/kycstatus" element={<KYCStatus />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
