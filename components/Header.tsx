
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ProfileIcon } from './icons/ProfileIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { AppView } from '../types';
import { SteeringWheelIcon } from './icons/SteeringWheelIcon';


const ShuttleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
    <path d="M18.926 4.403A2.251 2.251 0 0 0 16.963 3H7.037a2.251 2.251 0 0 0-1.963 1.403L3.364 9.5H2.25a.75.75 0 0 0 0 1.5h.311l-.184 4.388A2.25 2.25 0 0 0 4.624 17.25H5.25v.75A2.25 2.25 0 0 0 7.5 20.25h1.5A2.25 2.25 0 0 0 11.25 18v-.75h1.5v.75a2.25 2.25 0 0 0 2.25 2.25h1.5A2.25 2.25 0 0 0 18.75 18v-.75h.626a2.25 2.25 0 0 0 2.247-1.862l-.184-4.388h.311a.75.75 0 0 0 0-1.5h-1.114l-1.71-5.097ZM7.037 4.5h9.926L18.1 8.25H5.9L7.037 4.5ZM5.75 15.75a.75.75 0 0 1-.75-.75V10.5h13.5v4.5a.75.75 0 0 1-.75.75H5.75Z"/>
    <path d="M7.5 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/>
    <path d="M16.5 18.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"/>
  </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-1.5">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.464 3.025.942 4.849 4.142 2.515 2.387 4.435 4.486-1.714 4.486 1.714 2.387-4.435 4.142-2.515.942-4.849-3.464-3.025-4.753-.39-1.83-4.401Zm9.106 11.035c.318-.773-.235-1.654-.966-1.654h-.001M1.026 13.919c-.731 0-1.284.88-.966 1.654s.966 1.284 1.654.966l.001-.001M10 5.25a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.008 8.526a.75.75 0 0 1-.75-.75V13a.75.75 0 0 1 1.5 0v.008a.75.75 0 0 1-.75.75ZM4.21 9.21A.75.75 0 0 1 4.75 10h.008a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.54-.22l-.001-.001A.75.75 0 0 1 4.21 9.21Zm11.492 2.042a.75.75 0 0 1-.54.22h-.008a.75.75 0 0 1 0-1.5h.008a.75.75 0 0 1 .54.22l.001.001A.75.75 0 0 1 15.702 11.25Z" clipRule="evenodd" />
    </svg>
  );

interface HeaderProps {
  onCustomTourClick: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onProfileClick: () => void;
  onLogoutClick: () => void;
  onHomeClick: () => void;
  onViewChange: (view: AppView) => void;
  currentView: AppView;
}

export const Header: React.FC<HeaderProps> = ({ 
  onCustomTourClick,
  onLoginClick,
  onSignupClick,
  onProfileClick,
  onLogoutClick,
  onHomeClick,
  onViewChange,
  currentView
}) => {
  const { user } = useContext(AuthContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[rgb(240,45,85)] text-white shadow-md">
      <div className="w-full max-w-4xl mx-auto flex items-center justify-between p-4">
        <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={onHomeClick}
            role="button"
            aria-label="Go to homepage"
        >
          <ShuttleIcon />
          <h1 className="text-2xl font-bold">Himalayan Shuttle</h1>
        </div>
        <div className="flex items-center space-x-2">
            <button
            onClick={onCustomTourClick}
            className="hidden sm:flex items-center bg-white text-[rgb(240,45,85)] px-4 py-2 rounded-md shadow hover:bg-red-50 transition-colors text-sm font-semibold"
            aria-label="Open Himalayan Helper Custom Tour Planner"
            >
            <SparklesIcon />
            Custom Tour
            </button>

            {user && (
                 <div className="bg-white/20 rounded-full p-0.5 flex items-center text-xs">
                    <button 
                        onClick={() => onViewChange('booking')}
                        className={`px-3 py-1 rounded-full ${currentView === 'booking' ? 'bg-white text-[rgb(240,45,85)] shadow' : 'text-white hover:bg-white/30'}`}
                    >
                        Passenger
                    </button>
                    <button 
                        onClick={() => onViewChange('driver')}
                        className={`px-3 py-1 rounded-full flex items-center ${currentView === 'driver' ? 'bg-white text-[rgb(240,45,85)] shadow' : 'text-white hover:bg-white/30'}`}
                    >
                        <SteeringWheelIcon className="w-4 h-4 mr-1"/>
                        Driver
                    </button>
                 </div>
            )}

            {user ? (
                <div className="relative">
                    <button
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="flex items-center justify-center w-10 h-10 bg-white text-[rgb(240,45,85)] rounded-full shadow hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                        aria-haspopup="true"
                        aria-expanded={isProfileMenuOpen}
                        aria-label="Open user profile menu"
                    >
                        <ProfileIcon className="w-6 h-6" />
                    </button>
                    {isProfileMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fadeIn" role="menu">
                             <div className="px-4 py-2 text-sm text-slate-500 border-b" role="menuitem" tabIndex={-1}>
                                Signed in as <br/>
                                <strong className="text-slate-700 truncate">{user.fullName}</strong>
                             </div>
                            <button
                                onClick={() => { onProfileClick(); setIsProfileMenuOpen(false); }}
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                role="menuitem"
                            >
                                <ProfileIcon className="w-5 h-5 mr-2 text-slate-500" /> My Profile
                            </button>
                            <button
                                onClick={() => { onLogoutClick(); setIsProfileMenuOpen(false); }}
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                role="menuitem"
                            >
                                <LogoutIcon className="w-5 h-5 mr-2 text-slate-500" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="hidden sm:flex items-center space-x-2">
                    <button onClick={onLoginClick} className="px-4 py-2 text-sm font-semibold rounded-md hover:bg-white/20 transition-colors">Login</button>
                    <button onClick={onSignupClick} className="bg-white text-[rgb(240,45,85)] px-4 py-2 rounded-md shadow hover:bg-red-50 transition-colors text-sm font-semibold">Sign Up</button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};