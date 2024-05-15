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
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!title) {
      valid = false;
      newErrors.title = "Brand name is required.";
    }
    if (!price) {
      valid = false;
      newErrors.price = "Price is required.";
    }
    if (!company || company === "Select") {
      valid = false;
      newErrors.company = "Please select who the opticals are for.";
    }
    if (!colour || colour === "Select") {
      valid = false;
      newErrors.colour = "Please select a color.";
    }
    if (!category || category === "Select") {
      valid = false;
      newErrors.category = "Please select a category.";
    }
    if (!description) {
      valid = false;
      newErrors.description = "Description is required.";
    }
    if (!image) {
      valid = false;
      newErrors.image = "Image is required.";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEditItem = () => {
    if (!validateForm()) {
      return;
    }

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
        setLoading(false);
      });
  };

  function convertToBase64(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;

      img.onload = function () {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const widthRatio = MAX_WIDTH / width;
          const heightRatio = MAX_HEIGHT / height;
          const minRatio = Math.min(widthRatio, heightRatio);
          width *= minRatio;
          height *= minRatio;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressImage = (quality) => {
          const compressedImageData = canvas.toDataURL(file.type, quality);
          const base64Size = (compressedImageData.length * 3) / 4 - (compressedImageData.indexOf(',') + 1);

          if (base64Size <= 40000 || quality <= 0.1) {
            setImage(compressedImageData);
          } else {
            compressImage(quality - 0.05);
          }
        };

        compressImage(0.9);
      };
    };

    reader.readAsDataURL(file);
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
            {errors.title && <p className="text-red-500">{errors.title}</p>}
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
            {errors.company && <p className="text-red-500">{errors.company}</p>}
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
            {errors.price && <p className="text-red-500">{errors.price}</p>}
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
            {errors.colour && <p className="text-red-500">{errors.colour}</p>}
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
            {errors.category && <p className="text-red-500">{errors.category}</p>}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-grey-500">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-grey-500 px-4 py-2 w-full"
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}
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
        {errors.image && <p className="text-red-500">{errors.image}</p>}
        {image && (
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
