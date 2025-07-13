






import React from 'react';
import { SearchResult, SearchParams } from '../types';
import { LoadingIndicator } from './LoadingIndicator';
import { locations } from '../constants'; // Updated import source

const CarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-10 h-10 text-slate-700">
        <path fillRule="evenodd" d="M10.707 2.293a1 1 0 0 0-1.414 0L6.636 4.94A1 1 0 0 0 6 5.646V7H4a1 1 0 0 0-1 1v2.5A2.5 2.5 0 0 0 .5 13v1A1.5 1.5 0 0 0 2 15.5h16a1.5 1.5 0 0 0 1.5-1.5v-1a2.5 2.5 0 0 0-2.5-2.5V8a1 1 0 0 0-1-1h-2v-1.354a1 1 0 0 0-.636-.906l-2.657-2.657ZM4.75 11a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
        <path d="M2 8h16V6.5a.5.5 0 0 0-.276-.447l-3-2A.5.5 0 0 0 14.5 4H14V3.5a.5.5 0 0 0-.146-.354L11.146.439A.5.5 0 0 0 10.5 0h-1a.5.5 0 0 0-.354.146L6.439 2.854A.5.5 0 0 0 6 3.207V4h-.5a.5.5 0 0 0-.224.053l-3 2A.5.5 0 0 0 2 6.5V8Z" />
    </svg>
);

const RoadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-500">
      <path fillRule="evenodd" d="M2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1-1H3a1 1 0 0 1-1-1V3Zm3.5 1.5a.75.75 0 0 0-1.5 0v11a.75.75 0 0 0 1.5 0v-11ZM10 4.25a.75.75 0 0 1 .75.75v10a.75.75 0 0 1-1.5 0v-10a.75.75 0 0 1 .75-.75Zm4.5 0a.75.75 0 0 0-1.5 0v11a.75.75 0 0 0 1.5 0v-11Z" clipRule="evenodd" />
    </svg>
);
const TimeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

interface FareEstimateScreenProps {
  results: SearchResult[];
  isLoading: boolean;
  searchCriteria: SearchParams | null;
  onSelectShuttle: (shuttle: SearchResult) => void; 
  onBack: () => void;
}


export const FareEstimateScreen: React.FC<FareEstimateScreenProps> = ({ results, isLoading, searchCriteria, onSelectShuttle, onBack }) => {
  if (!searchCriteria) {
    return null; 
  }
  
  return (
    <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-xl shadow-xl animate-fadeIn">
        <div className="flex items-center mb-4">
             <button onClick={onBack} className="p-2 mr-2 rounded-full hover:bg-slate-100">&larr;</button>
             <h3 className="text-xl md:text-2xl font-semibold text-[rgb(35,65,65)]">
                Choose your ride
            </h3>
        </div>
      
        <div className="bg-slate-50 p-3 rounded-lg border text-sm mb-4">
            <p><strong>From:</strong> {searchCriteria.pickup.name}</p>
            <p><strong>To:</strong> {searchCriteria.destination.name}</p>
        </div>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <LoadingIndicator />
          <p className="ml-3 text-slate-600">Finding available rides...</p>
        </div>
      )}
      {!isLoading && results.length === 0 && (
        <div className="text-center py-10">
          <p className="text-slate-600 text-lg">No drivers found nearby.</p>
          <p className="text-slate-500 mt-2">Please try adjusting your location or check back later.</p>
        </div>
      )}
      {!isLoading && results.length > 0 && (
        <div className="space-y-4">
          {results.map(result => (
            <div key={result.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-lg hover:border-[rgb(240,45,85)] transition-all duration-200">
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <CarIcon/>
                        <div className="ml-3">
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-lg text-slate-800">{result.shuttleTypeName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-bold text-2xl text-[rgb(35,65,65)]">₹{result.price.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-slate-500">total fare</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mt-3 pt-3 border-t">
                    <div className="flex items-center text-slate-600">
                    <RoadIcon/>
                    <span className="ml-2">{result.distanceKm.toFixed(1)} km</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                    <TimeIcon/>
                    <span className="ml-2">~ {result.estimatedDurationHours} hrs</span>
                    </div>
                </div>
                
                <button onClick={() => onSelectShuttle(result)} className="w-full mt-4 bg-[rgb(240,45,85)] text-white font-semibold py-2 px-4 rounded-md hover:bg-[rgb(220,35,75)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(240,45,85)] transition-colors">
                    Select & Continue
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};