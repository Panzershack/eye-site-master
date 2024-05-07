import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/spinner";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const HomeCons = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/consultations`)
      .then((res) => {
        setConsultations(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Consultations list</h1>
        <Link to="/consultations/create">
          <MdOutlineAddBox className="text-red-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-black">No</th>
              <th className="px-4 py-2 border border-black">Consultation Date</th>
              <th className="px-4 py-2 border border-black">
                Consultation Text
              </th>
              <th className="px-4 py-2 border border-black">Test Details</th>
              <th className="px-4 py-2 border border-black">Operations</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((consultation, index) => (
              <tr key={consultation._id} className="bg-white">
                <td className="px-4 py-2 border border-black">{index + 1}</td>
                <td className="px-4 py-2 border border-black">
                  {formatDate(consultation.consultationDate)}
                </td>
                <td className="px-4 py-2 border border-black">
                  {consultation.consultationText}
                </td>
                <td className="px-4 py-2 border border-black">
                  {consultation.testDetails}
                </td>
                <td className="px-4 py-2 border border-black">
                  <div className="flex gap-x-4 justify-center">
                    <Link to={`/consultations/details/${consultation._id}`}>
                      <BsInfoCircle className="text-green-800 text-2xl" />
                    </Link>
                    <Link to={`/consultations/edit/${consultation._id}`}>
                      <AiOutlineEdit className="text-yellow-600 text-2xl" />
                    </Link>
                    <Link to={`/consultations/delete/${consultation._id}`}>
                      <MdOutlineDelete className="text-red-600 text-2xl" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomeCons;
