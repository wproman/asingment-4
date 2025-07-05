import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">📚 MyLibrary</h2>
          <p className="text-gray-400">
            Your favorite place for books and learning resources.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:underline text-gray-300">
                Books
              </Link>
            </li>
            <li>
              <Link
                to="/borrow-summary"
                className="hover:underline text-gray-300"
              >
                Borrow Summary
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-gray-400">
            Email:{" "}
            <a href="mailto:support@mylibrary.com" className="underline">
              support@mylibrary.com
            </a>
          </p>
          <p className="text-gray-400 mt-2">
            Address: 123 Book Street, Library City
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyLibrary. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
