import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/spinner";
import SearchBar from '../../components/backButton';

const HomeInq = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredInquiries, setFilteredInquiries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/inquiries`)
      .then((res) => {
        setInquiries(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSearch= (searchQuery) => {
    const filtered = inquiries.filter((inquiry) =>
      inquiry.Email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInquiries(filtered);
  };

  const handleBack = () => {
    setFilteredInquiries([]); // Clear filtered inquiries
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Inquiries</h1>
        <Link to="/inquiries/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <SearchBar onSearch={handleSearch} />
        {filteredInquiries.length > 0 && (
          <button onClick={handleBack} className="p-2 bg-sky-300">
            Back to Inquiry List
          </button>
        )}
      </div>

      {loading ? (
        <Spinner/>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Email</th>
              <th className="border border-slate-600 rounded-md">Type</th>
              <th className="border border-slate-600 rounded-md">Text</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry, index) => (
                <tr key={inquiry._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {inquiry.Email}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {inquiry.Type}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {inquiry.Text}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/inquiries/details/${inquiry._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/inquiries/edit/${inquiry._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/inquiries/delete/${inquiry._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              inquiries.map((inquiry, index) => (
                <tr key={inquiry._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {inquiry.Email}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {inquiry.Type}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {inquiry.Text}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/inquiries/details/${inquiry._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/inquiries/edit/${inquiry._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/inquiries/delete/${inquiry._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomeInq;
