


import React, { useState, useEffect, useMemo } from 'react';
import { SearchResult, PassengerDetails, DarshanPassType, ConfirmedBookingPayload } from '../types';
import { DARSHAN_PASS_PRICES } from '../constants';
import { InfoIcon } from './icons/InfoIcon'; // Added InfoIcon


interface BookingConfirmationScreenProps {
  shuttle: SearchResult;
  passengerContact: PassengerDetails;
  onPassengerDetailsChange: (details: PassengerDetails) => void;
  onConfirmBooking: (payload: Omit<ConfirmedBookingPayload, 'id' | 'status'>) => void;
  onCancel: () => void;
}

// Icon Props interface
interface IconProps extends React.SVGProps<SVGSVGElement> {}

// Icons
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500 mr-2">
    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.145l.002-.001L10 18.43l.001.001.281.145.002.001.018.008.006.003c.198.086.307.066.307.066s.11-.02.308.066l.003.001a1.153 1.153 0 0 0 .626-1.012V13.379a1.152 1.152 0 0 0-.626-1.012L10 11.86l-1.06.497a1.152 1.152 0 0 0-.627 1.012v4.542c0 .405.218.778.567.971l.003.002Z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M10 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm0 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" clipRule="evenodd" />
  </svg>
);
const CalendarIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500 mr-2">
    <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c0-.414.336-.75.75-.75h10.5a.75.75 0 0 1 .75.75v.25c0 .414-.336-.75-.75-.75H5.5a.75.75 0 0 1-.75-.75V7.5Z" clipRule="evenodd" />
  </svg>
);
const UsersIconSvg: React.FC<IconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
  </svg>
);
const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500 mr-2">
    <path fillRule="evenodd" d="M10.707 2.293a1 1 0 0 0-1.414 0L6.636 4.94A1 1 0 0 0 6 5.646V7H4a1 1 0 0 0-1 1v2.5A2.5 2.5 0 0 0 .5 13v1A1.5 1.5 0 0 0 2 15.5h16a1.5 1.5 0 0 0 1.5-1.5v-1a2.5 2.5 0 0 0-2.5-2.5V8a1 1 0 0 0-1-1h-2v-1.354a1 1 0 0 0-.636-.906l-2.657-2.657ZM4.75 11a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm10.5 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    <path d="M2 8h16V6.5a.5.5 0 0 0-.276-.447l-3-2A.5.5 0 0 0 14.5 4H14V3.5a.5.5 0 0 0-.146-.354L11.146.439A.5.5 0 0 0 10.5 0h-1a.5.5 0 0 0-.354.146L6.439 2.854A.5.5 0 0 0 6 3.207V4h-.5a.5.5 0 0 0-.224.053l-3 2A.5.5 0 0 0 2 6.5V8Z" />
  </svg>
);
const TimeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500 mr-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);
const RoadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500 mr-2">
      <path fillRule="evenodd" d="M2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1-1H3a1 1 0 0 1-1-1V3Zm3.5 1.5a.75.75 0 0 0-1.5 0v11a.75.75 0 0 0 1.5 0v-11ZM10 4.25a.75.75 0 0 1 .75.75v10a.75.75 0 0 1-1.5 0v-10a.75.75 0 0 1 .75-.75Zm4.5 0a.75.75 0 0 0-1.5 0v11a.75.75 0 0 0 1.5 0v-11Z" clipRule="evenodd" />
    </svg>
);
const PriceTagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500 mr-2">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10.945C19.563 16 20 15.563 20 15V5c0-.563-.437-1-1.055-1H10a2 2 0 00-2 2v1a2 2 0 01-2 2H3.055c-.394.093-.63.463-.555.858.075.394.462.63.857.554ZM11 5a1 1 0 100 2h4a1 1 0 100-2h-4Z" />
    </svg>
);
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.001a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.001.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
  </svg>
);
const TempleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-600 mr-2">
    <path d="M10.75 2.75a.75.75 0 00-1.5 0V4.5h.75a.75.75 0 01.75.75v2.25H6.5V5.25a.75.75 0 01.75-.75h.75V2.75a.75.75 0 00-1.5 0V4.5H3.75A1.75 1.75 0 002 6.25v8.5A1.75 1.75 0 003.75 16.5h12.5A1.75 1.75 0 0018 14.75v-8.5A1.75 1.75 0 0016.25 4.5H13V2.75a.75.75 0 00-.75-.75h-.75V4.5h.75a.75.75 0 01.75.75v2.25h-4V5.25a.75.75 0 01.75-.75h.75V2.75z" />
    <path fillRule="evenodd" d="M5 6.5A.5.5 0 015.5 6h9a.5.5 0 01.5.5v8a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-8zM6 7.5v1h8V7.5H6zm0 2.5v4h8v-4H6z" clipRule="evenodd" />
  </svg>
);
const TicketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500 mr-2">
        <path d="M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25ZM9.72 12.53l-1.148.922a.75.75 0 01-1.122-.702V8.53a.75.75 0 011.122-.702l1.148.922a.75.75 0 00.56 0l1.148-.922a.75.75 0 011.122.702v3.218a.75.75 0 01-1.122.702l-1.148-.922a.75.75 0 00-.56 0Z" />
    </svg>
);


