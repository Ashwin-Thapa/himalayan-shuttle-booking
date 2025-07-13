
import React from 'react';
import { LoadingIndicator } from './LoadingIndicator'; // Assuming you have this component

interface AiDestinationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: string[];
  isLoading: boolean;
  error: string | null;
  onSelectSuggestion: (suggestionName: string) => void;
  onSkip: () => void;
  leavingFromName: string;
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-yellow-400">
      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.464 3.025.942 4.849 4.142 2.515 2.387 4.435 4.486-1.714 4.486 1.714 2.387-4.435 4.142-2.515.942-4.849-3.464-3.025-4.753-.39-1.83-4.401Zm9.106 11.035c.318-.773-.235-1.654-.966-1.654h-.001M1.026 13.919c-.731 0-1.284.88-.966 1.654s.966 1.284 1.654.966l.001-.001M10 5.25a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.008 8.526a.75.75 0 0 1-.75-.75V13a.75.75 0 0 1 1.5 0v.008a.75.75 0 0 1-.75.75ZM4.21 9.21A.75.75 0 0 1 4.75 10h.008a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1-.54-.22l-.001-.001A.75.75 0 0 1 4.21 9.21Zm11.492 2.042a.75.75 0 0 1-.54.22h-.008a.75.75 0 0 1 0-1.5h.008a.75.75 0 0 1 .54.22l.001.001A.75.75 0 0 1 15.702 11.25Z" clipRule="evenodd" />
    </svg>
);

export const AiDestinationSelectorModal: React.FC<AiDestinationSelectorModalProps> = ({
  isOpen,
  onClose,
  suggestions,
  isLoading,
  error,
  onSelectSuggestion,
  onSkip,
  leavingFromName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" aria-modal="true" role="dialog">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[rgb(35,65,65)] flex items-center">
            <SparklesIcon /> Himalayan Helper Suggestions
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 text-2xl"
            aria-label="Close suggestions"
          >
            &times;
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Not sure where to go from <strong>{leavingFromName}</strong>? Here are some ideas:
        </p>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <LoadingIndicator />
            <p className="mt-3 text-slate-500">Fetching suggestions...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="py-6 px-4 bg-red-50 border border-red-200 rounded-md text-center">
            <p className="text-red-600 font-semibold mb-1">Oops! Could not get suggestions.</p>
            <p className="text-red-500 text-sm mb-3">{error}</p>
            <button
              onClick={onSkip}
              className="bg-slate-200 text-slate-700 py-2 px-4 rounded-lg shadow-sm hover:bg-slate-300 text-sm font-medium"
            >
              Skip & Search Manually
            </button>
          </div>
        )}

        {!isLoading && !error && suggestions.length > 0 && (
          <div className="space-y-3 mb-6">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSelectSuggestion(suggestion)}
                className="w-full text-left p-3 bg-slate-100 hover:bg-[rgb(240,45,85)] hover:text-white rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        
        {!isLoading && !error && suggestions.length === 0 && (
            <div className="py-6 text-center">
                <p className="text-slate-500">Himalayan Helper couldn't find specific suggestions right now.</p>
            </div>
        )}


        {!isLoading && !error && (
          <button
            onClick={onSkip}
            className="w-full bg-slate-500 text-white py-2.5 px-4 rounded-lg shadow-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 font-medium"
          >
            Skip Suggestions & Continue
          </button>
        )}
      </div>
    </div>
  );
};
