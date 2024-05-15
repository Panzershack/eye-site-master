
const AdminNavbar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="bg-red-700 text-white p-4 flex items-center justify-between"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <img
        src="/src/assets/eyesite.png" // Replace with your logo path
        alt="Your Company Logo"
        className="w-10 h-10" // Adjust width and height as needed
      />
      <ul className="flex space-x-10">
        {/* Added space-x-4 for spacing between links */}
        <li
          onClick={() => scrollToSection("consultations")}
          style={{ cursor: "pointer" }}
        >
          Consultation
        </li>
        <li
          onClick={() => scrollToSection("inquiries")}
          style={{ cursor: "pointer" }}
        >
          Inquiries
        </li>
        <li
          onClick={() => scrollToSection("employees")}
          style={{ cursor: "pointer" }}
        >
          Employees
        </li>
        <li
          onClick={() => scrollToSection("items")}
          style={{ cursor: "pointer" }}
        >
          Items
        </li>
        <li
          onClick={() => scrollToSection("suppliers")}
          style={{ cursor: "pointer" }}
        >
          Suppliers
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
