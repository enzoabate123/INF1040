
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { api } from "@/services/api";
import { Property } from "@/types/property";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, SlidersHorizontal } from "lucide-react";

const Listings = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await api.getProperties();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);
  
  // Handle search and filtering
  const handleSearch = () => {
    let results = [...properties];
    
    if (searchTerm) {
      results = results.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    results = results.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    setFilteredProperties(results);
  };
  
  // Handle price range change
  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-booking-light py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Find Your Perfect Stay</h1>
            <p className="text-gray-600">
              Browse our selection of properties and find the one that fits your needs.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Input 
                  placeholder="Search by location or property name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </span>
              </div>
              
              <Button 
                onClick={() => setShowFilters(!showFilters)} 
                variant="outline" 
                className="flex items-center"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              
              <Button onClick={handleSearch}>
                Search
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    placeholder="Min"
                    min={0}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                    className="w-24"
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    min={0}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                    className="w-24"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Listings;
