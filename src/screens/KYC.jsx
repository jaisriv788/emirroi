import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function KYC() {
  const dobRef = useRef(null);
  const idNumberRef = useRef(null);
  const idImageRef = useRef(null);
  const navigate = useNavigate();

  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rawDob = dobRef.current?.value;
      const id_number = idNumberRef.current?.value;
      const id_document = idImageRef.current?.files?.[0];

      // Convert date to yyyy/mm/dd format
      const dob = rawDob ? rawDob.replace(/-/g, "-") : "";

      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("dob", dob);
      formData.append("id_number", id_number);
      formData.append("id_document", id_document);

      const response = await axios.post(
        `${baseurl}/api/upload_kyc_details`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200) {
        dobRef.current.value = null;
        idNumberRef.current.value = null;
        idImageRef.current.value = null;
      }

      // console.log(response);
      alert("KYC data submitted! Check console for details.");
      navigate("/kycstatus");
    } catch (error) {
      console.error("Error submitting KYC data:", error);
      alert("Failed to submit KYC data. Please try again.");
    }
  };

  return (
    <div className="bg-white overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#65AA43] shadow-lg">
      <div className="flex items-center justify-center ">
        <div className="w-full border border-gray-100 max-w-md rounded-lg bg-white p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">KYC Verification</h2>
            <p className="text-gray-600">
              Please provide the required information for verification.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 ">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                max={new Date().toISOString().split("T")[0]}
                ref={dobRef}
                className="w-full  cursor-pointer rounded-md border border-gray-300 p-2 focus:border-[#65AB43] focus:outline-none focus:ring-1 focus:ring-[#65AB43]"
                required
              />
              {/* <p className="text-sm text-gray-500">Format: YYYY/MM/DD</p> */}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="id-number"
                className="block text-sm font-medium text-gray-700"
              >
                ID Number
              </label>
              <input
                type="text"
                id="id-number"
                name="idNumber"
                ref={idNumberRef}
                placeholder="Enter your ID number"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-[#65AB43] focus:outline-none focus:ring-1 focus:ring-[#65AB43]"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="id-image"
                className="block text-sm font-medium text-gray-700"
              >
                Upload ID Document
              </label>
              <input
                type="file"
                id="id-image"
                name="idImage"
                accept="image/*"
                ref={idImageRef}
                className="w-full rounded-md border border-gray-300 p-2 file:mr-4 file:rounded-md file:border-0 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100 focus:border-[#65AB43] focus:outline-none focus:ring-1 focus:ring-[#65AB43]"
                required
              />
              <p className="text-sm text-gray-500">
                Accepted formats: JPG, PNG, GIF, etc.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#65AB43] py-2 px-4 text-white hover:bg-[#90bd77] transition ease-in-out duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#65AB43]"
            >
              Submit KYC
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default KYC;
