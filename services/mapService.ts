




import { GeoPoint, ShuttleType } from '../types';
import { shuttleTypes } from '../constants';

/**
 * Calculates the Haversine distance between two points on the Earth.
 * @param p1 - The first GeoPoint { lat, lng }.
 * @param p2 - The second GeoPoint { lat, lng }.
 * @returns The distance in kilometers.
 */
export const getHaversineDistance = (p1: GeoPoint, p2: GeoPoint): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (p2.lat - p1.lat) * (Math.PI / 180);
  const dLng = (p2.lng - p1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat * (Math.PI / 180)) *
      Math.cos(p2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Calculates a dynamic fare for the entire vehicle.
 * @param distanceKm - The distance of the trip in kilometers.
 * @param shuttleTypeId - The ID of the shuttle type.
 * @returns The calculated total fare for the vehicle.
 */
export const calculateDynamicFare = (distanceKm: number, shuttleTypeId: string): number => {
  let baseFare: number;
  let perKmRate: number;
  let vehicleMultiplier: number;

  switch (shuttleTypeId) {
    case 'suv':
      baseFare = 80;
      perKmRate = 18;
      vehicleMultiplier = 5;
      break;
    case 'muv':
      baseFare = 75;
      perKmRate = 17;
      vehicleMultiplier = 5;
      break;
    case 'tempo_traveller':
      baseFare = 150;
      perKmRate = 25;
      vehicleMultiplier = 10;
      break;
    case 'sedan':
    default:
      baseFare = 50;
      perKmRate = 13;
      vehicleMultiplier = 3;
      break;
  }

  const calculatedPrice = baseFare + distanceKm * perKmRate;
  
  // Price is always for the whole car now.
  const finalPrice = calculatedPrice * vehicleMultiplier;
  
  // Round to nearest 10 for a cleaner price
  return Math.round(finalPrice / 10) * 10;
};


/**
 * Simulates finding available drivers near a pickup location.
 * In a real app, this would be a complex API call.
 * @param pickupPoint - The pickup location.
 * @returns An array of available vehicle types, simulating different drivers.
 */
export const findNearbyDrivers = (pickupPoint: GeoPoint): { shuttleTypeId: string }[] => {
  // Mock logic: always return a few different vehicle types.
  // In a real app, you'd query a backend with the pickupPoint.
  return [
    { shuttleTypeId: 'sedan' },
    { shuttleTypeId: 'suv' },
    { shuttleTypeId: 'muv' },
    // Only show tempo traveller if it's a "hub" location for longer trips
    (pickupPoint.lat > 26) // Mocking Guwahati or other hubs
      ? { shuttleTypeId: 'tempo_traveller' }
      : { shuttleTypeId: 'sedan' }, // Add another sedan for variety
  ].filter((v, i, a) => a.findIndex(t => t.shuttleTypeId === v.shuttleTypeId) === i); // Ensure unique types
};