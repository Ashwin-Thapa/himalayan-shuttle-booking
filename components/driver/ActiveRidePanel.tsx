
import React from 'react';
import { ConfirmedBookingPayload } from '../../types';

interface ActiveRidePanelProps {
  ride: ConfirmedBookingPayload;
  onCompleteRide: (rideId: string) => void;
  onCancelRide: (rideId: string) => void;
}

export const ActiveRidePanel: React.FC<ActiveRidePanelProps> = ({ ride, onCompleteRide, onCancelRide }) => {
  const { shuttleDetails, passengerContact, finalPrice } = ride;

  return (
    <div className="border-2 border-green-500 bg-green-50 rounded-lg p-4 shadow-lg animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <div>
          <h4 className="text-xl font-bold text-green-800">{shuttleDetails.fromName} &rarr; {shuttleDetails.toName}</h4>
          <p className="text-md text-green-700">{shuttleDetails.shuttleTypeName}</p>
        </div>
        <div className="text-xl font-bold text-green-800 mt-2 sm:mt-0">
          ₹{finalPrice.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm border-t-2 border-green-200 pt-3 mt-3">
        <div>
          <p className="text-xs text-green-600">Passenger</p>
          <p className="font-semibold text-green-900">{passengerContact.fullName}</p>
          <p className="text-green-800">{passengerContact.phoneNumber}</p>
        </div>
        <div>
          <p className="text-xs text-green-600">Trip Date</p>
          <p className="font-semibold text-green-900">{shuttleDetails.journeyDate}</p>
        </div>
        <div>
          <p className="text-xs text-green-600">Departure Time</p>
          <p className="font-semibold text-green-900">{shuttleDetails.departureTime}</p>
        </div>
      </div>
      
       <div className="flex justify-end gap-3 mt-4 pt-4 border-t-2 border-green-200">
         <button
          onClick={() => onCancelRide(ride.id)}
          className="bg-red-200 text-red-800 font-semibold py-2 px-4 rounded-md hover:bg-red-300 transition-colors duration-150 text-sm"
        >
          Cancel Ride
        </button>
        <button
          onClick={() => onCompleteRide(ride.id)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-md shadow-sm transition-colors duration-150 text-sm"
        >
          Complete Ride
        </button>
      </div>
    </div>
  );
};
