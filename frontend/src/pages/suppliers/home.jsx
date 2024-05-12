import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/spinner";

const Home = () => {
  const [suppliers, setSupplier] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/suppliers/")
      .then((response) => {
        setSupplier(response.data.data);
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
      <div className="flex justify-between supplier-center">
        <h1 className="text-3xl my-8">Supplier List</h1>
        <Link to="suppliers/create">
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
            <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">SupplierName</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Product</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Brand</th>
              <th className="border border-slate-600 rounded-md">Email</th>
              <th className="border border-slate-600 rounded-md">Contact No</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index} className="h-8">
                <td className="border border-gray-600 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {supplier.supplierName}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {supplier.product}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {supplier.brand}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {supplier.email}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {supplier.contactNo}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  <div className="flex justify-center">
                    <Link to={`/suppliers/show/${supplier._id}`}>
                      <BsInfoCircle className="text-xl text-blue-500 cursor-pointer" />
                    </Link>
                    <Link to={`/suppliers/edit/${supplier._id}`}>
                      <AiOutlineEdit className="text-xl text-green-500 cursor-pointer" />
                    </Link>
                    <Link to={`/suppliers/delete/${supplier._id}`}>
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

export default Home