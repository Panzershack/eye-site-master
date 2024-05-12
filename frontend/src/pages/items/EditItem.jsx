import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const EditItem = ({ itemId }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [colour, setColour] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/items/${itemId}`)
      .then((res) => {
        setTitle(res.data.title);
        setPrice(res.data.price);
        setCompany(res.data.company);
        setColour(res.data.colour);
        setCategory(res.data.category);
        setDescription(res.data.description);
        setImage(res.data.image);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error has occurred. Please check console");
        console.log(error);
      });
  }, [itemId]);

  const handleEditItem = () => {
    const data = {
      title,
      price,
      company,
      colour,
      category,
      description,
      image,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/items/${itemId}`, data)
      .then(() => {
        setLoading(false);
        navigate(`/admin`, { replace: true }); // Reload the page
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Items</h1>
      {loading ? <Spinner /> : ""}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Brand</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Opticals for</label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            >
              <option value="Gents">Gents</option>
              <option value="Ladies">Ladies</option>
              <option value="Unisex">Unisex</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Colour</label>
            <select
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            >
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Brown">Brown</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
              <option value="White">White</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            >
              <option value="Sunglasses">Sunglasses</option>
              <option value="Spectacles">Spectacles</option>
              <option value="Lenses">Lenses</option>
            </select>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            />
          </div>
        </div>
      </div>
      <div className="my-4">
        <label className="text-xl mr-4 text-grey-500">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={convertToBase64}
          className="border-2 border-grey-500 px-4 py-2 w-full"
        />
        {image !== "" && image !== null && (
          <img width={100} height={100} src={image} alt="Selected" />
        )}
      </div>
      <button className="p-2 bg-red-600 m-8" onClick={handleEditItem}>
        Save
      </button>
    </div>
  );
};

// Define prop types
EditItem.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default EditItem;
