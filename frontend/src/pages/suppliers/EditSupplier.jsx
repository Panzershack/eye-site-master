import { useState, useEffect } from "react";
import Spinner from "../../components/spinner";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const EditSupplier = ({supplierId}) => {
  const [supplierName, setSupplierName] = useState("");
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState(""); 
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/suppliers/${supplierId}`)
    .then((res) => {
      setProduct(res.data.product);
      setBrand(res.data.brand);
      setSupplierName(res.data.supplierName);
      setEmail(res.data.email);
      setContactNo(res.data.contactNo);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      alert("An error has occured please check console");
      console.log(error);
    });
  }, [supplierId])
  const handleEditSupplier = () => {
    const data = {
      supplierName,
      product,
      brand,
      email,
      contactNo
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/suppliers/${supplierId}`, data)
      .then(() => {
        setLoading(false);
        navigate(`/admin`, { replace: true }); // Reload the page
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Supplier</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">SupplierName</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">Product</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
        <label className="text-xl mr-4 text-grey-500">Brand</label>

          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-grey-500">contactNo</label>
          <input
            type="text"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className="border-2 border-grey-500 px-4 py-2 w-full"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleEditSupplier}>
          Save
        </button>
      </div>
    </div>
  );
};

// Define prop types
EditSupplier.propTypes = {
  supplierId: PropTypes.string.isRequired,
};



export default EditSupplier;
