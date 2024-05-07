import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-700 text-white p-4 flex items-center justify-between">
      <img
        src="/src/assets/eyesite.png" // Replace with your logo path
        alt="Your Company Logo"
        className="w-10 h-10" // Adjust width and height as needed
      />
      <ul className="flex space-x-10">
        {" "}
        {/* Added space-x-4 for spacing between links */}
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/consultations/create">Create Consultation</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;
