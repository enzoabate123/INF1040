
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Home, Search, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-booking-primary">
            <Home size={24} />
          </span>
          <span className="font-serif text-xl font-bold text-booking-dark">TripTide</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/listings" className="text-gray-600 hover:text-booking-primary transition-colors">
            Explore
          </Link>
          <Link to="/featured" className="text-gray-600 hover:text-booking-primary transition-colors">
            Featured
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-booking-primary transition-colors">
            About
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-booking-primary">
              <Search size={20} />
            </Button>
          </Link>
          <Link to="/bookings">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-booking-primary">
              <Calendar size={20} />
            </Button>
          </Link>
          <div className="hidden md:block">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-booking-primary">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-booking-primary hover:bg-blue-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              <User size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-2 px-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <Link to="/listings" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              Explore
            </Link>
            <Link to="/featured" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              Featured
            </Link>
            <Link to="/about" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              About
            </Link>
            <Link to="/login" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              Sign In
            </Link>
            <Link to="/signup" className="px-4 py-2 text-gray-600 hover:bg-booking-primary hover:text-white rounded-md">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
