import { useState } from "react"
import Spinner from "../../components/spinner"
import PropTypes from "prop-types";
import axios from "axios"
import { useNavigate } from "react-router-dom"

const DeleteSupplier = ({supplierId}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDeleteSupplier = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/suppliers/${supplierId}`)
      .then(() => {
        setLoading(false);
        navigate(`/admin`, { replace: true }); // Reload the page
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occured, please check console");
        console.log(error);
      });


  }
  return (
    <div className="p-4 ">
      <h1 className="text-3xl my-4">Delete Supplier</h1>
      {loading ? <Spinner/> : " "}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this supplier?</h3>

        <button
        className="p-4 bg-red-600 text-white m-8 w-full"
        onClick={handleDeleteSupplier}
        >
          Yes, Delete Supplier
        </button>
      </div>
      <div></div>
    </div>
  )
}

// Define prop types
DeleteSupplier.propTypes = {
  supplierId: PropTypes.string.isRequired,
};


export default DeleteSupplier