import { ChevronDown, ChevronUp, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import axios from "axios";

const faqs = [
  {
    question: "How do I register?",
    answer:
      "Register via your sponsor's link, select and activate your investment package, and begin earning immediately.",
  },
  {
    question: "Is emirROI safe and secure?",
    answer:
      "Yes, emirROI is backed by regulated markets, strategic asset allocations, and secure blockchain smart contracts.",
  },
  {
    question: "What’s the daily cap on binary earnings?",
    answer:
      "Binary earnings are capped daily at the amount of your active investment package.",
  },
  {
    question: "How are bonuses distributed?",
    answer:
      "Referral bonuses are instant, while binary and ranking bonuses are calculated and credited systematically.",
  },
  {
    question: "What happens after earning 5x my initial investment?",
    answer:
      "Members are required to upgrade their investment packages to continue earning.",
  },
  {
    question: "Are withdrawals instant?",
    answer:
      "Yes, withdrawals are processed instantly through blockchain, subject to a 10% withdrawal fee (minimum withdrawal is $5).",
  },
  {
    question: "Can I earn without referrals?",
    answer:
      "Absolutely, ROI payouts are independent and not contingent upon referrals.",
  },
  {
    question: "How secure is my invested capital?",
    answer:
      "emirROI strategically invests funds into tangible, stable assets, ensuring safety, liquidity, and reliable returns.",
  },
];

function Faq() {
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // const baseUrl = useSelector((state) => state.auth.baseurl);
  const userData = useSelector((state) => state.auth.userData);

  // const getData = async () => {
  //   const response = await axios.get(`${baseUrl}/api/general-settings`);
  //   console.log(response.data.data);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  if (!userData || !userData.legal_template) {
    return (
      <section className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading terms and conditions...</p>
      </section>
    );
  }

  return (
    <section
      id="faq"
      className="pt-20 min-h-screen"
      style={{ backgroundColor: "#f8fdf6" }}
    >
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center  animate-fade-in-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span style={{ color: "#65AB43" }}>Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about EmirROI
          </p>
        </div>
        <div className="space-y-3 mt-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 rounded-lg bg-white faq-item overflow-hidden"
              style={{
                borderColor: "#65AB43",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-2 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <div
                  className={`faq-chevron ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                >
                  {openFaq === index ? (
                    <ChevronUp
                      className="h-5 w-5"
                      style={{ color: "#65AB43" }}
                    />
                  ) : (
                    <ChevronDown
                      className="h-5 w-5"
                      style={{ color: "#65AB43" }}
                    />
                  )}
                </div>
              </button>
              <div
                className={`faq-answer-container ${
                  openFaq === index ? "open" : ""
                }`}
              >
                <p className="text-gray-600 leading-relaxed px-6 pb-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
