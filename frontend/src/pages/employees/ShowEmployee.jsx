import { useEffect, useState } from "react"
import axios from "axios"
import Spinner from "../../components/spinner"
import PropTypes from "prop-types";



const ShowEmployee = ({employeeId}) => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5555/employees/${employeeId}`)
      .then((res) => {
        setEmployee(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [employeeId])

  return (
    <div className="p-4">
  <h1 className="text-3xl my-4">Show Employee</h1>
  {loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Id</span>
        <span>{employee._id}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">First Name</span>
        <span>{employee.firstName}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Last Name</span>
        <span>{employee.lastName}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Position</span>
        <span>{employee.position}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Telephone</span>
        <span>{employee.telephone}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Address</span>
        <span>{employee.address}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Created Date</span>
        <span>{new Date(employee.createdAt).toString()}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Last Updated Date</span>
        <span>{new Date(employee.updatedAt).toString()}</span>
      </div>
    </div>
  )}
</div>
  );
}

// Define prop types
ShowEmployee.propTypes = {
employeeId: PropTypes.string.isRequired,
};


export default ShowEmployee;