interface InputWrapperProps {
  children: React.ReactNode;
  isFocused: boolean;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ children, isFocused }) => (
  <div 
    className={`relative rounded-lg transition-all duration-150 ease-in-out ${
      isFocused ? 'ring-2 ring-[rgb(240,45,85)] shadow-md' : 'ring-1 ring-gray-300'
    }`}
  >
    {children}
  </div>
);


export const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({ 
    shuttle: shuttleDetails, 
    passengerContact: initialPassengerContact, 
    onPassengerDetailsChange, 
    onConfirmBooking, 
    onCancel 
}) => {
  const [currentPassengerContact, setCurrentPassengerContact] = useState<PassengerDetails>(initialPassengerContact);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedDarshanPass, setSelectedDarshanPass] = useState<DarshanPassType>('none');
  const [prefersVegMeals, setPrefersVegMeals] = useState<boolean>(false);
  
  const isKamakhyaBooking = shuttleDetails.toName.toLowerCase().includes('kamakhya');

  useEffect(() => {
    setCurrentPassengerContact(initialPassengerContact);
  }, [initialPassengerContact]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedDetails = { ...currentPassengerContact, [name]: value };
    setCurrentPassengerContact(updatedDetails);
    onPassengerDetailsChange(updatedDetails); // Propagate change up for App.tsx state
  };

  const baseFare = useMemo(() => {
    return shuttleDetails.price; // Price is always the total vehicle price.
  }, [shuttleDetails.price]);

  const currentTotalPrice = useMemo(() => {
    let total = baseFare;
    if (isKamakhyaBooking && selectedDarshanPass !== 'none') {
      total += DARSHAN_PASS_PRICES[selectedDarshanPass as Exclude<DarshanPassType, 'none'>];
    }
    return total;
  }, [baseFare, selectedDarshanPass, isKamakhyaBooking]);

  const handleConfirm = () => {
    if (!currentPassengerContact.fullName || !currentPassengerContact.email || !currentPassengerContact.phoneNumber) {
      alert("Please fill in all passenger contact details.");
      return;
    }
    const payload: Omit<ConfirmedBookingPayload, 'id' | 'status'> = {
      shuttleDetails: shuttleDetails,
      passengerContact: currentPassengerContact,
      darshanPassType: isKamakhyaBooking ? selectedDarshanPass : 'none',
      prefersVegMeals: isKamakhyaBooking ? prefersVegMeals : false,
      finalPrice: currentTotalPrice,
      passengerUser: null, // This would be set in App.tsx from context
    };
    onConfirmBooking(payload);
  };


  return (
    <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-[rgb(35,65,65)] mb-6 text-center">Confirm Your Booking</h2>
      
      <div className="space-y-3 text-slate-700 mb-6">
        <h3 className="text-lg font-semibold text-[rgb(35,65,65)] border-b pb-2 mb-3">Shuttle Details</h3>
        <div className="flex items-center p-3 bg-slate-50 rounded-lg">
          <CarIcon /> 
          <div>
            <span className="font-semibold mr-2">Shuttle Type:</span> {shuttleDetails.shuttleTypeName}
          </div>
        </div>
        <div className="flex items-center p-3 bg-slate-50 rounded-lg">
          <LocationIcon />
          <span className="font-semibold mr-2">Route:</span> {shuttleDetails.fromName} &rarr; {shuttleDetails.toName}
        </div>
        <div className="flex items-center p-3 bg-slate-50 rounded-lg">
          <CalendarIcon />
          <span className="font-semibold mr-2">Date:</span> {shuttleDetails.journeyDate}
        </div>
         <div className="flex items-center p-3 bg-slate-50 rounded-lg">
          <TimeIcon />
          <span className="font-semibold mr-2">Time:</span> {shuttleDetails.departureTime}
        </div>
        <div className="flex items-center p-3 bg-slate-50 rounded-lg">
          <RoadIcon />
          <span className="font-semibold mr-2">Distance:</span> {shuttleDetails.distanceKm.toFixed(1)} km (approx.)
        </div>
        <div className="flex items-center p-3 bg-slate-50 rounded-lg">
          <UsersIconSvg className="w-5 h-5 text-slate-500 mr-2" />
          <span className="font-semibold mr-2">Passengers:</span> {shuttleDetails.passengers}
        </div>
      </div>

      {isKamakhyaBooking && (
        <div className="my-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <h4 className="font-semibold text-md text-yellow-900 flex items-center mb-2">
            <InfoIcon className="w-5 h-5 mr-2 text-yellow-700" />
            Important Information for Kamakhya Temple Visit
          </h4>
          <p className="font-medium mb-1">Temple Timings (General):</p>
          <ul className="list-disc list-inside ml-4 mb-2 text-xs">
            <li><strong>Opening:</strong> 5:30 AM</li>
            <li><strong>Morning Darshan:</strong> 5:30 AM - 1:00 PM</li>
            <li><strong>Afternoon Break (Rituals):</strong> 1:00 PM - 2:30 PM (Temple may be closed to general public)</li>
            <li><strong>Evening Darshan:</strong> 2:30 PM - 5:30 PM</li>
            <li><strong>General Darshan Closure:</strong> 5:30 PM</li>
          </ul>
          <p className="text-xs mb-2">
            <strong>Ambubachi Mela:</strong> The temple typically remains closed for a few days around June 22nd-26th for the Ambubachi Mela. Please check specific dates if traveling during this period.
          </p>
          <p className="text-xs mb-2">
             <strong>Aarti & Rituals:</strong> Specific timings for Aartis and other rituals can vary. It is highly advisable to check with the temple authorities on-site for the most up-to-date information, especially during festivals.
          </p>
          <p className="text-xs font-semibold mt-3 pt-2 border-t border-yellow-300">
            <strong>Disclaimer:</strong> Himalayan Shuttle is a booking aggregator for transport to Kamakhya Temple. We are not responsible for temple rituals, puja activities, darshan queues, or pass arrangements beyond what is offered as an add-on. Please inquire directly with temple authorities for such services.
          </p>
        </div>
      )}

      <div className="space-y-4 mb-6 pt-4 border-t">
        <h3 className="text-lg font-semibold text-[rgb(35,65,65)] mb-3">Your Contact Details</h3>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[rgb(35,65,65)] mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
           <InputWrapper isFocused={focusedField === 'fullName'}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UsersIconSvg className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={currentPassengerContact.fullName}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('fullName')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-3 py-2.5 border-transparent rounded-lg focus:outline-none text-slate-800 bg-white"
              required
              aria-label="Full Name"
            />
          </InputWrapper>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[rgb(35,65,65)] mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
           <InputWrapper isFocused={focusedField === 'email'}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EmailIcon />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={currentPassengerContact.email}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-3 py-2.5 border-transparent rounded-lg focus:outline-none text-slate-800 bg-white"
              required
              aria-label="Email Address"
            />
          </InputWrapper>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-[rgb(35,65,65)] mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <InputWrapper isFocused={focusedField === 'phoneNumber'}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon />
            </div>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={currentPassengerContact.phoneNumber}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('phoneNumber')}
              onBlur={() => setFocusedField(null)}
              className="w-full pl-10 pr-3 py-2.5 border-transparent rounded-lg focus:outline-none text-slate-800 bg-white"
              required
              aria-label="Phone Number"
            />
          </InputWrapper>
        </div>
      </div>

      {isKamakhyaBooking && (
        <div className="space-y-4 mb-6 pt-4 border-t">
          <h3 className="text-lg font-semibold text-[rgb(35,65,65)] mb-3 flex items-center">
            <TempleIcon /> Kamakhya Darshan Add-on (Optional)
          </h3>
          <div>
            <label className="block text-sm font-medium text-[rgb(35,65,65)] mb-1">Darshan Pass Type</label>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
              {(['none', 'general', 'vip'] as DarshanPassType[]).map((passType) => (
                <label key={passType} className="flex items-center cursor-pointer text-sm text-slate-700 hover:text-[rgb(240,45,85)] transition-colors">
                  <input
                    type="radio"
                    name="darshanPassType"
                    value={passType}
                    checked={selectedDarshanPass === passType}
                    onChange={() => setSelectedDarshanPass(passType)}
                    className="form-radio h-4 w-4 text-[rgb(240,45,85)] border-gray-300 focus:ring-[rgb(240,45,85)] mr-2"
                  />
                  {passType === 'none' ? 'No Pass' : 
                   passType === 'general' ? `General Pass (₹${DARSHAN_PASS_PRICES.general})` :
                   `VIP Pass (₹${DARSHAN_PASS_PRICES.vip})`}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="flex items-center cursor-pointer text-sm text-slate-700 hover:text-[rgb(240,45,85)] transition-colors">
              <input
                type="checkbox"
                checked={prefersVegMeals}
                onChange={(e) => setPrefersVegMeals(e.target.checked)}
                className="form-checkbox h-4 w-4 text-[rgb(240,45,85)] border-gray-300 rounded focus:ring-[rgb(240,45,85)] mr-2"
              />
              Prefer Vegetarian Meals
            </label>
             <p className="text-xs text-slate-500 mt-1">Himalayan Helper will suggest general pilgrim-friendly hotels and vegetarian meal options.</p>
          </div>
        </div>
      )}
      
      <div className="pt-4 border-t">
        <div className="flex items-center p-3 bg-slate-100 rounded-lg border border-[rgb(240,45,85)] mb-6">
          <TicketIcon />
          <span className="font-semibold text-lg text-[rgb(35,65,65)] mr-2">Total Price:</span> 
          <span className="font-bold text-xl text-[rgb(35,65,65)]">₹{currentTotalPrice.toLocaleString('en-IN')}</span>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleConfirm}
            className="w-full sm:flex-1 bg-[rgb(240,45,85)] text-white py-3 px-4 rounded-lg shadow-md hover:bg-[rgb(220,35,75)] focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50 transition-colors duration-150 font-semibold"
          >
            Proceed to Payment
          </button>
          <button
            onClick={onCancel}
            className="w-full sm:flex-1 bg-slate-200 text-slate-700 py-3 px-4 rounded-lg shadow-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50 transition-colors duration-150 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};