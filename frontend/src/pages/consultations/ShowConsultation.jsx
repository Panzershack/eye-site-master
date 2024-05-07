import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../components/backButton";
import Spinner from "../../components/spinner";

const ShowConsultation = () => {
  const [consultation, setConsultation] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/consultations/${id}`)
      .then((res) => {
        setConsultation(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Consultation</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-red-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Id</span>
            <span>{consultation._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">ConsultationDate</span>
            <span>{formatDate(consultation.consultationDate)}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">ConsultationText</span>
            <span>{consultation.consultationText}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Published Year</span>
            <span>{consultation.testDetails}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Created Date</span>
            <span>{new Date(consultation.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">
              Last Updated Date
            </span>
            <span>{new Date(consultation.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowConsultation;
