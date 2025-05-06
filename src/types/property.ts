
export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isFeatured: boolean;
  description: string;
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  tags: string[];
}
