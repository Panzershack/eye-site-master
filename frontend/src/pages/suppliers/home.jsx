import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/spinner";
import Modal from "react-modal";

import CreateSupplier from "../suppliers/CreateSupplier";
import ShowSupplier from "../suppliers/ShowSupplier";
import EditSupplier from "../suppliers/EditSupplier";
import DeleteSupplier from "../suppliers/DeleteSupplier";

const Home = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedInfoSupplierId, setSelectedInfoSupplierId] = useState(null);
  const [selectedEditSupplierId, setSelectedEditSupplierId] = useState(null);
  const [selectedDeleteSupplierId, setSelectedDeleteSupplierId] =
    useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/suppliers/")
      .then((response) => {
        setSuppliers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching suppliers. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleDownClick = () => {
    if (startIndex + 10 < suppliers.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleUpClick = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Supplier List</h1>
        <button onClick={() => setShowCreateModal(true)}>
          <MdOutlineAddBox className="text-4xl text-red-600" />
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border border-black">No</th>
                  <th className="px-4 py-2 border border-black">
                    SupplierName
                  </th>
                  <th className="px-4 py-2 border border-black max-md:hidden">
                    Product
                  </th>
                  <th className="px-4 py-2 border border-black max-md:hidden">
                    Brand
                  </th>
                  <th className="px-4 py-2 border border-black">Email</th>
                  <th className="px-4 py-2 border border-black">Contact No</th>
                  <th className="px-4 py-2 border border-black">Operations</th>
                </tr>
              </thead>
              <tbody>
                {suppliers
                  .slice(startIndex, startIndex + 10)
                  .map((supplier, index) => (
                    <tr key={index} className="bg-white">
                      <td className="px-4 py-2 border border-black">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-4 py-2 border border-black">
                        {supplier.supplierName}
                      </td>
                      <td className="px-4 py-2 border border-black">
                        {supplier.product}
                      </td>
                      <td className="px-4 py-2 border border-black">
                        {supplier.brand}
                      </td>
                      <td className="px-4 py-2 border border-black">
                        {supplier.email}
                      </td>
                      <td className="px-4 py-2 border border-black">
                        {supplier.contactNo}
                      </td>
                      <td className="px-4 py-2 border border-black">
                        <div className="flex justify-center">
                          <button
                            onClick={() =>
                              setSelectedInfoSupplierId(supplier._id)
                            }
                          >
                            <BsInfoCircle className="text-green-800 text-2xl mx-2" />
                          </button>
                          <Modal
                            isOpen={selectedInfoSupplierId === supplier._id}
                            onRequestClose={() =>
                              setSelectedInfoSupplierId(null)
                            }
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
                            <ShowSupplier supplierId={supplier._id} />
                          </Modal>
                          <button
                            onClick={() =>
                              setSelectedEditSupplierId(supplier._id)
                            }
                          >
                            <AiOutlineEdit className="text-yellow-600 text-2xl mx-2" />
                          </button>
                          <Modal
                            isOpen={selectedEditSupplierId === supplier._id}
                            onRequestClose={() =>
                              setSelectedEditSupplierId(null)
                            }
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
                            <EditSupplier supplierId={supplier._id} />
                          </Modal>
                          <button
                            onClick={() =>
                              setSelectedDeleteSupplierId(supplier._id)
                            }
                          >
                            <MdOutlineDelete className="text-red-600 text-2xl mx-2" />
                          </button>
                          <Modal
                            isOpen={selectedDeleteSupplierId === supplier._id}
                            onRequestClose={() =>
                              setSelectedDeleteSupplierId(null)
                            }
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
                            <DeleteSupplier supplierId={supplier._id} />
                          </Modal>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          onRequestClose={() => setShowCreateModal(false)}
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
          <CreateSupplier />
        </Modal>
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
          disabled={startIndex + 10 >= suppliers.length}
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          style={{ width: "100px" }}
        >
          Down
        </button>
      </div>
    </div>
  );
};

export default Home;
