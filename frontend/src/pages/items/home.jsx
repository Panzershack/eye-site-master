import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/spinner";
import Modal from "react-modal";

import ShowItem from "../items/ShowItem";
import EditItem from "../items/EditItem";
import DeleteItem from "../items/DeleteItem";
import CreateItem from "./CreateItem";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedInfoItemId, setSelectedInfoItemId] = useState(null);
  const [selectedEditItemId, setSelectedEditItemId] = useState(null);
  const [selectedDeleteItemId, setSelectedDeleteItemId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/items")
      .then((res) => {
        setItems(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching items. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleDownClick = () => {
    if (startIndex + 5 < items.length) {
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
        <h1 className="text-3xl">Item List</h1>
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
                  <th className="px-4 py-2 border border-black">Brand Name</th>
                  <th className="px-4 py-2 border border-black max-md:hidden">
                    Item Price
                  </th>
                  <th className="px-4 py-2 border border-black max-md:hidden">
                    Optical for
                  </th>
                  <th className="px-4 py-2 border border-black max-md:hidden">
                    Colour
                  </th>
                  <th className="px-4 py-2 border border-black max-md:hidden">
                    Category
                  </th>
                  <th className="px-4 py-2 border border-black max-md:hidden">
                    Description
                  </th>
                  <th className="px-4 py-2 border border-black max-md:hidden">
                    Image
                  </th>
                  <th className="px-4 py-2 border border-black">Operations</th>
                </tr>
              </thead>
              <tbody>
                {items.slice(startIndex, startIndex + 5).map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 border border-black">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {item.title}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {item.price}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {item.company}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {item.colour}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {item.category}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      {item.description}
                    </td>
                    <td className="px-4 py-2 border border-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-10 w-10"
                      />
                    </td>
                    <td className="px-4 py-2 border border-black">
                      <div className="flex justify-center">
                        <button onClick={() => setSelectedInfoItemId(item._id)}>
                          <BsInfoCircle className="text-green-800 text-2xl mx-2" />
                        </button>
                        <Modal
                          isOpen={selectedInfoItemId === item._id}
                          onRequestClose={() => setSelectedInfoItemId(null)}
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
                          <ShowItem itemId={item._id} />
                        </Modal>
                        <button onClick={() => setSelectedEditItemId(item._id)}>
                          <AiOutlineEdit className="text-yellow-600 text-2xl mx-2" />
                        </button>
                        <Modal
                          isOpen={selectedEditItemId === item._id}
                          onRequestClose={() => setSelectedEditItemId(null)}
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
                          <EditItem itemId={item._id} />
                        </Modal>
                        <button
                          onClick={() => setSelectedDeleteItemId(item._id)}
                        >
                          <MdOutlineDelete className="text-red-600 text-2xl mx-2" />
                        </button>
                        <Modal
                          isOpen={selectedDeleteItemId === item._id}
                          onRequestClose={() => setSelectedDeleteItemId(null)}
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
                          <DeleteItem itemId={item._id} />
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
          <CreateItem />
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
          disabled={startIndex + 5 >= items.length}
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
