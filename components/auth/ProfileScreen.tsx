
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ProfileIcon } from '../icons/ProfileIcon';

interface ProfileScreenProps {
  onNavigateBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigateBack }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl text-center">
        <h2 className="text-2xl font-bold text-slate-800">No User Found</h2>
        <p className="text-slate-600 mt-2">You are not logged in.</p>
        <button
          onClick={onNavigateBack}
          className="mt-6 w-full bg-slate-200 text-slate-700 py-2 px-4 rounded-lg shadow-md hover:bg-slate-300 font-semibold"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl animate-fadeIn">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-[rgb(240,45,85)] rounded-full flex items-center justify-center mb-4">
          <ProfileIcon className="w-16 h-16 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-[rgb(35,65,65)]">{user.fullName}</h2>
        <p className="text-slate-500">{user.email}</p>
      </div>

      <div className="space-y-4 text-left">
          <h3 className="text-lg font-semibold text-[rgb(35,65,65)] border-b pb-2">Profile Details</h3>
          <div className="text-sm">
              <p className="text-slate-500">Full Name</p>
              <p className="text-slate-800 font-medium">{user.fullName}</p>
          </div>
          <div className="text-sm">
              <p className="text-slate-500">Email Address</p>
              <p className="text-slate-800 font-medium">{user.email}</p>
          </div>
           <div className="text-sm">
              <p className="text-slate-500">Rating</p>
              <p className="text-slate-800 font-medium">{user.rating.toFixed(1)} ★ ({user.totalRides} rides)</p>
          </div>
          <div className="text-sm">
              <p className="text-slate-500">User ID</p>
              <p className="text-slate-800 font-medium text-xs break-all">{user.id}</p>
          </div>
      </div>
      
      <button
        onClick={onNavigateBack}
        className="mt-8 w-full bg-slate-200 text-slate-700 py-2 px-4 rounded-lg shadow-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors font-semibold"
      >
        Back to Booking
      </button>
    </div>
  );
};
