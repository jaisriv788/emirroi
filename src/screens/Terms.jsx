import { MoveLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function Terms() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Prevent premature render
  if (!userData || !userData.legal_template) {
    return (
      <section className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading terms and conditions...</p>
      </section>
    );
  }

  const terms = userData.legal_template.split("\r\n");
  let visibleIndex = 1;

  return (
    <section id="terms" className="pt-20 min-h-screen bg-white">
      <nav className="bg-white w-full shadow-sm border-b border-gray-100 absolute top-0 z-50 animate-slide-down-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
        <div className="text-center mb-16 animate-fade-in-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Terms and <span style={{ color: "#65AB43" }}>Conditions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Please read our terms and conditions carefully
          </p>
        </div>

        <div
          className="bg-white rounded-lg shadow-sm p-8 border-2 animate-fade-in-slide-up"
          style={{ borderColor: "#65AB43", animationDelay: "0.2s" }}
        >
          <div className="prose max-w-none">
            {terms.map((item, index) => {
              if (index % 2 !== 0) return null;
              const headingNumber = visibleIndex++;
              return (
                <div key={index}>
                  <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: "#65AB43" }}
                  >
                    {headingNumber}. {item.slice(2)}
                  </h3>
                  <p className="text-gray-600 mb-6">{terms[index + 1]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Terms;
