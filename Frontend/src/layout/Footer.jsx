import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Navigation Links */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-indigo-400">
                  Jobs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">Email: support@jobportal.com</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p className="mb-2">Address: 123 Career Lane, Talent City, 12345</p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                to="https://www.facebook.com"
                target="_blank"
                className="text-gray-300 hover:text-indigo-400"
              >
                <i className="fab fa-facebook-f"></i> Facebook
              </Link>
              <Link
                to="https://www.twitter.com"
                target="_blank"
                className="text-gray-300 hover:text-indigo-400"
              >
                <i className="fab fa-twitter"></i> Twitter
              </Link>
              <Link
                to="https://www.linkedin.com"
                target="_blank"
                className="text-gray-300 hover:text-indigo-400"
              >
                <i className="fab fa-linkedin-in"></i> LinkedIn
              </Link>
              <Link
                to="https://www.instagram.com"
                target="_blank"
                className="text-gray-300 hover:text-indigo-400"
              >
                <i className="fab fa-instagram"></i> Instagram
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-10 text-center text-gray-400">
          <p>&copy; 2025 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
