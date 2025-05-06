
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-booking-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">TripTide</h3>
            <p className="text-gray-300 mb-4">
              Find your perfect stay with the best prices and 
              exclusive deals on accommodations worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link to="/press" className="text-gray-300 hover:text-white">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              <li><Link to="/safety" className="text-gray-300 hover:text-white">Safety Center</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Get the App</h4>
            <p className="text-gray-300 mb-4">
              Download our mobile app for a better experience.
            </p>
            <div className="flex flex-col space-y-2">
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                App Store
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                Google Play
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TripTide. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 text-sm hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
