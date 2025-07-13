
import React, { useState } from 'react';
import { SearchParams, GeoPoint } from '../types';
import { locations, shuttleTypes } from '../constants';

const LocationPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400">
      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.145l.002-.001L10 18.43l.001.001.281.145.002.001.018.008.006.003c.198.086.307.066.307.066s.11-.02.308.066l.003.001a1.153 1.153 0 0 0 .626-1.012V13.379a1.152 1.152 0 0 0-.626-1.012L10 11.86l-1.06.497a1.152 1.152 0 0 0-.627 1.012v4.542c0 .405.218.778.567.971l.003.002Z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M10 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" clipRule="evenodd" />
    </svg>
);
const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
        <path fillRule="evenodd" d="M10.707 2.293a1 1 0 0 0-1.414 0L6.636 4.94A1 1 0 0 0 6 5.646V7H4a1 1 0 0 0-1 1v2.5A2.5 2.5 0 0 0 .5 13v1A1.5 1.5 0 0 0 2 15.5h16a1.5 1.5 0 0 0 1.5-1.5v-1a2.5 2.5 0 0 0-2.5-2.5V8a1 1 0 0 0-1-1h-2v-1.354a1 1 0 0 0-.636-.906l-2.657-2.657ZM4.75 11a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
        <path d="M2 8h16V6.5a.5.5 0 0 0-.276-.447l-3-2A.5.5 0 0 0 14.5 4H14V3.5a.5.5 0 0 0-.146-.354L11.146.439A.5.5 0 0 0 10.5 0h-1a.5.5 0 0 0-.354.146L6.439 2.854A.5.5 0 0 0 6 3.207V4h-.5a.5.5 0 0 0-.224.053l-3 2A.5.5 0 0 0 2 6.5V8Z" />
    </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
  </svg>
);
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
       <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c0-.414.336-.75.75-.75h10.5a.75.75 0 0 1 .75.75v.25c0 .414-.336-.75-.75-.75H5.5a.75.75 0 0 1-.75-.75V7.5Z" clipRule="evenodd" />
     </svg>
);
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-400">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
    </svg>
);


interface BookingSearchFormProps {
  onFindRide: (params: SearchParams) => void;
}

export const BookingSearchForm: React.FC<BookingSearchFormProps> = ({ onFindRide }) => {
  const [pickup, setPickup] = useState<{ name: string; point: GeoPoint } | null>(null);
  const [destination, setDestination] = useState<{ name: string; point: GeoPoint } | null>(null);
  const [journeyDate, setJourneyDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [journeyTime, setJourneyTime] = useState<string>('10:00');
  const [shuttleType, setShuttleType] = useState<string>(shuttleTypes[0].id);
  const [passengers, setPassengers] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSelect = (type: 'pickup' | 'destination', locationId: string) => {
    const selectedLocation = locations.find(loc => loc.id === locationId);
    if (selectedLocation) {
        const locationData = { name: selectedLocation.name, point: { lat: selectedLocation.lat, lng: selectedLocation.lng } };
        if (type === 'pickup') {
            setPickup(locationData);
        } else {
            setDestination(locationData);
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!pickup || !destination) {
      setError('Please select both a pickup and destination location.');
      return;
    }
    if (pickup.name === destination.name) {
      setError('Pickup and destination locations cannot be the same.');
      return;
    }
    if (!journeyDate || !journeyTime) {
      setError('Please select a valid date and time for your journey.');
      return;
    }
    onFindRide({
      pickup,
      destination,
      journeyDate,
      journeyTime,
      passengers,
      shuttleType,
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fadeIn">
        <div className="bg-white/90 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-2xl border border-white/50">
            <h2 className="text-2xl md:text-3xl font-bold text-[rgb(35,65,65)] mb-2">Book Now</h2>
            <p className="text-slate-600 mb-6">Select your route and travel details to find available shuttles.</p>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4 border border-red-200">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="pickup" className="text-sm font-medium text-slate-600">From</label>
                    <div className="relative mt-1">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><LocationPinIcon /></div>
                        <select
                            id="pickup"
                            onChange={(e) => handleLocationSelect('pickup', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)]"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Select pickup location...</option>
                            {locations.map(loc => <option key={`p-${loc.id}`} value={loc.id}>{loc.name}</option>)}
                        </select>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="destination" className="text-sm font-medium text-slate-600">To</label>
                    <div className="relative mt-1">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><LocationPinIcon/></div>
                        <select
                            id="destination"
                            onChange={(e) => handleLocationSelect('destination', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)]"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>Select destination...</option>
                            {locations.map(loc => <option key={`d-${loc.id}`} value={loc.id}>{loc.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="journeyDate" className="text-sm font-medium text-slate-600">Date</label>
                         <div className="relative mt-1">
                             <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><CalendarIcon/></div>
                            <input
                                type="date"
                                id="journeyDate"
                                value={journeyDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setJourneyDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)]"
                                required
                            />
                         </div>
                    </div>
                    <div>
                        <label htmlFor="journeyTime" className="text-sm font-medium text-slate-600">Time</label>
                         <div className="relative mt-1">
                             <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><ClockIcon/></div>
                            <input
                                type="time"
                                id="journeyTime"
                                value={journeyTime}
                                onChange={(e) => setJourneyTime(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)]"
                                required
                            />
                         </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="shuttleType" className="text-sm font-medium text-slate-600">Vehicle</label>
                         <div className="relative mt-1">
                             <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><CarIcon /></div>
                            <select
                                id="shuttleType"
                                value={shuttleType}
                                onChange={(e) => setShuttleType(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)]"
                            >
                                {shuttleTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
                            </select>
                         </div>
                    </div>
                    <div>
                        <label htmlFor="passengers" className="text-sm font-medium text-slate-600">Passengers</label>
                         <div className="relative mt-1">
                             <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><UsersIcon /></div>
                            <input
                                type="number"
                                id="passengers"
                                value={passengers}
                                onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                min="1"
                                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)]"
                             />
                         </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[rgb(240,45,85)] text-white py-3 px-4 rounded-lg shadow-md hover:bg-[rgb(220,35,75)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50 transition-transform duration-150 font-semibold text-lg mt-6"
                >
                    Find My Ride
                </button>
            </form>
        </div>
    </div>
  );
};