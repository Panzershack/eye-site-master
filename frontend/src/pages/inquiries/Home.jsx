import { useEffect, useState } from "react";
import axios from "axios";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/spinner";
import Modal from "react-modal"; //for popups
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import ShowInquiry from "../inquiries/ShowInquiry";
import EditInquiry from "../inquiries/EditInquiry";
import DeleteInquiry from "../inquiries/DeleteInquiry";

const HomeInq = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedInfoInquiryId, setSelectedInfoInquiryId] = useState(null);
  const [selectedEditInquiryId, setSelectedEditInquiryId] = useState(null);
  const [selectedDeleteInquiryId, setSelectedDeleteInquiryId] = useState(null);
  const [filterType, setFilterType] = useState("all");

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

  const handleDownClick = () => {
    if (startIndex + 10 < inquiries.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleUpClick = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  const openInfoModal = (inquiryId) => {
    setSelectedInfoInquiryId(inquiryId);
  };

  const closeInfoModal = () => {
    setSelectedInfoInquiryId(null);
  };

  const openEditModal = (inquiryId) => {
    setSelectedEditInquiryId(inquiryId);
  };

  const closeEditModal = () => {
    setSelectedEditInquiryId(null);
  };

  const openDeleteModal = (inquiryId) => {
    setSelectedDeleteInquiryId(inquiryId);
  };

  const closeDeleteModal = () => {
    setSelectedDeleteInquiryId(null);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

const filteredInquiries = () => {
  if (filterType === "all") {
    return inquiries;
  } else {
    // Filter inquiries based on the selected type (case-insensitive)
    return inquiries.filter(
      (inquiry) => inquiry.Type.toLowerCase() === filterType.toLowerCase()
    );
  }
};

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Inquiries list</h1>
        <div className="flex items-center">
          <select
            className="px-4 py-2 border border-gray-300 rounded-l"
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="feedback">Feedbacks</option>
            <option value="inquiry">Inquiries</option>
          </select>
          <ReactHTMLTableToExcel
            id="excelButton"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r cursor-pointer ml-2"
            table="inquiriesTable"
            filename="inquiries"
            sheet="inquiries"
            buttonText="Export to Excel"
          />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table id="inquiriesTable" className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-black">No</th>
                <th className="px-4 py-2 border border-black">Email</th>
                <th className="px-4 py-2 border border-black">Type</th>
                <th className="px-4 py-2 border border-black">Text</th>
                <th className="px-4 py-2 border border-black">Operations</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries()
                .slice(startIndex, startIndex + 10)
                .map((inquiry, index) => (
                  <tr key={inquiry._id} className="bg-white">
                    <td className="px-4 py-2 border border-black">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {inquiry.Email}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {inquiry.Type}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {inquiry.Text}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      <div className="flex gap-x-4 justify-center">
                        <button onClick={() => openInfoModal(inquiry._id)}>
                          <BsInfoCircle className="text-green-800 text-2xl" />
                        </button>
                        <Modal
                          isOpen={selectedInfoInquiryId === inquiry._id}
                          onRequestClose={closeInfoModal}
                          style={{
                            content: {
                              top: "50%",
                              left: "50%",
                              right: "auto",
                              bottom: "auto",
                              marginRight: "-50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        >
                          <ShowInquiry inquiryId={inquiry._id} />
                        </Modal>
                        <button onClick={() => openEditModal(inquiry._id)}>
                          <AiOutlineEdit className="text-yellow-600 text-2xl" />
                        </button>
                        <Modal
                          isOpen={selectedEditInquiryId === inquiry._id}
                          onRequestClose={closeEditModal}
                          style={{
                            content: {
                              top: "50%",
                              left: "50%",
                              right: "auto",
                              bottom: "auto",
                              marginRight: "-50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        >
                          <EditInquiry inquiryId={inquiry._id} />
                        </Modal>
                        <button onClick={() => openDeleteModal(inquiry._id)}>
                          <MdOutlineDelete className="text-red-600 text-2xl" />
                        </button>
                        <Modal
                          isOpen={selectedDeleteInquiryId === inquiry._id}
                          onRequestClose={closeDeleteModal}
                          style={{
                            content: {
                              top: "50%",
                              left: "50%",
                              right: "auto",
                              bottom: "auto",
                              marginRight: "-50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        >
                          <DeleteInquiry inquiryId={inquiry._id} />
                        </Modal>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleUpClick}
          disabled={startIndex === 0}
          className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          style={{ width: "100px" }}
        >
          Up
        </button>
        <button
          onClick={handleDownClick}
          disabled={startIndex + 10 >= inquiries.length}
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          style={{ width: "100px" }}
        >
          Down
        </button>
      </div>
    </div>
  );
};

export default HomeInq;
