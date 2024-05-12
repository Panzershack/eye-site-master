import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const EditConsultation = ({ consultationId }) => {
  const [consultationDate, setConsultationDate] = useState("");
  const [consultationText, setConsultationText] = useState("");
  const [testDetails, setTestDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/consultations/${consultationId}`)
      .then((res) => {
        const { consultationDate, consultationText, testDetails } = res.data;
        setConsultationDate(formatDate(consultationDate)); // Format date
        setConsultationText(consultationText);
        setTestDetails(testDetails);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occurred. Please check console");
        console.log(error);
      });
  }, [consultationId]);

  const handleEditConsultation = () => {
    const data = {
      consultationDate,
      consultationText,
      testDetails,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/consultations/${consultationId}`, data)
      .then(() => {
        setLoading(false);
        navigate(`/admin`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to format the date into a human-readable form
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Consultation</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-red-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">
            Consultation Date
          </label>
          <input
            type="date"
            value={consultationDate}
            onChange={(e) => setConsultationDate(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">
            Consultation Text
          </label>
          <input
            type="text"
            value={consultationText}
            onChange={(e) => setConsultationText(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Test Details</label>
          <input
            type="text"
            value={testDetails}
            onChange={(e) => setTestDetails(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-red-600 text-white m-8 rounded-xl"
          onClick={handleEditConsultation}
        >
          Save
        </button>
      </div>
    </div>
  );
};

// Define prop types
EditConsultation.propTypes = {
  consultationId: PropTypes.string.isRequired,
};

export default EditConsultation;
