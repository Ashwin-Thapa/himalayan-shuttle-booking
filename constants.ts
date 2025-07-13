

import { Location, ShuttleType, DarshanPassType } from './types';

export const locations: Location[] = [
  { id: 'shillong_city', name: 'Shillong City (Meghalaya)', lat: 25.5789, lng: 91.8933 },
  { id: 'guwahati_city', name: 'Guwahati City (Assam)', lat: 26.1445, lng: 91.7362 },
  { id: 'shillong_airport', name: 'Shillong Airport (Meghalaya)', lat: 25.7036, lng: 91.9088 },
  { id: 'guwahati_airport', name: 'Guwahati Airport (Assam)', lat: 26.1062, lng: 91.5859 },
  { id: 'kamakhya_temple', name: 'Kamakhya Temple (Guwahati, Assam)', lat: 26.1664, lng: 91.7058 },
  { id: 'cherrapunji', name: 'Cherrapunji (Sohra, Meghalaya)', lat: 25.2706, lng: 91.7302 },
  { id: 'mawlynnong', name: 'Mawlynnong Village (Meghalaya)', lat: 25.1972, lng: 92.0195 },
  { id: 'dawki', name: 'Dawki & Shnongpdeng (Meghalaya)', lat: 25.1841, lng: 92.0163 },
  { id: 'kaziranga', name: 'Kaziranga National Park (Assam)', lat: 26.5775, lng: 93.1711 },
  // Hub Locations
  { id: 'shillong_police_bazaar_hub', name: 'Police Bazaar Hub (Shillong)', lat: 25.5761, lng: 91.8847 },
  { id: 'guwahati_khanapara_hub', name: 'Khanapara Hub (Guwahati)', lat: 26.1206, lng: 91.8023 },
  // Arunachal Pradesh Routes
  { id: 'tawang', name: 'Tawang (Arunachal Pradesh)', lat: 27.5878, lng: 91.8596 },
  { id: 'bomdila', name: 'Bomdila (Arunachal Pradesh)', lat: 27.2552, lng: 92.4069 },
  { id: 'itanagar', name: 'Itanagar (Arunachal Pradesh)', lat: 27.0844, lng: 93.6053 },
  { id: 'ziro', name: 'Ziro (Arunachal Pradesh)', lat: 27.6332, lng: 93.8321 },
  { id: 'dirang', name: 'Dirang (Arunachal Pradesh)', lat: 27.3599, lng: 92.2662 },
];


export const shuttleTypes: ShuttleType[] = [
  { id: 'sedan', name: 'Sedan (Up to 4 passengers)' },
  { id: 'suv', name: 'SUV (Up to 6-7 passengers)' },
  { id: 'muv', name: 'MUV (Up to 6-7 passengers)' },
  { id: 'tempo_traveller', name: 'Tempo Traveller (Up to 12 passengers)' },
];

export const DARSHAN_PASS_PRICES: Record<Exclude<DarshanPassType, 'none'>, number> = {
  general: 500,
  vip: 1000,
};

export interface StaticHotelSuggestion {
  name: string;
  type: string; // e.g., "Luxury", "Mid-range", "Budget", "Resort", "Guesthouse", "Pilgrim-friendly"
  description: string; // Short description
  mealIdeas?: string[]; // Optional: e.g., ["Local Khasi cuisine", "Vegetarian thali"]
  tags?: string[]; // Optional tags like "Scenic View", "Near Temple", "Family-friendly"
  bookingLink?: string;
}

