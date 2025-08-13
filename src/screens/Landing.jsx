import { useState } from "react";
import { TrendingUp, Menu, X } from "lucide-react";
import "../landing.css";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../features/auth/authSlice";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dataa, setDataa] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseUrl = useSelector((state) => state.auth.baseurl);

  const getData = async () => {
    const response = await axios.get(`${baseUrl}/api/general-settings`);
    setDataa(response.data.data);
    dispatch(setData(response.data.data));
    localStorage.setItem("nomaldata", JSON.stringify(response.data.data));
    // console.log(response.data.data.welcome_template);
    // console.log({terms: response.data.data.legal_template.split("\r\n")});
  };

  useEffect(() => {
    getData();
  }, []);

  const smoothScroll = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  // MLM Network Animation Component
  const NetworkAnimation = () => {
    const nodes = [
      { id: 1, x: 50, y: 20, delay: 0 },
      { id: 2, x: 25, y: 40, delay: 0.5 },
      { id: 3, x: 75, y: 40, delay: 0.5 },
      { id: 4, x: 15, y: 60, delay: 1 },
      { id: 5, x: 35, y: 60, delay: 1 },
      { id: 6, x: 65, y: 60, delay: 1 },
      { id: 7, x: 85, y: 60, delay: 1 },
      { id: 8, x: 10, y: 80, delay: 1.5 },
      { id: 9, x: 20, y: 80, delay: 1.5 },
      { id: 10, x: 30, y: 80, delay: 1.5 },
      { id: 11, x: 40, y: 80, delay: 1.5 },
      { id: 12, x: 60, y: 80, delay: 1.5 },
      { id: 13, x: 70, y: 80, delay: 1.5 },
      { id: 14, x: 80, y: 80, delay: 1.5 },
      { id: 15, x: 90, y: 80, delay: 1.5 },
    ];
    const connections = [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 3, to: 7 },
      { from: 4, to: 8 },
      { from: 4, to: 9 },
      { from: 5, to: 10 },
      { from: 5, to: 11 },
      { from: 6, to: 12 },
      { from: 6, to: 13 },
      { from: 7, to: 14 },
      { from: 7, to: 15 },
    ];

    if (!dataa) {
      return null;
    }
    return (
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Connections */}
          {connections.map((conn, index) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            const delay = Math.max(fromNode.delay, toNode.delay) + 0.5;
            return (
              <line
                key={`conn-${index}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#65AB43"
                strokeWidth="0.2"
                className="network-line"
                style={{ animationDelay: `${delay}s` }}
              />
            );
          })}
          {/* Nodes */}
          {nodes.map((node) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r="0.8"
              fill="#65AB43"
              className="network-node"
              style={{ animationDelay: `${node.delay}s` }}
            />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 animate-slide-down-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex gap-2 items-center cursor-pointer animate-fade-in-slide-left"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-black rounded-full">
                {" "}
                <img className="h-13" src={dataa.logo} />
              </div>

              <span className="text-2xl font-bold" style={{ color: "#65AB43" }}>
                {dataa.web_title}
              </span>
            </div>
            {/* Desktop Navigation */}
            <div
              className="hidden md:flex items-center space-x-8 animate-fade-in-slide-right"
              style={{ animationDelay: "0.4s" }}
            >
              <button
                onClick={() => smoothScroll("hero")}
                className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => smoothScroll("testimonials")}
                className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => navigate("/faq")}
                className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
              >
                Terms
              </button>
              <a
                onClick={() => navigate("/signin")}
                className="text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
              >
                Login
              </a>
              <a
                onClick={() => navigate("/signup")}
                className="px-4 py-2 cursor-pointer rounded-lg text-white transition-all hover:shadow-lg transform hover:scale-105"
                style={{ backgroundColor: "#65AB43" }}
              >
                Sign Up
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div
            className={`md:hidden border-t border-gray-100 overflow-hidden ${
              isMenuOpen ? "mobile-menu-open" : "mobile-menu-closed"
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => smoothScroll("hero")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Home
              </button>
              <button
                onClick={() => smoothScroll("testimonials")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Testimonials
              </button>
              <button
                onClick={() => navigate("/faq")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                FAQ
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="cursor-pointer block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Terms
              </button>
              <a
                onClick={() => navigate("/signin")}
                className="cursor-pointer block px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Login
              </a>
              <a
                onClick={() => navigate("/signup")}
                className="cursor-pointer block px-3 py-2 mx-3 mt-2 rounded-lg text-white text-center"
                style={{ backgroundColor: "#65AB43" }}
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #f8fdf6 50%, #ecfdf5 75%, #f0fdf4 100%)",
        }}
      >
        {/* Animated Network Background */}
        <NetworkAnimation />
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-20 particle"
              style={{
                backgroundColor: "#65AB43",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-fade-in-scale">
              <div className="bg-black rounded-full">
                {" "}
                <img className="h-35" src={dataa.logo} />
              </div>
            </div>
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              Build Your{" "}
              <span style={{ color: "#65AB43" }}>Financial Empire</span>
              <br />
              with <span style={{ color: "#65AB43" }}>{dataa.web_title}</span>
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-fade-in-slide-up"
              style={{ animationDelay: "0.0.4s" }}
            >
              Join thousands of successful entrepreneurs earning passive income
              through our proven MLM system. Build your network, grow your team,
              and achieve the financial freedom you deserve.
            </p>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: "#f8fdf6" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose{" "}
              <span style={{ color: "#65AB43" }}>{dataa.web_title}</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to stay ahead in today's
              fast-paced market
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Analytics",
                description:
                  "Get instant insights with our advanced real-time data processing and analytics engine.",
              },
              {
                title: "Market Intelligence",
                description:
                  "Access comprehensive market data and trends to make informed business decisions.",
              },
              {
                title: "Easy Integration",
                description:
                  "Seamlessly integrate with your existing tools and workflows for maximum efficiency.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white rounded-xl shadow-sm border-2 feature-card"
                style={{
                  borderColor: "#65AB43",
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: "#65AB43" }}
                >
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Testimonials &{" "}
              <span style={{ color: "#65AB43" }}>Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how our platform has transformed the financial journey of our
              users
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Ameen R.",
                location: "Dubai",
                initial: "A",
                testimonial:
                  "This platform gave me true financial freedom. From $100 to $5000+ in 6 months. Unbelievable!",
              },
              {
                name: "Zara F.",
                location: "Abu Dhabi",
                initial: "Z",
                testimonial:
                  "The binary plan and referral bonus system are game changers. I've never seen faster growth!",
              },
              {
                name: "Joseph K.",
                location: "Sharjah",
                initial: "J",
                testimonial:
                  "Even with zero technical background, I'm earning daily. The team support is incredible!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm border-2 testimonial-card"
                style={{
                  borderColor: "#65AB43",
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: "#65AB43" }}
                  >
                    {testimonial.initial}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm" style={{ color: "#65AB43" }}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center animate-fade-in-slide-up">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-black rounded-full">
                {" "}
                <img className="h-13" src={dataa.logo} />
              </div>
              <span className="text-2xl font-bold" style={{ color: "#65AB43" }}>
                {dataa.web_title}
              </span>
            </div>
            <div className="flex space-x-6">
              <button
                onClick={() => smoothScroll("hero")}
                className="hover:text-gray-300 cursor-pointer transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => smoothScroll("testimonials")}
                className="hover:text-gray-300 cursor-pointer transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => navigate("/faq")}
                className="hover:text-gray-300 cursor-pointer transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="hover:text-gray-300 cursor-pointer transition-colors"
              >
                Terms
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {dataa.web_title}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
