
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FeaturedSection />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Why Choose TripTide</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the TripTide difference and see why travelers around the world prefer our booking platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-booking-secondary flex items-center justify-center">
                <span className="text-booking-primary text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                Find a lower price elsewhere? We'll match it and give you an additional discount.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-booking-secondary flex items-center justify-center">
                <span className="text-booking-primary text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600">
                Your personal information and payment details are always protected with our secure booking system.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-booking-secondary flex items-center justify-center">
                <span className="text-booking-primary text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Our friendly customer service team is available around the clock to assist with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
