
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";

// Mocked booking data
interface BookingItem {
  id: string;
  propertyId: number;
  propertyName: string;
  propertyImage: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

const mockBookings: BookingItem[] = [
  {
    id: "booking-1",
    propertyId: 1,
    propertyName: "Luxury Beachfront Villa",
    propertyImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    location: "Malibu, California",
    checkIn: "2025-06-15",
    checkOut: "2025-06-22",
    guests: 4,
    totalPrice: 2093,
    status: "confirmed"
  },
  {
    id: "booking-2",
    propertyId: 3,
    propertyName: "Cozy Mountain Cabin",
    propertyImage: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59",
    location: "Aspen, Colorado",
    checkIn: "2025-07-10",
    checkOut: "2025-07-15",
    guests: 2,
    totalPrice: 945,
    status: "pending"
  },
  {
    id: "booking-3",
    propertyId: 5,
    propertyName: "Historic Downtown Loft",
    propertyImage: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f",
    location: "Boston, Massachusetts",
    checkIn: "2025-05-02",
    checkOut: "2025-05-05",
    guests: 2,
    totalPrice: 537,
    status: "completed"
  }
];

const Bookings = () => {
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  useEffect(() => {
    // Simulate API call
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookings(mockBookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, []);
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };
  
  const getStatusColor = (status: BookingItem['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const renderBookingCard = (booking: BookingItem) => (
    <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={booking.propertyImage} 
            alt={booking.propertyName} 
            className="h-48 md:h-full w-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">
              <Link to={`/property/${booking.propertyId}`} className="hover:text-booking-primary">
                {booking.propertyName}
              </Link>
            </h3>
            <Badge className={`font-normal ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{booking.location}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex items-center text-gray-600 mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Check-in: {formatDate(booking.checkIn)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Check-out: {formatDate(booking.checkOut)}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center text-gray-600 mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span>{Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span>Total: ${booking.totalPrice}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {booking.status === 'confirmed' && (
              <>
                <Button variant="outline" size="sm">Modify</Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">Cancel</Button>
              </>
            )}
            <Link to={`/property/${booking.propertyId}`}>
              <Button size="sm">View Property</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-booking-light">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold mb-6">My Bookings</h1>
          
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <Skeleton className="h-48 md:h-full w-full" />
                        </div>
                        <div className="p-6 md:w-2/3 space-y-4">
                          <div className="flex justify-between">
                            <Skeleton className="h-6 w-1/3" />
                            <Skeleton className="h-6 w-1/6" />
                          </div>
                          <Skeleton className="h-4 w-1/2" />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-2/3" />
                              <Skeleton className="h-4 w-2/3" />
                            </div>
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-1/2" />
                              <Skeleton className="h-4 w-1/3" />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Skeleton className="h-9 w-24" />
                            <Skeleton className="h-9 w-24" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map(renderBookingCard)}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600 mb-4">You don't have any upcoming trips planned yet.</p>
                  <Link to="/listings">
                    <Button className="bg-booking-primary hover:bg-blue-600">
                      Find a place to stay
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-48 md:h-64 w-full rounded-lg" />
                </div>
              ) : pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map(renderBookingCard)}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-2">No past bookings</h3>
                  <p className="text-gray-600">Your booking history will appear here.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bookings;
