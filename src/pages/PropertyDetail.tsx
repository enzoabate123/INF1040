
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Property } from "@/types/property";
import { api } from "@/services/api";
import { Calendar as CalendarIcon, MapPin, Star, Users, Bed, Bath, Check } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const propertyId = parseInt(id);
        const data = await api.getPropertyById(propertyId);
        if (data) {
          setProperty(data);
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperty();
  }, [id, navigate]);
  
  useEffect(() => {
    // Calculate total price based on dates
    if (property && checkIn && checkOut) {
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      setTotalPrice(property.price * nights);
    } else {
      setTotalPrice(0);
    }
  }, [property, checkIn, checkOut]);
  
  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login or signup to book this property",
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/property/${id}` } });
      return;
    }
    
    if (!property || !checkIn || !checkOut) {
      toast({
        title: "Incomplete booking details",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const result = await api.createBooking(property.id, checkIn, checkOut, guests);
      
      if (result.success) {
        toast({
          title: "Booking confirmed!",
          description: `Your booking at ${property.title} has been confirmed.`,
        });
        navigate("/bookings");
      } else {
        toast({
          title: "Booking failed",
          description: result.message || "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Booking error",
        description: "An error occurred while processing your booking",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="space-y-6">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-96 w-full rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
              <div>
                <Skeleton className="h-80 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!property) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-serif font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{property.rating}</span>
                <span className="text-gray-500 text-sm ml-1">({property.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
          
          {/* Property Image */}
          <div className="mb-8">
            <img 
              src={property.imageUrl} 
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Property Details */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-xl font-semibold mb-2">About this property</h2>
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{property.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 mr-2" />
                      <span>{property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-2" />
                      <span>{property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{property.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <Check className="h-4 w-4 text-booking-primary mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Property Location - In a real app, this would be a map */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-3">Location</h2>
                <div className="bg-gray-200 rounded h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>Map view available in the full application</p>
                    <p className="text-sm">{property.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-semibold">
                    <span>${property.price}</span>
                    <span className="text-gray-500 text-base"> / night</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span>{property.rating}</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            disabled={(date) => 
                              date < new Date() || 
                              (checkIn && date <= checkIn)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-booking-primary"
                    >
                      {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    onClick={handleBooking} 
                    className="w-full bg-booking-primary hover:bg-blue-600"
                  >
                    Book Now
                  </Button>
                </div>
                
                {checkIn && checkOut && totalPrice > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>${property.price} x {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Service fee</span>
                      <span>${Math.round(totalPrice * 0.1)}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                      <span>Total</span>
                      <span>${totalPrice + Math.round(totalPrice * 0.1)}</span>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  You won't be charged yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
