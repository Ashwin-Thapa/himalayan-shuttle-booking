


import React from 'react';
import { staticHotelSuggestionsByLocationId, StaticHotelSuggestion } from '../constants';

interface StaticHotelSuggestionsProps {
  destinationId: string;
  destinationName: string;
  aiInitializationError: string | null;
}

const HotelIcon = () => ( 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 text-sky-600">
        <path d="M10.75 1.012a.75.75 0 01.75.75v3.488c0 .265.088.513.245.717l2.203 2.938A.75.75 0 0113.5 10.5v2.75a.75.75 0 001.5 0V10.5a2.25 2.25 0 00-1.391-2.126L11.5 6.43V3.75a.75.75 0 00-.75-.75h-1a.75.75 0 00-.75.75V8.5h-1V1.762a.75.75 0 01.75-.75h2.5Z" />
        <path fillRule="evenodd" d="M5.057 9.723a.75.75 0 00-1.114 0L2.203 12.06c-.301.4-.047.99.447.99H17c.494 0 .748-.59.447-.99l-1.74-2.337a.75.75 0 00-1.114 0L12.5 12.061l-1.742-2.338a.75.75 0 00-1.114 0L7.59 12.06 5.057 9.723zM3.5 15a.75.75 0 000 1.5h13a.75.75 0 000-1.5H3.5z" clipRule="evenodd" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5 text-sky-500">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0Zm-7-4a1 1 0 11-2 0 1 1 0 012 0ZM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9Z" clipRule="evenodd" />
    </svg>
);


export const StaticHotelSuggestions: React.FC<StaticHotelSuggestionsProps> = ({ destinationId, destinationName, aiInitializationError }) => {
  const suggestions = staticHotelSuggestionsByLocationId[destinationId] || staticHotelSuggestionsByLocationId['_default'] || [];

  return (
    <div className="mt-4 bg-sky-50 p-4 rounded-lg border border-sky-200">
      <div className="flex items-center mb-2">
        <HotelIcon />
        <h4 className="text-md font-semibold text-sky-700 ml-1">Hotel & Meal Suggestions for {destinationName}</h4>
      </div>
      
      <div className="flex items-start text-xs text-sky-600 bg-sky-100 p-2 rounded-md mb-3 border border-sky-200">
        <InfoIcon />
        <p>Himalayan Helper AI is currently unavailable. Showing general suggestions. (Reason: {aiInitializationError || "Service not available"})</p>
      </div>

      {suggestions.length > 0 ? (
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="pb-3 border-b border-sky-100 last:border-b-0">
              <p className="font-semibold text-sm text-sky-800">{suggestion.name} <span className="text-xs font-normal text-sky-600">({suggestion.type})</span></p>
              <p className="text-xs text-slate-600 mt-0.5">{suggestion.description}</p>
              {suggestion.bookingLink && (
                <a href={suggestion.bookingLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-semibold mt-1 inline-block">
                    Check availability on Booking.com &rarr;
                </a>
              )}
              {suggestion.mealIdeas && suggestion.mealIdeas.length > 0 && (
                <div className="mt-1">
                  <p className="text-xs font-medium text-sky-700">Meal Ideas:</p>
                  <ul className="list-disc list-inside ml-2">
                    {suggestion.mealIdeas.map((idea, idx) => (
                      <li key={idx} className="text-xs text-slate-500">{idea}</li>
                    ))}
                  </ul>
                </div>
              )}
              {suggestion.tags && suggestion.tags.length > 0 && (
                 <div className="mt-1.5 flex flex-wrap gap-1">
                    {suggestion.tags.map(tag => (
                        <span key={tag} className="text-xs bg-sky-200 text-sky-700 px-1.5 py-0.5 rounded-full">{tag}</span>
                    ))}
                 </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-600">No specific static suggestions available for this location. Consider searching online or asking locals upon arrival.</p>
      )}
    </div>
  );
};