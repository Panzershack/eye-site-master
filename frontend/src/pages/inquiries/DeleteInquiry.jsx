import { useState } from "react"
import BackButton from "../../components/backButton"
import Spinner from "../../components/spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const DeleteInquiry = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const handleDeleteInquiry = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/inquiries/${id}`)
      .then(() => {
        setLoading(false);
        navigate(`/`);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occured, please check console");
        console.log(error);
      });


  }
  return (
    <div className="p-4 ">
      <BackButton/>
      <h1 className="text-3xl my-4">Delete Inquiry</h1>
      {loading ? <Spinner/> : " "}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this inquiry?</h3>

        <button
        className="p-4 bg-red-600 text-white m-8 w-full"
        onClick={handleDeleteInquiry}
        >
          Yes, Delete Inquiry
        </button>
      </div>
      <div></div>
    </div>
  )
}

export default DeleteInquiry