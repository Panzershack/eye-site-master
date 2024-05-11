import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/spinner";


const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5500/items`)
      .then((res) => {
        setItems(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Item list</h1>
        <Link to="/items/create">
          <MdOutlineAddBox className="text-red-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (

        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">
                Item Title
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Item Price
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Company
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Colour
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Category
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Description
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Image
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {item.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {item.price}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {item.company}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {item.colour}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {item.category}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {item.description}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  <img src={item.image} alt={item.title} className="h-10 w-10" />
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/items/details/${item._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/items/edit/${item._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600" />
                    </Link>
                    <Link to={`/items/delete/${item._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
             
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
