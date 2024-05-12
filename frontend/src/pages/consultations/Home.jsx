import { useState, useEffect } from "react";
import axios from "axios";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/spinner";
import Modal from "react-modal"; //for popups

import ShowConsultation from "../consultations/ShowConsultation";
import EditConsultation from "../consultations/EditConsultation";
import DeleteConsultation from "../consultations/DeleteConsultation";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const HomeCons = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedInfoConsultationId, setSelectedInfoConsultationId] =
    useState(null); // State for selected consultation ID for Info modal
  const [selectedEditConsultationId, setSelectedEditConsultationId] =
    useState(null); // State for selected consultation ID for Edit modal
  const [selectedDeleteConsultationId, setSelectedDeleteConsultationId] =
    useState(null); // State for selected consultation ID for Delete modal

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

  const handleDownClick = () => {
    if (startIndex + 10 < consultations.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleUpClick = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Consultations list</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-black">No</th>
                <th className="px-4 py-2 border border-black">
                  Consultation Date
                </th>
                <th className="px-4 py-2 border border-black">
                  Consultation Text
                </th>
                <th className="px-4 py-2 border border-black">Test Details</th>
                <th className="px-4 py-2 border border-black">Operations</th>
              </tr>
            </thead>
            <tbody>
              {consultations
                .slice(startIndex, startIndex + 10)
                .map((consultation, index) => (
                  <tr key={consultation._id} className="bg-white">
                    <td className="px-4 py-2 border border-black">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {formatDate(consultation.consultationDate)}
                    </td>
                    <td
                      className="px-4 py-2 border border-black"
                      style={{ maxWidth: "200px", wordWrap: "break-word" }}
                    >
                      {consultation.consultationText}
                    </td>
                    <td
                      className="px-4 py-2 border border-black"
                      style={{ maxWidth: "200px", wordWrap: "break-word" }}
                    >
                      {consultation.testDetails}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      <div className="flex gap-x-4 justify-center">
                        <button
                          onClick={() =>
                            setSelectedInfoConsultationId(consultation._id)
                          }
                        >
                          <BsInfoCircle className="text-green-800 text-2xl" />
                        </button>
                        <Modal
                          isOpen={
                            selectedInfoConsultationId === consultation._id
                          }
                          onRequestClose={() =>
                            setSelectedInfoConsultationId(null)
                          }
                          style={{
                            content: {
                              top: "50%",
                              left: "50%",
                              right: "auto",
                              bottom: "auto",
                              marginRight: "-50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        >
                          <ShowConsultation consultationId={consultation._id} />
                        </Modal>
                        <button
                          onClick={() =>
                            setSelectedEditConsultationId(consultation._id)
                          }
                        >
                          <AiOutlineEdit className="text-yellow-600 text-2xl" />
                        </button>
                        <Modal
                          isOpen={
                            selectedEditConsultationId === consultation._id
                          }
                          onRequestClose={() =>
                            setSelectedEditConsultationId(null)
                          }
                          style={{
                            content: {
                              top: "50%",
                              left: "50%",
                              right: "auto",
                              bottom: "auto",
                              marginRight: "-50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        >
                          <EditConsultation consultationId={consultation._id} />
                        </Modal>
                        <button
                          onClick={() =>
                            setSelectedDeleteConsultationId(consultation._id)
                          }
                        >
                          <MdOutlineDelete className="text-red-600 text-2xl" />
                        </button>
                        <Modal
                          isOpen={
                            selectedDeleteConsultationId === consultation._id
                          }
                          onRequestClose={() =>
                            setSelectedDeleteConsultationId(null)
                          }
                          style={{
                            content: {
                              top: "50%",
                              left: "50%",
                              right: "auto",
                              bottom: "auto",
                              marginRight: "-50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        >
                          <DeleteConsultation
                            consultationId={consultation._id}
                          />
                        </Modal>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleUpClick}
          disabled={startIndex === 0}
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          style={{ width: "100px" }}
        >
          Up
        </button>
        <button
          onClick={handleDownClick}
          disabled={startIndex + 10 >= consultations.length}
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          style={{ width: "100px" }}
        >
          Down
        </button>
      </div>
    </div>
  );
};

export default HomeCons;
