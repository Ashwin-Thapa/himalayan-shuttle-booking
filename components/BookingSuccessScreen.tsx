







import React, { useEffect, useMemo } from 'react';
import { AiTravelSuggestion, ConfirmedBookingPayload, SearchResult, RideStatus } from '../types';
import { LoadingIndicator } from './LoadingIndicator'; 
import { StaticHotelSuggestions } from './StaticHotelSuggestions'; 
import { DARSHAN_PASS_PRICES } from '../constants';

interface BookingSuccessScreenProps {
  bookingData: ConfirmedBookingPayload;
  rideRequests: ConfirmedBookingPayload[]; // Pass all requests to find the current one
  onBookAnother: () => void;
  onFetchAiTravelPlan: (shuttle: SearchResult, prefersVeg: boolean) => void;
  aiTravelPlan: AiTravelSuggestion | null;
  isAiTravelPlanLoading: boolean;
  aiTravelPlanError: string | null;
  aiInitializationError: string | null;
  isApiKeyMissing: boolean;
}

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-green-500 mx-auto mb-4">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06l-3.093 3.093L9.75 10.406a.75.75 0 0 0-1.06 1.06L10.94 15l4.67-4.784Z" clipRule="evenodd" />
  </svg>
);

const HotelIcon = () => ( 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-teal-500">
        <path d="M10.75 1.012a.75.75 0 01.75.75v3.488c0 .265.088.513.245.717l2.203 2.938A.75.75 0 0113.5 10.5v2.75a.75.75 0 001.5 0V10.5a2.25 2.25 0 00-1.391-2.126L11.5 6.43V3.75a.75.75 0 00-.75-.75h-1a.75.75 0 00-.75.75V8.5h-1V1.762a.75.75 0 01.75-.75h2.5Z" />
        <path fillRule="evenodd" d="M5.057 9.723a.75.75 0 00-1.114 0L2.203 12.06c-.301.4-.047.99.447.99H17c.494 0 .748-.59.447-.99l-1.74-2.337a.75.75 0 00-1.114 0L12.5 12.061l-1.742-2.338a.75.75 0 00-1.114 0L7.59 12.06 5.057 9.723zM3.5 15a.75.75 0 000 1.5h13a.75.75 0 000-1.5H3.5z" clipRule="evenodd" />
    </svg>
);

const RideStatusDisplay: React.FC<{ status: RideStatus; driverName?: string }> = ({ status, driverName }) => {
    switch (status) {
        case 'pending':
            return <div className="p-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 text-sm flex items-center justify-center"><LoadingIndicator /><span className="ml-2">Waiting for a driver to accept your ride...</span></div>;
        case 'accepted':
            return <div className="p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm"><strong>Your ride is confirmed!</strong> Driver {driverName || 'assigned'} is on the way.</div>;
        case 'completed':
            return <div className="p-3 bg-slate-100 text-slate-700 rounded-lg border border-slate-200 text-sm">This ride has been completed. Thank you!</div>;
        case 'cancelled_by_driver':
             return <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">Unfortunately, your ride was cancelled by the driver. Please book another.</div>;
        default:
            return null;
    }
};


