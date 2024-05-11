import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/backButton";
import Spinner from "../../components/spinner";

const ShowItem = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/items/${id}`);
        setItem(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Product Details</h1>
      <div className="flex flex-col border-2 border-red-600 rounded-xl w-fit p-4 mx-auto">
        <div className="my-4 flex justify-center items-center">
          {/* Use item.image directly as the src attribute */}
          <img src={item.image} alt="Product" className="w-48 h-48 mr-4" />
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-500">Id</span>
          <span>{item._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-500">Title</span>
          <span>{item.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-500">Price</span>
          <span>{item.price}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-500">Company</span>
          <span>{item.company}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-500">Colour</span>
          <span>{item.colour}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-500">Category</span>
          <span>{item.category}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-grey-500">Description</span>
          <span>{item.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;
