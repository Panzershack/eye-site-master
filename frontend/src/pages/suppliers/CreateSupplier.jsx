import { useState } from "react"
import Spinner from "../../components/spinner"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const CreateSupplier = () => {
  const [supplierName, setSupplierName] = useState("");
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSavedSupplier = () => {
    const data = {
      supplierName,
      product,
      brand,
      email,
      contactNo
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/suppliers/`, data)
      .then(() => {
        setLoading(false);
        navigate(`/admin`, { replace: true }); // Reload the page
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        console.log(error);
      })

  };


  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Create Supplier</h1>
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
        <button className="p-2 bg-sky-300 m-8" onClick={handleSavedSupplier}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateSupplier