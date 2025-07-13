
import React, { useState } from 'react';
import { ConfirmedBookingPayload } from '../../types';
import { LoadingSpinner } from '../LoadingSpinner';
import { CardIcon } from '../icons/CardIcon';
import { UpiIcon } from '../icons/UpiIcon';
import { PayLaterIcon } from '../icons/PayLaterIcon';

interface PaymentScreenProps {
  bookingData: ConfirmedBookingPayload;
  onPaymentSuccess: (bookingData: ConfirmedBookingPayload) => void;
  onCancelPayment: () => void;
}

type PaymentMethod = 'card' | 'upi' | 'later' | null;

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ bookingData, onPaymentSuccess, onCancelPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handlePayment = async (method: PaymentMethod) => {
    setIsLoading(true);
    setPaymentError(null);
    console.log(`Simulating payment via: ${method}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate a random failure for card/upi to show error handling
    if ((method === 'card' || method === 'upi') && Math.random() < 0.1) {
        setPaymentError('Your payment could not be processed. Please try another method or check your details.');
        setIsLoading(false);
    } else {
        onPaymentSuccess(bookingData);
    }
  };

  const PaymentOption: React.FC<{
    method: PaymentMethod,
    title: string,
    children: React.ReactNode
    icon: React.ReactNode
  }> = ({ method, title, children, icon }) => (
    <div className={`border rounded-lg transition-all duration-200 ${selectedMethod === method ? 'border-[rgb(240,45,85)] shadow-lg' : 'border-slate-300'}`}>
        <button
            onClick={() => setSelectedMethod(method)}
            className="w-full text-left p-4 flex items-center bg-slate-50 rounded-t-lg"
            aria-expanded={selectedMethod === method}
        >
            {icon}
            <span className="font-semibold text-slate-800">{title}</span>
        </button>
        {selectedMethod === method && (
            <div className="p-4 bg-white rounded-b-lg animate-fadeIn">
                {children}
            </div>
        )}
    </div>
  );

  return (
    <div className="w-full max-w-lg bg-white p-6 md:p-8 rounded-xl shadow-2xl animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold text-[rgb(35,65,65)] mb-4 text-center">Complete Your Payment</h2>
        
        <div className="text-center bg-slate-100 p-4 rounded-lg border border-slate-200 mb-6">
            <p className="text-slate-600">Total Amount Due</p>
            <p className="text-4xl font-bold text-[rgb(35,65,65)]">₹{bookingData.finalPrice.toLocaleString('en-IN')}</p>
        </div>

        {paymentError && (
             <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4 border border-red-200">
                {paymentError}
            </div>
        )}

        <div className="space-y-4">
            <PaymentOption method="card" title="Credit / Debit Card" icon={<CardIcon className="w-6 h-6 mr-3 text-slate-500"/>}>
                <form onSubmit={(e) => { e.preventDefault(); handlePayment('card'); }} className="space-y-3">
                    <input type="text" placeholder="Card Number" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[rgb(240,45,85)]" required/>
                    <div className="flex gap-3">
                        <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-[rgb(240,45,85)]" required/>
                        <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-[rgb(240,45,85)]" required/>
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-green-500 text-white py-2.5 rounded-md hover:bg-green-600 disabled:opacity-50 flex justify-center items-center">
                        {isLoading ? <LoadingSpinner size="h-5 w-5" color="text-white"/> : `Pay ₹${bookingData.finalPrice.toLocaleString('en-IN')}`}
                    </button>
                </form>
            </PaymentOption>

            <PaymentOption method="upi" title="UPI (Google Pay, PhonePe, etc)" icon={<UpiIcon className="w-6 h-6 mr-3 text-slate-500"/>}>
                 <form onSubmit={(e) => { e.preventDefault(); handlePayment('upi'); }} className="space-y-3">
                    <input type="text" placeholder="Enter your UPI ID" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[rgb(240,45,85)]" required/>
                     <button type="submit" disabled={isLoading} className="w-full bg-green-500 text-white py-2.5 rounded-md hover:bg-green-600 disabled:opacity-50 flex justify-center items-center">
                        {isLoading ? <LoadingSpinner size="h-5 w-5" color="text-white"/> : `Pay ₹${bookingData.finalPrice.toLocaleString('en-IN')}`}
                    </button>
                </form>
            </PaymentOption>

             <PaymentOption method="later" title="Pay Later" icon={<PayLaterIcon className="w-6 h-6 mr-3 text-slate-500"/>}>
                <p className="text-sm text-slate-600 mb-3">Confirm your booking now and pay the driver in cash at the start of your journey.</p>
                <button onClick={() => handlePayment('later')} disabled={isLoading} className="w-full bg-blue-500 text-white py-2.5 rounded-md hover:bg-blue-600 disabled:opacity-50 flex justify-center items-center">
                     {isLoading ? <LoadingSpinner size="h-5 w-5" color="text-white"/> : 'Confirm Booking & Pay Later'}
                </button>
            </PaymentOption>
        </div>

         <div className="mt-8">
            <button
                onClick={onCancelPayment}
                disabled={isLoading}
                className="w-full bg-slate-200 text-slate-700 py-2.5 px-4 rounded-lg shadow-sm hover:bg-slate-300 disabled:opacity-50"
            >
                Back to Confirmation
            </button>
        </div>

    </div>
  );
};
