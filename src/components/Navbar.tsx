// src/components/Navbar.tsx
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-amber-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Library Management
        </Link>
        <div className="flex space-x-4">
          <Link to="/books" className="hover:underline">
            Books
          </Link>
          <Link to="/create-book" className="hover:underline">
            Add Book
          </Link>
          <Link to="/borrow-summary" className="hover:underline">
            Borrow Summary
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
