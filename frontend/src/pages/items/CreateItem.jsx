import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backButton";
import Spinner from "../../components/spinner";
import axios from "axios";

const CreateItem = () => {
  const [title, setTitle] = useState(""); 
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [colour, setColour] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // Change to store image as a file object
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSavedItem = () => {
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
      .post(`http://localhost:5555/items`, data)
      .then(() => {
        setLoading(false);
        navigate(`/`);
      })
      .catch((error) => {
        console.log(error);
      });
  };




//   function convertToBase64(e) {
//  console.log(e);
//  var reader = new FileReader();
//   reader.readAsDataURL(e.target.files[0]);
//   reader.onload = function () {
//     console.log(reader.result);
//     setImage(reader.result);
//   };
//   reader.onerror = function (error) {
//     console.log("Error: ", error);
//   };
//   }
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

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedImageData = canvas.toDataURL(file.type, 0.7); // Adjust compression quality as needed (0.7 = 70% quality)

      setImage(compressedImageData);
    };
  };

  reader.readAsDataURL(file);
}

  
  


  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Items</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-red-600 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
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
          <label className="text-xl mr-4 text-grey-500">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Colour</label>
          <input
            type="text"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
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
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={convertToBase64}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
          {image ==""|| image == null ?"": <img width={100} height={100} src={image}/> }
          
        </div>
        <button
          className="p-2 bg-red-600 m-8"
          onClick={handleSavedItem}
        >
          Save
        </button>
      </div>
    </div>
  );
};
  

export default CreateItem;
