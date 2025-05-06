
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  
  const handleSearch = () => {
    // In a real app, this would pass search parameters to the listings page
    navigate('/listings');
  };
  
  return (
    <section className="relative h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
          alt="Beautiful destination" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Find your perfect getaway
          </h1>
          <p className="text-xl text-white mb-8 max-w-lg">
            Discover the best places to stay at unbeatable prices, creating memories that last a lifetime.
          </p>
          
          {/* Search Box */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="Where are you going?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-booking-primary"
                />
              </div>
              
              {/* Check-in */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Check-out */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Guests */}
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <div className="flex">
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-booking-primary"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                  <Button 
                    onClick={handleSearch}
                    className="rounded-l-none bg-booking-primary hover:bg-blue-600"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
