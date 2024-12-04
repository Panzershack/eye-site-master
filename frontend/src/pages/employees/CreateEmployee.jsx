import { useState } from "react"
import Spinner from "../../components/spinner"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const CreateEmployee= () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSavedEmployee = () => {
    const data = {
      firstName,
      lastName,
      position,
      telephone,
      address
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/employees/`, data)
      .then(() => {
        setLoading(false);
        navigate(`/admin`, { replace: true }); // Reload the page
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.log(error);
      })

  };


  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create Employee</h1>
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSavedEmployee}>
          Save
        </button>
      </div>
    </div>
  );
  }  

export default CreateEmployee