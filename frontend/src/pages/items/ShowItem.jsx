import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Spinner from "../../components/spinner";

const ShowItem = ({ itemId }) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5555/items/${itemId}`
        );
        setItem(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Product Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <div className="my-4 flex justify-center items-center">
            {/* Use item.image directly as the src attribute */}
            <img src={item.image} alt="Product" className="w-48 h-48 mr-4" />
          </div>
        </div>
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
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
    </div>
  );
};

// Define prop types
ShowItem.propTypes = {
  itemId: PropTypes.string.isRequired,
};

export default ShowItem;
