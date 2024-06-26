import { useState } from "react";
import Spinner from "../../components/spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateConsultation = () => {
  const [consultationDate, setConsultationDate] = useState("");
  const [consultationText, setConsultationText] = useState("");
  const [testDetails, setTestDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSavedConsultation = () => {
    const data = {
      consultationDate,
      consultationText,
      testDetails,
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/consultations`, data)
      .then(() => {
        setLoading(false);
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-red-400 rounded-xl w-[600px] p-4 mx-auto bg-white mt-4">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">ConsultationDate</label>
          <input
            type="date"
            value={consultationDate}
            onChange={(e) => setConsultationDate(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">ConsultationText</label>
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
          onClick={handleSavedConsultation}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateConsultation;
