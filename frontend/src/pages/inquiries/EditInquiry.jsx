import { useState, useEffect } from "react";
import BackButton from "../../components/backButton";
import Spinner from "../../components/spinner";
import axios from "axios";
import { useNavigate, useParams} from "react-router-dom";

const EditInquiry = () => {
  const [Email, setEmail] = useState("");
  const [Type, setType] = useState("");
  const [Text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/inquiries/${id}`)
    .then((res) => {
      setEmail(res.data.Email);
      setType(res.data.Type);
      setText(res.data.Text);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      alert("An error has occured please check console");
      console.log(error);
    });
  }, [id])
  const handleEditInquiry = () => {
    const data = {
      Email,
      Type,
      Text
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/inquiries/edit/${id}`, data)
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
      <BackButton />
      <h1 className="text-3xl my-4">Edit Inquiry</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Email</label>
          <input
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Type</label>
          <select
            value={Type}
            onChange={(e) => setType(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          >
            <option value="">Select Type</option>
            <option value="Feedback">Feedback</option>
            <option value="Inquiry">Inquiry</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Text</label>
          <input
            type="text"
            value={Text}
            onChange={(e) => setText(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditInquiry}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditInquiry;
