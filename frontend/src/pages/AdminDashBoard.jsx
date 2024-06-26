import ConsultationsTableComponent from "../pages/consultations/Home";
import InquiriesTableComponent from "../pages/inquiries/Home";
import EmployeeTableComponent from "../pages/employees/Home";
import ItemTableComponent from "../pages/items/Home";
import SupplierTableComponent from "../pages/suppliers/home";
import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { database } from "../authentication/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/adminNavbar";

const withAuthProtection = (Component) => {
  const AuthenticatedComponent = (props) => {
    const history = useNavigate();

    useEffect(() => {
      const user = database.currentUser;
      if (!user) {
        // If user is not authenticated, redirect to login page
        history("/reglog");
      }
    }, []);

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

const AdminDashBoard = () => {
  const history = useNavigate();

  const handleClick = () => {
    signOut(database)
      .then(() => {
        console.log("Signed out successfully");
        history("/reglog");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  return (
    <div className="app">
      <AdminNavbar />
      <button
        onClick={handleClick}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
      <div
        id="consultations"
        className="section section1"
        style={{
          width: "100vw",
          height: "100vh",
          border: "5px solid black",
        }}
      >
        <ConsultationsTableComponent />
      </div>

      {/* Section 2 */}
      <div
        id="inquiries"
        className="section section1"
        style={{
          width: "100vw",
          height: "100vh",
          border: "5px solid black",
        }}
      >
        <InquiriesTableComponent />
        {/* Content for Section 1 */}
      </div>

      {/* Section 3 */}
      <div
        id="employees"
        className="section section1"
        style={{
          width: "100vw",
          height: "100vh",
          border: "5px solid black",
        }}
      >
        <EmployeeTableComponent />
        {/* Content for Section 1 */}
      </div>

      {/* Section 4 */}
      <div
        id="items"
        className="section section1"
        style={{
          width: "100vw",
          height: "100vh",
          border: "5px solid black",
        }}
      >
        <ItemTableComponent />
        {/* Content for Section 1 */}
      </div>
      {/* Section 5 */}
      <div
        id="suppliers"
        className="section section1"
        style={{
          width: "100vw",
          height: "100vh",
          border: "5px solid black",
        }}
      >
        <SupplierTableComponent />
        {/* Content for Section 1 */}
      </div>
    </div>
  );
};

export default withAuthProtection(AdminDashBoard);
