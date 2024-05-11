import ConsultationsTableComponent from "../pages/consultations/Home";
import InquiriesTableComponent from "../pages/inquiries/Home";
import EmployeeTableComponent from "../pages/employees/Home";
import ItemTableComponent from "../pages/items/Home";
import SupplierTableComponent from "../pages/suppliers/home";


const AdminDashBoard = () => {




  return (
    <div className="app">
      <div
        className="section section1"
        style={{ width: "100vw", height: "100vh", backgroundColor: "yellow" }}
      >
        <ConsultationsTableComponent/>
      </div>

      {/* Section 2 */}
      <div
        className="section section1"
        style={{ width: "100vw", height: "100vh", backgroundColor: "red" }}
      >
        <InquiriesTableComponent />
        {/* Content for Section 1 */}
      </div>

      {/* Section 3 */}
      <div
        className="section section1"
        style={{ width: "100vw", height: "100vh", backgroundColor: "green" }}
      >
        <EmployeeTableComponent />
        {/* Content for Section 1 */}
      </div>

      {/* Section 4 */}
      <div
        className="section section1"
        style={{ width: "100vw", height: "100vh", backgroundColor: "yellow" }}
      >
        <ItemTableComponent />
        {/* Content for Section 1 */}
      </div>
      {/* Section 5 */}
      <div
        className="section section1"
        style={{ width: "100vw", height: "100vh", backgroundColor: "blue" }}
      >
        <SupplierTableComponent />
        {/* Content for Section 1 */}
      </div>
    </div>
  );
};

export default AdminDashBoard;
