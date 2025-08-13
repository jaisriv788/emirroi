import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function KYCStatus() {
  const [data, setData] = useState([]);
  const [expand, setExpand] = useState(false);
  const baseurl = useSelector((state) => state.auth.baseurl);
  const user_id = useSelector((state) => state.auth.user.id);

  async function fetchData() {
    const formData = new FormData();
    formData.append("user_id", user_id);

    const response = await axios.post(`${baseurl}/api/kyc-request`, formData);
    response.data.data != null && setData(response.data.data);
    // console.log(response.data.data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-white overflow-x-hidden rounded-2xl p-4 lg:px-20 lg:py-10 flex-1 ml-2 md:ml-24 mr-2 md:mr-10 sm:mb-[25px] mt-[90px] text-[#65AA43] shadow-lg">
      <div className="font-semibold mb-6 text-2xl border-b border-gray-200 pb-2">
        KYC Status
      </div>

      {/* //-------------------------------------- */}

      <div
        className={`bg-white overflow-hidden text-[#418a1c] rounded-2xl shadow-xl  border-[1px] border-gray-300 transition-transform`}
      >
        <div className="px-6 py-3 border-b border-gray-200 text-base font-semibold tracking-wide bg-gray-50 rounded-t-2xl">
          Latest Transaction
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="text-[#418a1c]">
                <th>S.No.</th>
                <th>Id Number</th>
                <th>Date Of Birth</th>
                <th className="w-[200px]">Discription</th>
                <th>Status</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {data.length == 0 ? (
                <tr>
                  <td colSpan={6} className="text-center">
                    Data Not Found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-[#65AB43] font-semibold">
                        {index + 1}
                      </td>
                      <td className="font-semibold text-gray-900">
                        {item.adhaar_number}
                      </td>
                      <td className="font-semibold text-gray-900">
                        {item.dob}
                      </td>
                      <td className="font-semibold text-gray-900">
                        {item.description == null ? (
                          "-"
                        ) : (
                          <>
                            {expand == false
                              ? item.description.slice(0, 16)
                              : item.description}
                            {item.description.length > 16 && (
                              <a
                                onClick={() => {
                                  setExpand((prev) => !prev);
                                }}
                                className="text-blue-700 cursor-pointer hover:underline"
                              >
                                ...
                              </a>
                            )}
                          </>
                        )}
                      </td>

                      <td className="font-semibold text-white ">
                        <p
                          className={`${
                            item.status == "approve"
                              ? "bg-emerald-500"
                              : item.status == "reject"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }  py-[2px] rounded-lg w-18 text-center`}
                        >
                          {item.status == "approve"
                            ? "Approve"
                            : item.status == "reject"
                            ? "Reject"
                            : "Pending"}
                        </p>
                      </td>
                      <td className="font-semibold text-gray-900">
                        <a href={item.adhaar_front} target="_blank">
                          View
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default KYCStatus;
