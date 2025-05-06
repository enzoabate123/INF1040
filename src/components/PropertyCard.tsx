
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isFeatured?: boolean;
  tags?: string[];
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  rating,
  reviewCount,
  imageUrl,
  isFeatured = false,
  tags = [],
}: PropertyCardProps) => {
  return (
    <Link to={`/property/${id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-lg">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="h-48 w-full object-cover"
          />
          {isFeatured && (
            <Badge className="absolute top-2 right-2 bg-booking-accent">
              Featured
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
              <p className="text-gray-500 text-sm">{location}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
              <span className="text-gray-500 text-xs ml-1">({reviewCount})</span>
            </div>
          </div>
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="px-4 py-3 border-t flex justify-between items-center">
          <div>
            <span className="font-semibold">${price}</span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>
          <Badge className="bg-booking-primary">Book Now</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
