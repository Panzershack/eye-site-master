import { useState } from "react";
import Spinner from "../../components/spinner";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DeleteInquiry = ({ inquiryId }) => {
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const handleDeleteInquiry = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/inquiries/${inquiryId}`)
      .then(() => {
        setLoading(false);
        navigate(`/admin`, { replace: true }); // Reload the page
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occurred, please check console");
        console.log(error);
      });
  };

  return (
    <div className="p-4 ">
      <h1 className="text-3xl my-4">Delete Inquiry</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are you sure you want to delete this inquiry?
        </h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteInquiry}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Yes, Delete Inquiry"}
        </button>
      </div>
    </div>
  );
};

// PropTypes validation
DeleteInquiry.propTypes = {
  inquiryId: PropTypes.string.isRequired,
};

export default DeleteInquiry;
