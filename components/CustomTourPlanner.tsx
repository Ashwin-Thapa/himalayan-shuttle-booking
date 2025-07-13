import React, { useState } from 'react';
import { LoadingIndicator } from './LoadingIndicator';
// ParsedTourSegment is no longer needed here as segments are not interactive
// import { ParsedTourSegment } from '../types'; 

interface CustomTourPlannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (preferences: string) => void;
  plan: string | null;
  isLoading: boolean;
  error: string | null;
  onClearPlan: () => void;
  onProceedToBooking: () => void;
  // onSegmentSelect: (segment: ParsedTourSegment) => void; // Removed prop
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-yellow-400">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.464 3.025.942 4.849 4.142 2.515 2.387 4.435 4.486-1.714 4.486 1.714 2.387-4.435 4.142-2.515.942-4.849-3.464-3.025-4.753-.39-1.83-4.401Zm9.106 11.035c.318-.773-.235-1.654-.966-1.654h-.001M1.026 13.919c-.731 0-1.284.88-.966 1.654s.966 1.284 1.654.966l.001-.001M10 5.25a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.008 8.526a.75.75 0 0 1-.75-.75V13a.75.75 0 0 1 1.5 0v.008a.75.75 0 0 1-.75.75ZM4.21 9.21A.75.75 0 0 1 4.75 10h.008a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.54-.22l-.001-.001A.75.75 0 0 1 4.21 9.21Zm11.492 2.042a.75.75 0 0 1-.54.22h-.008a.75.75 0 0 1 0-1.5h.008a.75.75 0 0 1 .54.22l.001.001A.75.75 0 0 1 15.702 11.25Z" clipRule="evenodd" />
    </svg>
);
const ShuttleBookingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
      <path d="M3.509 2.048a.75.75 0 0 0-1.018 1.018L3.982 4.5H2.75a.75.75 0 0 0 0 1.5h1.232l-.992.992a.75.75 0 0 0 1.018 1.018L5.5 6.518V8.25a.75.75 0 0 0 1.5 0V6.518l1.491 1.49a.75.75 0 0 0 1.018-1.018L8.018 5.5h1.232a.75.75 0 0 0 0-1.5H8.018L9.509 2.5a.75.75 0 0 0-1.018-1.018L7 2.982V1.75a.75.75 0 0 0-1.5 0v1.232L3.509 2.048Z" />
      <path d="M9.75 10.25a.75.75 0 0 0-1.5 0V11H3V8.75a.75.75 0 0 0-1.5 0V11c0 .414.336.75.75.75h5.5V13H2.25a.75.75 0 0 0 0 1.5H7.5v.75a.75.75 0 0 0 1.5 0V13h.25A2.75 2.75 0 0 0 12 10.25V9.75a.75.75 0 0 0-1.5 0v.5h-.75v-.5ZM13.5 6.75A2.75 2.75 0 0 0 10.75 4h-3.5a.75.75 0 0 0 0 1.5h3.5A1.25 1.25 0 0 1 12 6.75v1.5a.75.75 0 0 0 1.5 0v-1.5Z" />
      <path d="M14 11.25a.75.75 0 0 0-1.5 0v1h-1.25a.75.75 0 0 0 0 1.5h1.25V15h2.25a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 0-.75-.75h-.75v-1Z" />
    </svg>
);


