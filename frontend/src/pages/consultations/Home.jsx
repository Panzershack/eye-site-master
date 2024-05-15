import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import Modal from "react-modal";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
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
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedInfoConsultationId, setSelectedInfoConsultationId] =
    useState(null);
  const [selectedEditConsultationId, setSelectedEditConsultationId] =
    useState(null);
  const [selectedDeleteConsultationId, setSelectedDeleteConsultationId] =
    useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  useEffect(() => {
    let filtered = [...consultations];

    if (startDate && endDate) {
      filtered = filtered.filter((consultation) => {
        const consultationDate = new Date(consultation.consultationDate);
        return (
          consultationDate >= new Date(startDate) &&
          consultationDate <= new Date(endDate)
        );
      });
    }

    if (searchTerm.trim() !== "") {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (consultation) =>
          consultation.consultationText
            .toLowerCase()
            .includes(searchTermLower) ||
          consultation.testDetails.toLowerCase().includes(searchTermLower)
      );
    }

    setFilteredConsultations(filtered);
  }, [searchTerm, startDate, endDate, consultations]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleDownClick = () => {
    if (startIndex + 10 < filteredConsultations.length) {
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
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="rounded-l py-2 px-4 mr-4"
          />
          <label className="mr-4">
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="ml-2 rounded py-1 px-2 border"
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="ml-2 rounded py-1 px-2 border"
            />
          </label>
          <ReactHTMLTableToExcel
            id="excelButton"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r cursor-pointer ml-4"
            table="consultationsTable"
            filename="consultations"
            sheet="consultations"
            buttonText="Export to Excel"
          />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table
            id="consultationsTable"
            className="w-full bg-white shadow-md rounded-lg overflow-hidden"
          >
            <thead className="bg-gray-200 text-gray-700 border-grey-500">
              <tr>
                <th className="px-4 py-2 border border-grey-300">No</th>
                <th className="px-4 py-2 border border-grey-300">
                  Consultation Date
                </th>
                <th className="px-4 py-2 border border-grey-300">
                  Consultation Text
                </th>
                <th className="px-4 py-2 border border-grey-300">
                  Test Details
                </th>
                <th className="px-4 py-2 border border-grey-300">Operations</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations
                .slice(startIndex, startIndex + 10)
                .map((consultation, index) => (
                  <tr key={consultation._id} className="bg-white">
                    <td className="px-4 py-2 border border-grey-300">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-2 border border-grey-300">
                      {formatDate(consultation.consultationDate)}
                    </td>
                    <td
                      className="px-4 py-2 border border-grey-300"
                      style={{ maxWidth: "200px", wordWrap: "break-word" }}
                    >
                      {consultation.consultationText}
                    </td>
                    <td
                      className="px-4 py-2 border border-grey-300"
                      style={{ maxWidth: "200px", wordWrap: "break-word" }}
                    >
                      {consultation.testDetails}
                    </td>
                    <td className="px-4 py-2 border border-grey-300">
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
          disabled={startIndex + 10 >= filteredConsultations.length}
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