export const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({ 
    bookingData,
    rideRequests,
    onBookAnother,
    onFetchAiTravelPlan,
    aiTravelPlan,
    isAiTravelPlanLoading,
    aiTravelPlanError,
    aiInitializationError,
    isApiKeyMissing
}) => {
  const { shuttleDetails, passengerContact, darshanPassType, prefersVegMeals, finalPrice } = bookingData;
  const passengerName = passengerContact?.fullName ? `, ${passengerContact.fullName}` : '';
  const isAiServiceAvailable = !aiInitializationError && !isApiKeyMissing;
  const isKamakhyaBooking = shuttleDetails.toName.toLowerCase().includes('kamakhya');

  const currentRide = useMemo(() => {
    return rideRequests.find(ride => ride.id === bookingData.id);
  }, [rideRequests, bookingData.id]);
  
  const rideStatus = currentRide?.status ?? 'pending';
  const driverName = currentRide?.driver?.fullName;

  useEffect(() => {
    if (isAiServiceAvailable && !aiTravelPlan && !isAiTravelPlanLoading && !aiTravelPlanError) {
      onFetchAiTravelPlan(shuttleDetails, prefersVegMeals);
    }
  }, [shuttleDetails, prefersVegMeals, onFetchAiTravelPlan, aiTravelPlan, isAiTravelPlanLoading, aiTravelPlanError, isAiServiceAvailable]);


  return (
    <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-xl shadow-2xl text-center">
      <CheckCircleIcon />
      <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-3">Booking Placed{passengerName}!</h2>
      <p className="text-slate-600 mb-6">
        Your request has been sent to nearby drivers. You'll be notified here once it's accepted.
      </p>

      <div className="mb-6">
        {currentRide && <RideStatusDisplay status={rideStatus} driverName={driverName}/>}
      </div>

      <div className="text-left bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 mb-6">
        <h3 className="text-lg font-semibold text-[rgb(35,65,65)] mb-2 border-b pb-2">Booking Summary:</h3>
        {passengerContact && (
          <>
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Booked For:</span> {passengerContact.fullName}
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Email:</span> {passengerContact.email}
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Phone:</span> {passengerContact.phoneNumber}
            </p>
          </>
        )}
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Shuttle:</span> {shuttleDetails.shuttleTypeName}
        </p>
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Route:</span> {shuttleDetails.fromName} &rarr; {shuttleDetails.toName}
        </p>
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Date & Time:</span> {shuttleDetails.journeyDate} at {shuttleDetails.departureTime}
        </p>
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Passengers:</span> {shuttleDetails.passengers}
        </p>
        {darshanPassType !== 'none' && isKamakhyaBooking && (
            <>
                <p className="text-sm text-slate-700">
                    <span className="font-semibold">Kamakhya Darshan Pass:</span> {darshanPassType.charAt(0).toUpperCase() + darshanPassType.slice(1)} (₹{DARSHAN_PASS_PRICES[darshanPassType]})
                </p>
                {prefersVegMeals && (
                    <p className="text-sm text-slate-700">
                        <span className="font-semibold">Meal Preference:</span> Vegetarian
                    </p>
                )}
            </>
        )}
        <p className="text-sm text-slate-800 font-semibold mt-1 pt-1 border-t">
          <span className="font-semibold">Total Price:</span> ₹{finalPrice.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Hotel & Meal Ideas Section - Conditional Rendering */}
      <div className="mb-6 text-left">
        {isAiServiceAvailable ? (
          <>
            {isAiTravelPlanLoading && (
              <div className="flex flex-col items-center justify-center py-6 px-4 bg-slate-50 border border-slate-200 rounded-lg">
                <LoadingIndicator />
                <p className="mt-3 text-slate-500 text-sm">Himalayan Helper is finding hotel & meal ideas...</p>
              </div>
            )}
            {aiTravelPlanError && !isAiTravelPlanLoading && (
              <div className="py-4 px-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center mb-1">
                    <HotelIcon />
                    <h4 className="text-md font-semibold text-red-700 ml-1">Himalayan Helper Ideas Error:</h4>
                </div>
                <p className="text-red-600 text-sm">{aiTravelPlanError}</p>
              </div>
            )}
            {aiTravelPlan && !isAiTravelPlanLoading && (
              <div className="mt-4 bg-teal-50 p-4 rounded-lg border border-teal-200">
                <div className="flex items-center mb-2">
                    <HotelIcon />
                    <h4 className="text-md font-semibold text-teal-700 ml-1">Himalayan Helper Hotel & Meal Ideas:</h4>
                </div>
                 {/* Hotels */}
                <div className="mb-3">
                  <h5 className="font-semibold text-teal-800 text-sm">Hotel Suggestions</h5>
                  {aiTravelPlan.hotels && aiTravelPlan.hotels.length > 0 ? (
                    <ul className="space-y-2 mt-1">
                      {aiTravelPlan.hotels.map((hotel, index) => (
                        <li key={index} className="text-sm text-slate-700 p-2 bg-white/50 rounded-md border border-teal-100">
                          <p className="font-bold">{hotel.name}</p>
                          <p className="text-xs italic">{hotel.description}</p>
                          <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer" 
                              className="text-xs text-blue-600 hover:underline font-semibold mt-1 inline-block">
                              Check availability on Booking.com &rarr;
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-sm text-slate-600 italic">No specific hotel suggestions available.</p>}
                </div>

                {/* Meal Ideas */}
                <div className="mb-3">
                  <h5 className="font-semibold text-teal-800 text-sm">Meal Ideas</h5>
                  {aiTravelPlan.mealIdeas && aiTravelPlan.mealIdeas.length > 0 ? (
                      <ul className="list-disc list-inside ml-1 mt-1 space-y-1">
                      {aiTravelPlan.mealIdeas.map((idea, index) => (
                          <li key={index} className="text-sm text-slate-700">{idea}</li>
                      ))}
                      </ul>
                  ) : <p className="text-sm text-slate-600 italic">No specific meal ideas available.</p>}
                </div>
                
                {/* Tip */}
                <div>
                  <h5 className="font-semibold text-teal-800 text-sm">Travel Tip</h5>
                  {aiTravelPlan.tip ? (
                      <p className="text-sm text-slate-700 italic mt-1">"{aiTravelPlan.tip}"</p>
                  ) : <p className="text-sm text-slate-600 italic">No specific tip available.</p>}
                </div>
                
                {isKamakhyaBooking && (
                    <p className="text-xs text-teal-600 mt-2 italic">These suggestions are tailored for your pilgrimage to Kamakhya Temple{prefersVegMeals ? " with vegetarian preference" : ""}.</p>
                )}
              </div>
            )}
          </>
        ) : (
          <StaticHotelSuggestions 
            destinationId={shuttleDetails.searchParams.destination.name} // Using name as a proxy for ID here
            destinationName={shuttleDetails.toName} 
            aiInitializationError={aiInitializationError}
          />
        )}
      </div>

      <button
        onClick={onBookAnother}
        className="w-full bg-[rgb(240,45,85)] text-white py-3 px-4 rounded-lg shadow-md hover:bg-[rgb(220,35,75)] focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50 transition-colors duration-150 font-semibold"
      >
        Book Another Shuttle
      </button>
    </div>
  );
};