
// This is a mock API service that simulates API calls
// In a real application, you would replace these with actual API calls

import { Property } from "../types/property";

// Mock data for properties
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
    description: "Experience coastal luxury in this stunning beachfront villa with panoramic ocean views. This spacious property features a private pool, modern amenities, and direct beach access.",
    amenities: ["Pool", "Wi-Fi", "Beach Access", "Kitchen", "Parking", "Air Conditioning", "BBQ Grill"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
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
    description: "Stylish apartment in the heart of Manhattan, walking distance to major attractions. Enjoy city living with modern furnishings and spectacular skyline views.",
    amenities: ["Wi-Fi", "Kitchen", "Gym Access", "Doorman", "Air Conditioning", "Washer/Dryer"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
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
    description: "Rustic charm meets modern comfort in this mountain retreat. Perfect for outdoor enthusiasts with hiking trails nearby and a fireplace to warm up after a day of adventures.",
    amenities: ["Fireplace", "Wi-Fi", "Mountain View", "Kitchen", "Parking", "Hiking Trails"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
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
    description: "Luxurious resort suite with full access to amenities including pool, spa, and private beach area. Perfect for a relaxing getaway with ocean views.",
    amenities: ["Pool", "Spa", "Beach Access", "Room Service", "Wi-Fi", "Air Conditioning"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    tags: ["Oceanview", "Resort", "Spa"]
  },
  {
    id: 5,
    title: "Historic Downtown Loft",
    location: "Boston, Massachusetts",
    price: 179,
    rating: 4.5,
    reviewCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f",
    isFeatured: false,
    description: "Charming loft in a converted historic building with exposed brick walls and modern amenities. Located in the heart of downtown with restaurants and attractions nearby.",
    amenities: ["Wi-Fi", "Kitchen", "Washer/Dryer", "Air Conditioning", "Historic Building"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    tags: ["Historic", "Central", "Loft"]
  },
  {
    id: 6,
    title: "Lakefront Cottage",
    location: "Lake Tahoe, California",
    price: 210,
    rating: 4.9,
    reviewCount: 67,
    imageUrl: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce",
    isFeatured: false,
    description: "Serene cottage on the shores of Lake Tahoe. Enjoy water activities, beautiful sunsets, and cozy evenings by the fireplace.",
    amenities: ["Waterfront", "Fireplace", "Deck", "Kitchen", "Parking", "Boat Dock"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    tags: ["Lakefront", "Nature", "Relaxing"]
  },
  {
    id: 7,
    title: "Urban Micro Studio",
    location: "Portland, Oregon",
    price: 89,
    rating: 4.6,
    reviewCount: 35,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    isFeatured: false,
    description: "Compact and efficiently designed studio in Portland's trendy district. Perfect for solo travelers or couples exploring the city.",
    amenities: ["Wi-Fi", "Kitchenette", "Smart TV", "Bike Storage", "Eco-Friendly"],
    maxGuests: 2,
    bedrooms: 0, // Studio
    bathrooms: 1,
    tags: ["Urban", "Compact", "Trendy"]
  },
  {
    id: 8,
    title: "Desert Retreat with Pool",
    location: "Scottsdale, Arizona",
    price: 249,
    rating: 4.8,
    reviewCount: 51,
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
    isFeatured: false,
    description: "Modern oasis in the desert with private pool and stunning views. Perfect for relaxation and experiencing the unique desert landscape.",
    amenities: ["Private Pool", "Patio", "Desert View", "Wi-Fi", "Kitchen", "Air Conditioning"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    tags: ["Desert", "Pool", "Views"]
  }
];

// Simulated API endpoints
export const api = {
  // Get all properties
  getProperties: async (): Promise<Property[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_PROPERTIES;
  },
  
  // Get featured properties
  getFeaturedProperties: async (): Promise<Property[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_PROPERTIES.filter(property => property.isFeatured);
  },
  
  // Get single property by ID
  getPropertyById: async (id: number): Promise<Property | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PROPERTIES.find(property => property.id === id);
  },
  
  // Search properties
  searchProperties: async (query: string): Promise<Property[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const lowercaseQuery = query.toLowerCase();
    
    return MOCK_PROPERTIES.filter(property => 
      property.title.toLowerCase().includes(lowercaseQuery) || 
      property.location.toLowerCase().includes(lowercaseQuery)
    );
  },
  
  // Mock user authentication
  login: async (email: string, password: string): Promise<{ success: boolean; message: string; userId?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // This is just a demo - in a real app, you would make an API call to verify credentials
    if (email === "demo@example.com" && password === "password123") {
      return {
        success: true,
        message: "Login successful",
        userId: "user-123"
      };
    }
    
    return {
      success: false,
      message: "Invalid email or password"
    };
  },
  
  // Mock user registration
  register: async (name: string, email: string, password: string): Promise<{ success: boolean; message: string; userId?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This is just a demo - in a real app, you would make an API call to register the user
    if (email !== "existing@example.com") {
      return {
        success: true,
        message: "Registration successful",
        userId: "user-" + Math.floor(Math.random() * 1000)
      };
    }
    
    return {
      success: false,
      message: "Email already in use"
    };
  },
  
  // Mock booking creation
  createBooking: async (propertyId: number, checkIn: Date, checkOut: Date, guests: number): Promise<{ success: boolean; message: string; bookingId?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // This is just a demo - in a real app, you would make an API call to create a booking
    return {
      success: true,
      message: "Booking successful",
      bookingId: `booking-${Math.floor(Math.random() * 10000)}`
    };
  }
};
