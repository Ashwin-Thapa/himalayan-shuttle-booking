




export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface ShuttleType {
  id: string;
  name: string;
}

export type BookingStep = 'map_selection' | 'fare_estimate' | 'confirmation' | 'payment' | 'booked';
export type AppView = 'booking' | 'login' | 'signup' | 'profile' | 'driver';
export type RideStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled_by_driver' | 'cancelled_by_user';

export interface GeoPoint {
  lat: number;
  lng: number;
}
export interface SearchParams {
  pickup: { name: string; point: GeoPoint };
  destination: { name: string; point: GeoPoint };
  journeyDate: string;
  journeyTime: string;
  passengers: number;
  shuttleType: string;
}

export interface SearchResult {
  id:string;
  fromName: string;
  toName: string;
  shuttleTypeId: string;
  shuttleTypeName: string;
  journeyDate: string;
  departureTime: string; // e.g., "10:00"
  estimatedDurationHours: number; // Replaces arrivalTime for better clarity
  price: number; // Total price for the vehicle
  passengers: number;
  distanceKm: number;
  searchParams: SearchParams; // Keep original search params
}

export interface PassengerDetails { // Represents contact details for the booking
  fullName: string;
  email: string;
  phoneNumber: string;
}

export type DarshanPassType = 'none' | 'general' | 'vip';

export interface User {
  id: string;
  fullName: string;
  email: string;
  rating: number; // e.g., 4.8
  totalRides: number; // e.g., 25
}

// This payload represents a ride request sent to drivers
export interface ConfirmedBookingPayload {
  id: string; // Unique ID for this specific ride instance
  status: RideStatus;
  shuttleDetails: SearchResult;
  passengerContact: PassengerDetails;
  darshanPassType: DarshanPassType;
  prefersVegMeals: boolean;
  finalPrice: number;
  driver?: User | null; // The driver who accepts the ride
  passengerUser?: User | null; // The user who booked the ride
}


export interface AiHotelSuggestion {
  name: string;
  description: string;
  bookingLink: string;
}

export interface AiTravelSuggestion {
  hotels: AiHotelSuggestion[];
  mealIdeas: string[];
  tip: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: Date;
  isLoading?: boolean;
  error?: boolean;
  image?: string; // Optional: base64 string for an image
}