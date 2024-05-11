import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/employees/`)
      .then((response) => {
        setEmployees(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching customers. Please try again later.");
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between employee-center">
        <h1 className="text-3xl my-8">Employee List</h1>
        <Link to="employees/create">
          <MdOutlineAddBox className="text-3xl text-green-500 cursor-pointer" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-gray-600 rounded-md">No</th>
              <th className="border border-gray-600 rounded-md">First Name</th>
              <th className="border border-gray-600 rounded-md">Last Name</th>
              <th className="border border-gray-600 rounded-md">Position</th>
              <th className="border border-gray-600 rounded-md">Telephone</th>
              <th className="border border-gray-600 rounded-md">Address</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="h-8">
                <td className="border border-gray-600 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {employee.firstName}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {employee.lastName}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {employee.position}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {employee.telephone}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {employee.address}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  <div className="flex justify-center">
                    <Link to={`/employees/show/${employee._id}`}>
                      <BsInfoCircle className="text-xl text-blue-500 cursor-pointer" />
                    </Link>
                    <Link to={`/employees/edit/${employee._id}`}>
                      <AiOutlineEdit className="text-xl text-green-500 cursor-pointer" />
                    </Link>
                    <Link to={`/employees/delete/${employee._id}`}>
                      <MdOutlineDelete className="text-xl text-red-500 cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
};

export default Home;
