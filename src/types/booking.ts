
export interface Booking {
  id: string;
  propertyId: number;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}
