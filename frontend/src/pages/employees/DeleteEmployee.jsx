import { useState } from "react"
import Spinner from "../../components/spinner"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types";

const DeleteEmployee = ({employeeId}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleDeleteEmployee = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/employees/${employeeId}`)
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
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner/> : " "}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this employee?</h3>

        <button
        className="p-4 bg-red-600 text-white m-8 w-full"
        onClick={handleDeleteEmployee}
        >
          Yes, Delete Customer
        </button>
      </div>
      <div></div>
    </div>
  )
}

// Define prop types
DeleteEmployee.propTypes = {
employeeId: PropTypes.string.isRequired,
};

export default DeleteEmployee;