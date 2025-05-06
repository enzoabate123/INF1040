
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isFeatured: boolean;
  tags: string[];
}

const MOCK_PROPERTIES: Property[] = [
  {
    id: 1,
    title: "Luxury Beachfront Villa",
    location: "Malibu, California",
    price: 299,
    rating: 4.9,
    reviewCount: 124,
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    isFeatured: true,
    tags: ["Beachfront", "Pool", "Luxury"]
  },
  {
    id: 2,
    title: "Modern Downtown Apartment",
    location: "New York City, NY",
    price: 159,
    rating: 4.7,
    reviewCount: 89,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    isFeatured: true,
    tags: ["City View", "Modern", "Central"]
  },
  {
    id: 3,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado",
    price: 189,
    rating: 4.8,
    reviewCount: 56,
    imageUrl: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59",
    isFeatured: true,
    tags: ["Mountain View", "Fireplace", "Hiking"]
  },
  {
    id: 4,
    title: "Seaside Resort Suite",
    location: "Miami Beach, Florida",
    price: 219,
    rating: 4.6,
    reviewCount: 78,
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    isFeatured: true,
    tags: ["Oceanview", "Resort", "Spa"]
  }
];

const FeaturedSection = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        setProperties(MOCK_PROPERTIES);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="py-12 bg-booking-light">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl">
            Discover our handpicked selection of exceptional properties that offer 
            unique experiences and outstanding comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))
          ) : (
            // Actual property cards
            properties.map(property => (
              <PropertyCard key={property.id} {...property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