export const staticHotelSuggestionsByLocationId: Record<string, StaticHotelSuggestion[]> = {
  'shillong_city': [
    { name: 'Hotel Polo Towers', type: 'Luxury', description: 'Known for its comfort and amenities in the city center.', mealIdeas: ["Multi-cuisine restaurant", "Nearby cafes for local snacks"], bookingLink: 'https://www.booking.com/searchresults.html?ss=Hotel+Polo+Towers+Shillong' },
    { name: 'Ri Kynjai - Serenity by the Lake', type: 'Resort', description: 'Eco-resort offering traditional Khasi cottages with lake views.', mealIdeas: ["In-house restaurant with Khasi specialties", "Continental options"], bookingLink: 'https://www.booking.com/searchresults.html?ss=Ri+Kynjai+Serenity+by+the+Lake+Shillong' },
    { name: 'Assembly Guest House', type: 'Budget', description: 'Clean and affordable guesthouse option.', mealIdeas: ["Basic meals on request", "Street food nearby"] },
    { name: 'Cafe Shillong Heritage', type: 'Boutique Stay & Cafe', description: 'Charming stay with a popular cafe.', mealIdeas: ["Cafe menu with local and continental fusion", "Baked goods"] },
  ],
  'guwahati_city': [
    { name: 'Vivanta Guwahati', type: 'Luxury', description: 'Upscale hotel with modern facilities and multiple dining options.', mealIdeas: ["Fine dining", "Assamese thali", "24/7 coffee shop"], bookingLink: 'https://www.booking.com/searchresults.html?ss=Vivanta+Guwahati' },
    { name: 'Ginger Guwahati', type: 'Mid-range', description: 'Smart and well-equipped business hotel.', mealIdeas: ["On-site restaurant with buffet and a-la-carte", "Quick bites"] },
    { name: 'Sachika Hotels', type: 'Budget', description: 'Decent budget stay with good connectivity.', mealIdeas: ["Simple in-house dining", "Local eateries around"] },
  ],
  'kamakhya_temple': [
    { name: 'Temple Guest Houses (various)', type: 'Pilgrim-friendly', description: 'Basic accommodations near the temple, often run by trusts.', mealIdeas: ["Pure vegetarian food stalls", "Simple thalis"] },
    { name: 'Hotel Shreemoyee Inn', type: 'Mid-range', description: 'Located relatively close to Kamakhya, offers vegetarian food options.', mealIdeas: ["Vegetarian restaurant", "North Indian cuisine"] },
    { name: 'Radisson Blu Hotel Guwahati', type: 'Luxury (further away)', description: 'If preferring luxury, though not immediately at the temple.', mealIdeas: ["Multiple restaurants", "Extensive buffets"], bookingLink: 'https://www.booking.com/searchresults.html?ss=Radisson+Blu+Hotel+Guwahati' },
  ],
  'cherrapunji': [
    { name: 'Polo Orchid Resort Cherrapunjee', type: 'Resort', description: 'Offers stunning views and comfortable stay.', mealIdeas: ["Restaurant with views", "Indian and Chinese cuisine"], bookingLink: 'https://www.booking.com/searchresults.html?ss=Polo+Orchid+Resort+Cherrapunjee' },
    { name: 'Saimika Resort', type: 'Eco-friendly', description: 'Nestled in nature, promoting sustainable tourism.', mealIdeas: ["Local Khasi dishes", "Organic ingredients often used"] },
    { name: 'Cherrapunjee Holiday Resort', type: 'Mid-range', description: 'Popular choice known for its location and local experiences.', mealIdeas: ["Homely food", "Traditional recipes"] },
    { name: 'Jiva Resort', type: 'Boutique Resort', description: 'Stylish resort with modern amenities.', mealIdeas: ["Multi-cuisine restaurant", "Focus on fresh ingredients"], bookingLink: 'https://www.booking.com/searchresults.html?ss=Jiva+Resort+Cherrapunji' },
  ],
   'tawang': [
    { name: 'Hotel Tawang Heights', type: 'Mid-range', description: 'Offers good views and comfortable rooms.', mealIdeas: ["Indian and Tibetan cuisine", "Momos and Thukpa"], bookingLink: 'https://www.booking.com/searchresults.html?ss=Hotel+Tawang+Heights+Tawang' },
    { name: 'Vamoose Tourist Lodge Tawang', type: 'Budget/Mid-range', description: 'Decent option with basic amenities.', mealIdeas: ["Local eateries nearby", "Simple North Indian food"] },
    { name: 'Government Tourist Lodges', type: 'Budget', description: 'Basic but functional government-run accommodations.', mealIdeas: ["Canteen facilities usually available"] },
  ],
  // Default/Fallback suggestions if no specific match
  '_default': [
    { name: 'Local Guesthouses & Hotels', type: 'Various', description: 'Most towns offer a range of guesthouses and small hotels.', mealIdeas: ["Explore local restaurants for regional specialties", "Ask locals for recommendations"] },
    { name: 'Homestays (if available)', type: 'Homestay', description: 'Consider homestays for an authentic local experience.', mealIdeas: ["Home-cooked meals by the host family"] },
  ]
};