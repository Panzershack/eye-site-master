import { useEffect, useState } from "react"
import axios from "axios"
import Spinner from "../../components/spinner"
import PropTypes from "prop-types";

const ShowSupplier = ({supplierId}) => {
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/suppliers/${supplierId}`)
      .then((res) => {
        setSupplier(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [supplierId]);

  return (
    <div className="p-4">
  <h1 className="text-3xl my-4">Show Supplier</h1>
  {loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Id</span>
        <span>{supplier._id}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">SupplierName</span>
        <span>{supplier.supplierName}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Product</span>
        <span>{supplier.product}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Brand</span>
        <span>{supplier.brand}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Email</span>
        <span>{supplier.email}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">ContactNo</span>
        <span>{supplier.contactNo}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Created Date</span>
        <span>{new Date(supplier.createdAt).toString()}</span>
      </div>
      <div className="my-4">
        <span className="text-xl mr-4 text-grey-500">Last Updated Date</span>
        <span>{new Date(supplier.updatedAt).toString()}</span>
      </div>
    </div>
  )}
</div>
  );
}

// Define prop types
ShowSupplier.propTypes = {
  supplierId: PropTypes.string.isRequired,
};


export default ShowSupplier;

