
import React, { useMemo } from 'react';
import { ConfirmedBookingPayload, User } from '../../types';
import { RideRequestCard } from './RideRequestCard';
import { ActiveRidePanel } from './ActiveRidePanel';

interface DriverDashboardProps {
  rideRequests: ConfirmedBookingPayload[];
  currentDriver: User | null;
  onAcceptRide: (rideId: string) => void;
  onRejectRide: (rideId: string) => void;
  onCompleteRide: (rideId: string) => void;
  onCancelRide: (rideId: string) => void;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({ 
    rideRequests, 
    currentDriver, 
    onAcceptRide, 
    onRejectRide,
    onCompleteRide,
    onCancelRide
}) => {

  const { pendingRequests, activeRide, completedRides } = useMemo(() => {
    if (!currentDriver) {
      return { pendingRequests: [], activeRide: null, completedRides: [] };
    }
    
    const pending = rideRequests.filter(r => r.status === 'pending');
    const active = rideRequests.find(r => r.driver?.id === currentDriver.id && r.status === 'accepted') || null;
    const completed = rideRequests.filter(r => r.driver?.id === currentDriver.id && (r.status === 'completed' || r.status === 'cancelled_by_driver'));

    return { pendingRequests: pending, activeRide: active, completedRides: completed };
  }, [rideRequests, currentDriver]);

  if (!currentDriver) {
    return (
        <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl mt-8 text-center">
            <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
            <p className="text-slate-600 mt-2">You must be logged in to view the driver dashboard.</p>
        </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl p-4 animate-fadeIn">
      <h1 className="text-3xl font-bold text-center text-[rgb(35,65,65)] mb-6">Driver Dashboard</h1>

      {/* Active Ride Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-700 border-b-2 border-[rgb(240,45,85)] pb-2 mb-4">Your Active Ride</h2>
        {activeRide ? (
          <ActiveRidePanel 
            ride={activeRide}
            onCompleteRide={onCompleteRide}
            onCancelRide={onCancelRide}
          />
        ) : (
          <div className="text-center p-6 bg-slate-50 rounded-lg border border-dashed">
            <p className="text-slate-500">You do not have an active ride.</p>
            <p className="text-slate-400 text-sm">Accept a ride request to start a journey.</p>
          </div>
        )}
      </div>

      {/* Incoming Requests Section */}
      <div>
        <h2 className="text-xl font-semibold text-slate-700 border-b-2 border-slate-300 pb-2 mb-4">Incoming Ride Requests ({pendingRequests.length})</h2>
        {pendingRequests.length > 0 ? (
          <div className="space-y-4">
            {pendingRequests.map(ride => (
              <RideRequestCard 
                key={ride.id}
                rideRequest={ride}
                onAccept={onAcceptRide}
                onReject={onRejectRide}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-6 bg-slate-50 rounded-lg border border-dashed">
            <p className="text-slate-500">No new ride requests at the moment.</p>
          </div>
        )}
      </div>

       {/* Completed Rides History (Optional) */}
       {completedRides.length > 0 && (
         <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-700 border-b-2 border-slate-300 pb-2 mb-4">Ride History ({completedRides.length})</h2>
            <div className="space-y-3">
            {completedRides.map(ride => (
              <div key={ride.id} className="bg-white p-3 rounded-lg border text-sm flex justify-between items-center">
                <div>
                  <p className="font-semibold">{ride.shuttleDetails.fromName} to {ride.shuttleDetails.toName}</p>
                  <p className="text-xs text-slate-500">{ride.shuttleDetails.journeyDate}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${ride.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {ride.status.replace(/_/g, ' ')}
                </span>
              </div>
            ))}
            </div>
         </div>
       )}
    </div>
  );
};
