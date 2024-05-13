import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const EditEmployee = ({employeeId}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/employees/${employeeId}`)
    .then((res) => {
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setPosition(res.data.position);
      setTelephone(res.data.telephone);
      setAddress(res.data.address);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      alert("An error has occured please check console");
      console.log(error);
    });
  }, [employeeId])
  const handleEditEmployee = () => {
    const data = {
      firstName,
      lastName,
      position,
      telephone,
      address,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/employees/${employeeId}`, data)
      .then(() => {
        setLoading(false);
        navigate(`/admin`, { replace: true }); // Reload the page
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Employee</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Telephone</label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditEmployee}>
          Save
        </button>
      </div>
    </div>
  );
  };

// Define prop types
EditEmployee.propTypes = {
employeeId: PropTypes.string.isRequired,
};

export default EditEmployee;
