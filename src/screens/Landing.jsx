// import { useState } from "react";
// import { TrendingUp, Menu, X } from "lucide-react";
// import "../landing.css";
// import { useNavigate } from "react-router";
// import { useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { setData } from "../features/auth/authSlice";

// export default function Landing() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [dataa, setDataa] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const baseUrl = useSelector((state) => state.auth.baseurl);

//   const getData = async () => {
//     const response = await axios.get(`${baseUrl}/api/general-settings`);
//     setDataa(response.data.data);
//     dispatch(setData(response.data.data));
//     localStorage.setItem("nomaldata", JSON.stringify(response.data.data));
//     // console.log(response.data.data.welcome_template);
//     // console.log({terms: response.data.data.legal_template.split("\r\n")});
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const smoothScroll = (elementId) => {
//     const element = document.getElementById(elementId);
//     if (element) {
//       element.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//     setIsMenuOpen(false);
//   };

//   // MLM Network Animation Component
//   const NetworkAnimation = () => {
//     const nodes = [
//       { id: 1, x: 50, y: 20, delay: 0 },
//       { id: 2, x: 25, y: 40, delay: 0.5 },
//       { id: 3, x: 75, y: 40, delay: 0.5 },
//       { id: 4, x: 15, y: 60, delay: 1 },
//       { id: 5, x: 35, y: 60, delay: 1 },
//       { id: 6, x: 65, y: 60, delay: 1 },
//       { id: 7, x: 85, y: 60, delay: 1 },
//       { id: 8, x: 10, y: 80, delay: 1.5 },
//       { id: 9, x: 20, y: 80, delay: 1.5 },
//       { id: 10, x: 30, y: 80, delay: 1.5 },
//       { id: 11, x: 40, y: 80, delay: 1.5 },
//       { id: 12, x: 60, y: 80, delay: 1.5 },
//       { id: 13, x: 70, y: 80, delay: 1.5 },
//       { id: 14, x: 80, y: 80, delay: 1.5 },
//       { id: 15, x: 90, y: 80, delay: 1.5 },
//     ];
//     const connections = [
//       { from: 1, to: 2 },
//       { from: 1, to: 3 },
//       { from: 2, to: 4 },
//       { from: 2, to: 5 },
//       { from: 3, to: 6 },
//       { from: 3, to: 7 },
//       { from: 4, to: 8 },
//       { from: 4, to: 9 },
//       { from: 5, to: 10 },
//       { from: 5, to: 11 },
//       { from: 6, to: 12 },
//       { from: 6, to: 13 },
//       { from: 7, to: 14 },
//       { from: 7, to: 15 },
//     ];

//     if (!dataa) {
//       return null;
//     }
//     return (
//       <div className="absolute inset-0 overflow-hidden opacity-10">
//         <svg
//           className="w-full h-full"
//           viewBox="0 0 100 100"
//           preserveAspectRatio="xMidYMid slice"
//         >
//           {/* Connections */}
//           {connections.map((conn, index) => {
//             const fromNode = nodes.find((n) => n.id === conn.from);
//             const toNode = nodes.find((n) => n.id === conn.to);
//             const delay = Math.max(fromNode.delay, toNode.delay) + 0.5;
//             return (
//               <line
//                 key={`conn-${index}`}
//                 x1={fromNode.x}
//                 y1={fromNode.y}
//                 x2={toNode.x}
//                 y2={toNode.y}
//                 stroke="#65AB43"
//                 strokeWidth="0.2"
//                 className="network-line"
//                 style={{ animationDelay: `${delay}s` }}
//               />
//             );
//           })}
//           {/* Nodes */}
//           {nodes.map((node) => (
//             <circle
//               key={node.id}
//               cx={node.x}
//               cy={node.y}
//               r="0.8"
//               fill="#65AB43"
//               className="network-node"
//               style={{ animationDelay: `${node.delay}s` }}
//             />
//           ))}
//         </svg>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navbar */}
//       <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 animate-slide-down-nav">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div
//               className="flex gap-2 items-center cursor-pointer animate-fade-in-slide-left"
//               style={{ animationDelay: "0.2s" }}
//             >
//               <div className="bg-black rounded-full">
//                 {" "}
//                 <img className="h-13" src={dataa.logo} />
//               </div>

//               <span className="text-2xl font-bold" style={{ color: "#65AB43" }}>
//                 {dataa.web_title}
//               </span>
//             </div>
//             {/* Desktop Navigation */}
//             <div
//               className="hidden md:flex items-center space-x-8 animate-fade-in-slide-right"
//               style={{ animationDelay: "0.4s" }}
//             >
//               <button
//                 onClick={() => smoothScroll("hero")}
//                 className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => smoothScroll("testimonials")}
//                 className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
//               >
//                 Testimonials
//               </button>
//               <button
//                 onClick={() => navigate("/faq")}
//                 className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
//               >
//                 FAQ
//               </button>
//               {/* <button
//                 onClick={() => navigate("/terms")}
//                 className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
//               >
//                 Terms
//               </button> */}
//               <a
//                 onClick={() => navigate("/signin")}
//                 className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
//               >
//                 Login
//               </a>
//               <a
//                 onClick={() => navigate("/signup")}
//                 className="px-4 py-2 cursor-pointer rounded-lg text-white transition-all hover:shadow-lg transform hover:scale-105"
//                 style={{ backgroundColor: "#65AB43" }}
//               >
//                 Sign Up
//               </a>
//             </div>
//             {/* Mobile menu button */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="text-gray-700 hover:text-gray-900"
//               >
//                 {isMenuOpen ? (
//                   <X className="h-6 w-6" />
//                 ) : (
//                   <Menu className="h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//           {/* Mobile Navigation */}
//           <div
//             className={`md:hidden border-t border-gray-100 overflow-hidden ${
//               isMenuOpen ? "mobile-menu-open" : "mobile-menu-closed"
//             }`}
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <button
//                 onClick={() => smoothScroll("hero")}
//                 className="cursor-pointer block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
//               >
//                 Home
//               </button>
//               <button
//                 onClick={() => smoothScroll("testimonials")}
//                 className="cursor-pointer block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
//               >
//                 Testimonials
//               </button>
//               <button
//                 onClick={() => navigate("/faq")}
//                 className="cursor-pointer block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
//               >
//                 FAQ
//               </button>
//               <button
//                 onClick={() => navigate("/terms")}
//                 className="cursor-pointer block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
//               >
//                 Terms
//               </button>
//               <a
//                 onClick={() => navigate("/signin")}
//                 className="cursor-pointer block px-3 py-2 text-gray-700 hover:text-gray-900"
//               >
//                 Login
//               </a>
//               <a
//                 onClick={() => navigate("/signup")}
//                 className="cursor-pointer block px-3 py-2 mx-3 mt-2 rounded-lg text-white text-center"
//                 style={{ backgroundColor: "#65AB43" }}
//               >
//                 Sign Up
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>
//       {/* Hero Section */}
//       <section
//         id="hero"
//         className="min-h-screen flex items-center relative overflow-hidden"
//         style={{
//           background:
//             "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fdf6 50%, #ecfdf5 75%, #f0fdf4 100%)",
//         }}
//       >
//         {/* Animated Network Background */}
//         <NetworkAnimation />
//         {/* Floating Particles */}
//         <div className="absolute inset-0">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 rounded-full opacity-20 particle"
//               style={{
//                 backgroundColor: "#65AB43",
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 2}s`,
//                 animationDuration: `${3 + Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="flex justify-center mb-8 animate-fade-in-scale">
//               <div className="bg-black rounded-full">
//                 {" "}
//                 <img className="h-35" src={dataa.logo} />
//               </div>
//             </div>
//             <h1
//               className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-slide-up"
//               style={{ animationDelay: "0.3s" }}
//             >
//               Build Your{" "}
//               <span style={{ color: "#65AB43" }}>Financial Empire</span>
//               <br />
//               with <span style={{ color: "#65AB43" }}>{dataa.web_title}</span>
//             </h1>
//             <p
//               className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-fade-in-slide-up"
//               style={{ animationDelay: "0.0.4s" }}
//             >
//               Join thousands of successful entrepreneurs earning passive income
//               through our proven MLM system. Build your network, grow your team,
//               and achieve the financial freedom you deserve.
//             </p>
//           </div>
//         </div>
//       </section>
//       {/* Features Section */}
//       <section className="py-20" style={{ backgroundColor: "#f8fdf6" }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16 animate-fade-in-slide-up">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Why Choose{" "}
//               <span style={{ color: "#65AB43" }}>{dataa.web_title}</span>?
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Our platform provides everything you need to stay ahead in today's
//               fast-paced market
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Real-time Analytics",
//                 description:
//                   "Get instant insights with our advanced real-time data processing and analytics engine.",
//               },
//               {
//                 title: "Market Intelligence",
//                 description:
//                   "Access comprehensive market data and trends to make informed business decisions.",
//               },
//               {
//                 title: "Easy Integration",
//                 description:
//                   "Seamlessly integrate with your existing tools and workflows for maximum efficiency.",
//               },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="text-center p-8 bg-white rounded-xl shadow-sm border-2 feature-card"
//                 style={{
//                   borderColor: "#65AB43",
//                   animationDelay: `${index * 0.2}s`,
//                 }}
//               >
//                 <div
//                   className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
//                   style={{ backgroundColor: "#65AB43" }}
//                 >
//                   <TrendingUp className="h-8 w-8 text-white" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12 animate-fade-in-slide-up">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//               Testimonials &{" "}
//               <span style={{ color: "#65AB43" }}>Success Stories</span>
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               See how our platform has transformed the financial journey of our
//               users
//             </p>
//           </div>
//           {/* <div className="flex justify-center"> */}
//           <div className="flex md:flex-nowrap flex-wrap gap-6">
//             {[
//               {
//                 name: "Zara F.",
//                 location: "Abu Dhabi",
//                 initial: "Z",
//                 testimonial:
//                   "The binary plan and referral bonus system are game changers. I've never seen faster growth!",
//               },
//               {
//                 name: "Joseph K.",
//                 location: "Sharjah",
//                 initial: "J",
//                 testimonial:
//                   "Even with zero technical background, I'm earning daily. The team support is incredible!",
//               },
//             ].map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm border-2 testimonial-card"
//                 style={{
//                   borderColor: "#65AB43",
//                   animationDelay: `${index * 0.2}s`,
//                 }}
//               >
//                 <div className="flex items-center mb-4">
//                   <div
//                     className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
//                     style={{ backgroundColor: "#65AB43" }}
//                   >
//                     {testimonial.initial}
//                   </div>
//                   <div className="ml-3">
//                     <h4 className="font-semibold text-gray-900">
//                       {testimonial.name}
//                     </h4>
//                     <p className="text-sm" style={{ color: "#65AB43" }}>
//                       {testimonial.location}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 italic leading-relaxed">
//                   "{testimonial.testimonial}"
//                 </p>
//                 <div className="flex mt-3">
//                   {[...Array(5)].map((_, i) => (
//                     <span key={i} className="text-yellow-400 text-sm">
//                       ★
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* </div> */}
//         </div>
//       </section>
//       {/* Footer */}
//       <footer className="bg-black text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-center animate-fade-in-slide-up">
//             <div className="flex items-center mb-4 md:mb-0">
//               <div className="bg-black rounded-full">
//                 {" "}
//                 <img className="h-13" src={dataa.logo} />
//               </div>
//               <span className="text-2xl font-bold" style={{ color: "#65AB43" }}>
//                 {dataa.web_title}
//               </span>
//             </div>
//             <div className="flex space-x-6">
//               <button
//                 disabled
//                 onClick={() => smoothScroll("hero")}
//                 className="hover:text-gray-300 cursor-pointer transition-colors"
//               >
//                 #Home
//               </button>
//               <button
//                 disabled
//                 onClick={() => smoothScroll("testimonials")}
//                 className="hover:text-gray-300 cursor-pointer transition-colors"
//               >
//                 #Testimonials
//               </button>
//               <button
//                 disabled
//                 onClick={() => navigate("/faq")}
//                 className="hover:text-gray-300 cursor-pointer transition-colors"
//               >
//                 #FAQ
//               </button>
//               <button
//                 disabled
//                 onClick={() => navigate("/terms")}
//                 className="hover:text-gray-300 cursor-pointer transition-colors"
//               >
//                 #Terms
//               </button>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
//             <p>&copy; 2024 {dataa.web_title}. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

