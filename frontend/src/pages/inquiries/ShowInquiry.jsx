import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import PropTypes from "prop-types";

const ShowInquiry = ({ inquiryId }) => {
  const [inquiry, setInquiry] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/inquiries/${inquiryId}`)
      .then((res) => {
        setInquiry(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [inquiryId]);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Show Inquiry</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Id</span>
            <span>{inquiry._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Email</span>
            <span>{inquiry.Email}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Type</span>
            <span>{inquiry.Type}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Text</span>
            <span>{inquiry.Text}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">Created Date</span>
            <span>{new Date(inquiry.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-grey-500">
              Last Updated Date
            </span>
            <span>{new Date(inquiry.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Define prop types
ShowInquiry.propTypes = {
  inquiryId: PropTypes.string.isRequired,
};


export default ShowInquiry;