export const CustomTourPlanner: React.FC<CustomTourPlannerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  plan,
  isLoading,
  error,
  onClearPlan,
  onProceedToBooking,
  // onSegmentSelect, // Removed prop
}) => {
  const [preferences, setPreferences] = useState('');
  const [duration, setDuration] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const handleInterestChange = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let fullPreferences = `Preferences: ${preferences}.`;
    if (duration) fullPreferences += ` Duration: ${duration} days.`;
    if (interests.length > 0) fullPreferences += ` Interests: ${interests.join(', ')}.`;
    onSubmit(fullPreferences);
  };

  const handleResetAndRetry = () => {
    setPreferences('');
    setDuration('');
    setInterests([]);
    onClearPlan();
  };

  // Removed parseSegmentLine function as it's no longer needed for segment selection

  if (!isOpen) return null;

  const availableInterests = ["Adventure", "Pilgrimage", "Nature", "Culture", "Relaxation", "Photography"];
  const labelTextColor = "text-slate-700";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" aria-modal="true" role="dialog">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-[rgb(35,65,65)] flex items-center">
            <SparklesIcon /> Himalayan Helper Custom Tour Planner
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl"
            aria-label="Close custom tour planner"
          >
            &times;
          </button>
        </div>

        {!plan && !isLoading && !error && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="preferences" className={`block text-sm font-medium ${labelTextColor} mb-1`}>
                Describe your ideal trip (e.g., destinations, pace, type of activities):
              </label>
              <textarea
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)] bg-white text-slate-800 placeholder:text-slate-400"
                placeholder="E.g., A mix of adventure and cultural experiences in Tawang and Bomdila, including monastery visits and light treks."
              />
            </div>
            <div>
              <label htmlFor="duration" className={`block text-sm font-medium ${labelTextColor} mb-1`}>
                Preferred trip duration (optional, in days):
              </label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)] bg-white text-slate-800 placeholder:text-slate-400"
                placeholder="E.g., 5"
              />
            </div>
            <div>
                <label className={`block text-sm font-medium ${labelTextColor} mb-1`}>Interests (optional):</label>
                <div className="flex flex-wrap gap-2">
                    {availableInterests.map(interest => (
                        <button
                            type="button"
                            key={interest}
                            onClick={() => handleInterestChange(interest)}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
                                interests.includes(interest)
                                ? 'bg-[rgb(240,45,85)] text-white border-[rgb(240,45,85)] hover:bg-[rgb(220,35,75)]'
                                : 'bg-white text-[rgb(240,45,85)] border-[rgb(240,45,85)] hover:bg-red-50'
                            }`}
                        >
                            {interest}
                        </button>
                    ))}
                </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[rgb(240,45,85)] text-white py-2.5 px-4 rounded-lg shadow-md hover:bg-[rgb(220,35,75)] focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50 font-semibold"
            >
              Generate My Custom Tour
            </button>
          </form>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-10">
            <LoadingIndicator />
            <p className="mt-3 text-slate-600">Himalayan Helper is crafting your tour...</p>
          </div>
        )}

        {error && (
          <div className="py-6 px-4 bg-red-50 border border-red-200 rounded-md text-center">
            <p className="text-red-600 font-semibold mb-2">Oops! Something went wrong.</p>
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
                onClick={handleResetAndRetry}
                className="bg-slate-200 text-slate-700 py-2 px-4 rounded-lg shadow-md hover:bg-slate-300 font-semibold text-sm"
            >
                Try Again
            </button>
          </div>
        )}

        {plan && !isLoading && (
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold text-sky-700">Your Himalayan Helper Custom Tour Plan:</h3>
            <div className="bg-sky-50 p-3 rounded-lg border border-sky-200 whitespace-pre-wrap text-sm text-slate-700 overflow-y-auto max-h-[35vh]">
              {plan.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                if (!trimmedLine) return null; // Skip empty lines
                // Render each line as a non-interactive div
                return (
                  <div key={index} className="py-0.5 my-0.5">
                    {trimmedLine}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                onClick={onProceedToBooking}
                className="w-full sm:flex-1 bg-green-500 text-white py-2.5 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-semibold flex items-center justify-center"
                >
                    <ShuttleBookingIcon /> Start Booking (New Search)
                </button>
                <button
                onClick={() => {
                    onClearPlan();
                    setPreferences('');
                    setDuration('');
                    setInterests([]);
                }}
                className="w-full sm:flex-1 bg-slate-200 text-slate-700 py-2.5 px-4 rounded-lg shadow-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 font-semibold"
                >
                Create Another Plan
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};