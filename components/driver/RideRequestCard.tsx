
import React from 'react';
import { ConfirmedBookingPayload } from '../../types';

interface RideRequestCardProps {
  rideRequest: ConfirmedBookingPayload;
  onAccept: (rideId: string) => void;
  onReject: (rideId: string) => void;
}

export const RideRequestCard: React.FC<RideRequestCardProps> = ({ rideRequest, onAccept, onReject }) => {
  const { shuttleDetails, passengerContact, finalPrice } = rideRequest;
  
  return (
    <div className="border border-slate-200 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-150">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <div>
            <h4 className="text-lg font-semibold text-[rgb(35,65,65)]">{shuttleDetails.fromName} &rarr; {shuttleDetails.toName}</h4>
            <p className="text-sm text-slate-500">{shuttleDetails.shuttleTypeName}</p>
        </div>
        <div className="text-lg font-bold text-slate-600 mt-2 sm:mt-0">
           Fare: ₹{finalPrice.toLocaleString('en-IN')}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm border-t border-b py-3 my-3">
         <div>
            <p className="text-xs text-slate-500">Passenger</p>
            <p className="font-medium text-slate-800">{passengerContact.fullName}</p>
        </div>
         <div>
            <p className="text-xs text-slate-500">Date</p>
            <p className="font-medium text-slate-800">{shuttleDetails.journeyDate}</p>
        </div>
        <div>
            <p className="text-xs text-slate-500">Time</p>
            <p className="font-medium text-slate-800">{shuttleDetails.departureTime}</p>
        </div>
         <div>
            <p className="text-xs text-slate-500">Passengers</p>
            <p className="font-medium text-slate-800">{shuttleDetails.passengers}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => onReject(rideRequest.id)}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-150 text-sm"
        >
          Reject
        </button>
        <button
          onClick={() => onAccept(rideRequest.id)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-md shadow-sm transition-colors duration-150 text-sm"
        >
          Accept Ride
        </button>
      </div>
    </div>
  );
};