function EmirROIPage() {
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  const featureList = [
    { title: "Automated Smart Contracts", desc: "Fully automated on-chain payouts and transparent rules — every transaction is verifiable.", icon: "⚙️" },
    { title: "Structured, Sustainable Rewards", desc: "Daily returns, referral bonuses and milestone expansion (3× → 5×) to encourage long-term stability.", icon: "📈" },
    { title: "Live Dashboard", desc: "Realtime tracking of your package, earnings and milestone progress in one place.", icon: "🕒" },
    { title: "Audited & Transparent", desc: "Smart contracts can be publicly audited. We prioritise clear caps and rules to reduce systemic risk.", icon: "🔒" },
  ];

  const packages = [
    { name: "$100 Starter", price: 100, daily: "0.6% - 1% / day", cap: "Starts 3× — expands to 5× after first milestone" },
    { name: "$500 Growth", price: 500, daily: "0.7% - 1.2% / day", cap: "Starts 3× — expands to 5× after first milestone" },
    { name: "$1,500 Pro", price: 1500, daily: "0.8% - 1.4% / day", cap: "Starts 3× — expands to 5× after first milestone" },
    { name: "$5,000 Elite", price: 5000, daily: "0.9% - 1.6% / day", cap: "Starts 3× — expands to 5× after first milestone" },
  ];

  const steps = [
    { step: "1", title: "Activate a Package", desc: "Choose any package from $100 — $5,000 and activate on-chain." },
    { step: "2", title: "Earn Daily Rewards", desc: "Daily rewards are executed automatically and credited to your dashboard." },
    { step: "3", title: "Hit Milestone (Unlock 5×)", desc: "Once your first milestone is reached, your earning cap expands from 3× to 5×." },
    { step: "4", title: "Upgrade or Reinvest", desc: "After 5×, upgrade your package to continue receiving rewards and increase long-term potential." },
  ];

  const smoothScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900 text-slate-100" : "bg-gradient-to-b from-white to-slate-50 text-slate-900"}`}>
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold shadow-lg ${dark ? "bg-gradient-to-tr from-indigo-700 to-emerald-500 text-white" : "bg-gradient-to-tr from-indigo-600 to-emerald-400 text-white"}`}>E</div>
          <div>
            <h1 className="font-semibold text-lg">EmirROI</h1>
            <p className={`${dark ? "text-slate-300" : "text-slate-500"} text-xs`}>Trust • Innovation • Opportunity</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a onClick={() => smoothScroll("features")} className="hover:text-indigo-400 cursor-pointer">Features</a>
          <a onClick={() => smoothScroll("packages")} className="hover:text-indigo-400 cursor-pointer">Packages</a>
          <a onClick={() => smoothScroll("how")} className="hover:text-indigo-400 cursor-pointer">How it works</a>
          <a onClick={() => smoothScroll("faq")} className="hover:text-indigo-400 cursor-pointer">FAQ</a>
          <button type="button" onClick={() => setDark(!dark)} className="ml-2 px-3 py-2 rounded-md cursor-pointer border">{dark ? "Light" : "Dark"}</button>
          <button type="button" onClick={() => navigate("/signup")} className="ml-4 px-4 py-2 rounded-md bg-indigo-600 text-white cursor-pointer shadow hover:opacity-95">Get Started</button>
        </nav>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">A transparent, on-chain rewards system designed to grow capital responsibly</h2>
            <p className={`${dark ? "text-slate-300" : "text-slate-500"} mt-4 text-lg`}>EmirROI uses smart contracts to automate daily returns, referral rewards and milestone boosts — clearly capped to support long-term sustainability. Start with $100 and step into a fair, trackable earning path.</p>

            <div className="mt-6 flex gap-4">
              <a onClick={() => smoothScroll("packages")} className="cursor-pointer inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow">Activate a Package</a>
              <a onClick={() => smoothScroll("how")} className="cursor-pointer inline-flex items-center gap-3 px-6 py-3 rounded-lg border border-slate-200 bg-white text-slate-700">How it works</a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className={`p-4 rounded-lg ${dark ? "bg-gray-800" : "bg-white"} shadow text-center`}>
                <p className={`text-sm ${dark ? "text-slate-300" : "text-slate-500"}`}>Starting</p>
                <p className="text-lg font-semibold">$100</p>
              </div>
              <div className={`p-4 rounded-lg ${dark ? "bg-gray-800" : "bg-white"} shadow text-center`}>
                <p className={`text-sm ${dark ? "text-slate-300" : "text-slate-500"}`}>Most Popular</p>
                <p className="text-lg font-semibold">$500</p>
              </div>
              <div className={`p-4 rounded-lg ${dark ? "bg-gray-800" : "bg-white"} shadow text-center`}>
                <p className={`text-sm ${dark ? "text-slate-300" : "text-slate-500"}`}>Max</p>
                <p className="text-lg font-semibold">$5,000</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl border ${dark ? "bg-gray-800" : "bg-amber-50"}`}>
                <p className={`text-sm font-medium ${dark ? "text-slate-200" : "text-slate-700"}`}>Earning Caps</p>
                <p className={`text-xs ${dark ? "text-slate-300" : "text-slate-500"}`}>All packages start with a 3× cap. After your first milestone you unlock a 5× cap to continue growing.</p>
              </div>

              <div className={`p-3 rounded-xl border ${dark ? "bg-gray-800" : "bg-emerald-50"}`}>
                <p className={`text-sm font-medium ${dark ? "text-slate-200" : "text-slate-700"}`}>Coming Soon</p>
                <p className={`text-xs ${dark ? "text-slate-300" : "text-slate-500"}`}>Emir Future Wallet — secure in-app custody & faster on-chain interactions (optional product launch).</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <div className="w-full rounded-2xl overflow-hidden shadow-2xl border">
              <img alt="dashboard preview" src="/packages/dashboard.png" className="w-full h-fit object-cover" />
              <div className={`p-6 ${dark ? "bg-gray-800" : "bg-white"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Realtime Dashboard</h3>
                    <p className={`text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>Monitor package progress, daily payouts and milestone status.</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs ${dark ? "text-slate-300" : "text-slate-400"}`}>Active</p>
                    <p className="text-sm font-semibold">4,205 Members</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-500 text-white shadow flex items-center justify-between" initial={{ opacity: 0.95 }} animate={{ opacity: [0.95, 1, 0.95] }} transition={{ duration: 3, repeat: Infinity }} aria-live="polite">
              <div className="flex items-center gap-3">
                <motion.span className="w-3 h-3 rounded-full bg-white/90" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
                <div>
                  <p className="text-sm font-medium">Offers Coming Soon</p>
                  <p className="text-xs opacity-90">Exciting promotions will be announced shortly.</p>
                </div>
              </div>
              <div className="text-xs opacity-90">Stay tuned</div>
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="max-w-7xl mx-auto px-6 py-10">
          <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">Why members choose EmirROI</motion.h3>
          <p className={`${dark ? "text-slate-300" : "text-slate-500"} mt-2`}>A reward system that is automated, transparent, and capped for sustainability.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureList.map((f, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} className={`p-6 rounded-xl shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
                <div className="text-3xl">{f.icon}</div>
                <h4 className="mt-4 font-semibold">{f.title}</h4>
                <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="packages" className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Packages & Earning Caps</h3>
              <p className={`${dark ? "text-slate-300" : "text-slate-500"} mt-1`}>Pick a package, follow the milestone path, and grow your cap from 3× to 5× — or upgrade to continue.</p>
            </div>
            <div className={`text-sm ${dark ? "text-slate-300" : "text-slate-500"}`}>Start from $100 • Up to $5,000</div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((p, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className={`p-6 rounded-2xl shadow flex flex-col justify-between ${dark ? "bg-gray-800" : "bg-white"}`}>
                <div>
                  <h4 className="font-bold text-lg">{p.name}</h4>
                  <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>Daily returns: {p.daily}</p>
                  <p className={`mt-1 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>Earning cap: {p.cap}</p>
                  <div className={`mt-3 text-xs ${dark ? "text-slate-300" : "text-slate-500"}`}>Note: Initial cap = 3× contribution. Unlock 5× after achieving the first milestone; upgrading allows continued rewards.</div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${dark ? "text-slate-300" : "text-slate-400"}`}>One-time activation</p>
                    <p className="text-xl font-semibold">${p.price}</p>
                  </div>
                  <button type="button" onClick={() => navigate("/signup")} className="cursor-pointer px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium">Activate</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="how" className="max-w-7xl mx-auto px-6 py-10">
          <h3 className="text-2xl font-bold">How EmirROI Works — Step by step</h3>
          <p className={`${dark ? "text-slate-300" : "text-slate-500"} mt-2`}>Deterministic rules, clear earning limits, and automated payouts — designed for repeatable, trackable outcomes.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }} className={`p-6 rounded-xl shadow text-center ${dark ? "bg-gray-800" : "bg-white"}`}>
                <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center font-bold ${dark ? "bg-indigo-700" : "bg-indigo-50"}`}>
                  {s.step}
                </div>
                <h4 className="mt-4 font-semibold">{s.title}</h4>
                <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-xl shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
              <h4 className="font-bold">Security & Audits</h4>
              <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>Our architecture uses smart contracts with publicly verifiable rules and clear earning caps to reduce systemic risk.</p>
            </div>

            <div className="p-6 rounded-xl shadow text-white bg-gradient-to-tr from-indigo-600 to-emerald-400">
              <h4 className="font-bold text-2xl">4,205</h4>
              <p className="text-sm mt-1">Active Members</p>
            </div>

            <div className={`p-6 rounded-xl shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
              <h4 className="font-bold">Sustainable Caps</h4>
              <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>3× initial cap, 5× after milestone — this protects the ecosystem and aligns incentives for active participants.</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
              <h5 className="font-semibold">What members say</h5>
              <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>“Clear rules and a simple dashboard — I can track exactly how close I am to unlocking the 5× cap.” — A. H.</p>
            </div>

            <div className={`p-6 rounded-xl shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
              <h5 className="font-semibold">Trusted partners</h5>
              <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>Smart contract audits, secure custody partners, and an active community keep the platform accountable.</p>
            </div>
          </div>
        </section>

        <section id="faq" className="max-w-7xl mx-auto px-6 py-10">
          <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <details className={`p-4 rounded-lg shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
              <summary className="font-medium">How are payouts processed?</summary>
              <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>Daily payouts are triggered by smart-contract automation and reflected in your dashboard and connected wallet.</p>
            </details>

            <details className={`p-4 rounded-lg shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
              <summary className="font-medium">What does 3× and 5× mean?</summary>
              <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>3× and 5× refer to earning caps relative to your initial activation. You begin with a 3× cap on your contribution. After reaching the first milestone the cap expands to 5× which allows additional earnings before an upgrade is required.</p>
            </details>

            <details className={`p-4 rounded-lg shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
              <summary className="font-medium">Can I refer others?</summary>
              <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>Yes — referral rewards are built into the system and follow the same automated rules for distribution.</p>
            </details>

            <details className={`p-4 rounded-lg shadow ${dark ? "bg-gray-800" : "bg-white"}`}>
              <summary className="font-medium">How do I get started?</summary>
              <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-400"}`}>Create an account, activate a package, and monitor your dashboard to see daily progress and milestones.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className={`mt-12 border-t py-8 ${dark ? "bg-gray-900 text-slate-300" : "bg-white text-slate-700"}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-bold">EmirROI</h4>
            <p className="text-sm text-slate-500">Built on trust, automation, and clear rules.</p>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#" className="text-sm">Terms</a>
            <a href="#" className="text-sm">Privacy</a>
            <a href="#" className="text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EmirROIPage;