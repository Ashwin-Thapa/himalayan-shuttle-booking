import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Header } from './components/Header';
import { BookingSearchForm } from './components/BookingSearchForm';
import { FareEstimateScreen } from './components/SearchResultsDisplay';
import { BookingConfirmationScreen } from './components/BookingConfirmationScreen';
import { BookingSuccessScreen } from './components/BookingSuccessScreen';
import { CustomTourPlanner } from './components/CustomTourPlanner';
import { ChatWidget } from './components/ChatWidget';
import { AiDestinationSelectorModal } from './components/AiDestinationSelectorModal';
import { ApiKeyMissingScreen } from './components/ApiKeyMissingScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { SignupScreen } from './components/auth/SignupScreen';
import { ProfileScreen } from './components/auth/ProfileScreen';
import { PaymentScreen } from './components/payment/PaymentScreen';
import { DriverDashboard } from './components/driver/DriverDashboard';
import ErrorBoundary from './components/ErrorBoundary';
import { SearchParams, SearchResult, BookingStep, PassengerDetails, AiTravelSuggestion, ChatMessage as ChatMessageType, AppView, User, ConfirmedBookingPayload, RideStatus } from './types';
import { GoogleGenAI, Chat, GenerateContentResponse, Part } from "@google/genai";
import { locations as appLocations, shuttleTypes } from './constants';
import * as geminiService from './services/geminiService';
import * as mapService from './services/mapService';
import { AuthContext } from './context/AuthContext';


const API_KEY = process.env.API_KEY;

const App: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  const [searchCriteria, setSearchCriteria] = useState<SearchParams | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>('map_selection');
  const [selectedShuttle, setSelectedShuttle] = useState<SearchResult | null>(null);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({ fullName: '', email: '', phoneNumber: '' });
  
  // State for all ride requests (for driver dashboard)
  const [rideRequests, setRideRequests] = useState<ConfirmedBookingPayload[]>([]);

  // State for data moving between confirmation and success
  const [pendingPaymentData, setPendingPaymentData] = useState<ConfirmedBookingPayload | null>(null);
  const [confirmedBookingData, setConfirmedBookingData] = useState<ConfirmedBookingPayload | null>(null);
  
  const [activeView, setActiveView] = useState<AppView>('booking');
  
  // AI State
  const [ai, setAi] = useState<GoogleGenAI | null>(null);
  const [aiInitializationError, setAiInitializationError] = useState<string | null>(null);
  const [isApiKeyMissing, setIsApiKeyMissing] = useState<boolean>(false);
  const [aiTravelPlan, setAiTravelPlan] = useState<AiTravelSuggestion | null>(null);
  const [isAiTravelPlanLoading, setIsAiTravelPlanLoading] = useState<boolean>(false);
  const [aiTravelPlanError, setAiTravelPlanError] = useState<string | null>(null);

  // Custom Tour Planner State
  const [showCustomTourPlanner, setShowCustomTourPlanner] = useState<boolean>(false);
  const [customTourPlan, setCustomTourPlan] = useState<string | null>(null);
  const [isCustomTourPlanLoading, setIsCustomTourPlanLoading] = useState<boolean>(false);
  const [customTourPlanError, setCustomTourPlanError] = useState<string | null>(null);

  // Chatbot State
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [chatError, setChatError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setPassengerDetails(prev => ({ ...prev, fullName: user.fullName, email: user.email }));
    } else {
       setPassengerDetails({ fullName: '', email: '', phoneNumber: '' });
    }
  }, [user]);

  useEffect(() => {
    if (!API_KEY) {
      const errorMsg = "API Key is missing. Himalayan Helper features are unavailable.";
      setIsApiKeyMissing(true);
      setAiInitializationError(errorMsg);
      return;
    }
    try {
      const genAIInstance = new GoogleGenAI({ apiKey: API_KEY });
      setAi(genAIInstance);
      setChat(geminiService.initChatService(genAIInstance));
    } catch (error) {
      console.error("Failed to initialize GoogleGenAI:", error);
      const errorMsg = `Failed to initialize Himalayan Helper: ${(error as Error).message}.`;
      setAiInitializationError(errorMsg);
      setIsApiKeyMissing(true);
    }
  }, []);

  const handleFindRide = async (params: SearchParams) => {
    setSearchCriteria(params);
    setSearchResults([]);
    setIsSearchLoading(true);
    setBookingStep('fare_estimate');
    
    // Mock search delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const availableDrivers = mapService.findNearbyDrivers(params.pickup.point);

    const results: SearchResult[] = availableDrivers.map((driver, index) => {
        const distance = mapService.getHaversineDistance(params.pickup.point, params.destination.point);
        const price = mapService.calculateDynamicFare(distance, driver.shuttleTypeId);
        const estimatedDurationHours = Math.round((distance / 45) * 10) / 10; // Avg 45km/h for hill roads, rounded to 1 decimal
        
        return {
            id: `ride_option_${Date.now()}_${index}`,
            fromName: params.pickup.name,
            toName: params.destination.name,
            shuttleTypeId: driver.shuttleTypeId,
            shuttleTypeName: shuttleTypes.find(s => s.id === driver.shuttleTypeId)?.name || 'Vehicle',
            journeyDate: params.journeyDate,
            departureTime: params.journeyTime,
            estimatedDurationHours: estimatedDurationHours,
            price: price,
            passengers: params.passengers,
            distanceKm: distance,
            searchParams: params,
        };
    });
    
    setSearchResults(results);
    setIsSearchLoading(false);
  };
  
  const handleSelectShuttle = (shuttle: SearchResult) => {
    setSelectedShuttle(shuttle);
    setBookingStep('confirmation');
  };

  const handlePassengerDetailsChange = (details: PassengerDetails) => {
    setPassengerDetails(details);
  };
  
  const handleProceedToPayment = (bookingPayload: Omit<ConfirmedBookingPayload, 'id' | 'status'>) => {
    const newRideRequest: ConfirmedBookingPayload = {
      id: `ride_${Date.now()}`,
      status: 'pending',
      ...bookingPayload
    };
    
    setRideRequests(prev => [...prev, newRideRequest]);
    setPendingPaymentData(newRideRequest);
    setBookingStep('payment');
  };
  
  const handlePaymentSuccess = (paidBooking: ConfirmedBookingPayload) => {
      if (paidBooking) {
        setConfirmedBookingData(paidBooking);
        setPendingPaymentData(null);
        setBookingStep('booked');
      } else {
        handleBookAnother();
      }
  };

  const handleCancelBooking = () => {
    setSelectedShuttle(null);
    setBookingStep('fare_estimate');
  };

  const handleCancelPayment = () => {
      setPendingPaymentData(null);
      setBookingStep('confirmation');
  };

  const handleBookAnother = () => {
    setSearchCriteria(null);
    setSearchResults([]);
    setSelectedShuttle(null);
    setConfirmedBookingData(null);
    setPendingPaymentData(null);
    setBookingStep('map_selection');
    if (!user) {
        setPassengerDetails({ fullName: '', email: '', phoneNumber: '' });
    }
    setAiTravelPlan(null);
    setAiTravelPlanError(null);
    setActiveView('booking');
  };
  
  // --- Ride Management Handlers (for Driver) ---
  const handleAcceptRide = (rideId: string) => {
    setRideRequests(prevRides => prevRides.map(ride => 
      ride.id === rideId ? { ...ride, status: 'accepted', driver: user } : ride
    ));
  };
  
  const handleRejectRide = (rideId: string) => {
     setRideRequests(prevRides => prevRides.map(ride => 
      ride.id === rideId ? { ...ride, status: 'rejected' } : ride
    ));
  };
  
  const handleCompleteRide = (rideId: string) => {
    setRideRequests(prevRides => prevRides.map(ride => 
      ride.id === rideId ? { ...ride, status: 'completed' } : ride
    ));
  };

  const handleCancelRideByDriver = (rideId: string) => {
     setRideRequests(prevRides => prevRides.map(ride => 
      ride.id === rideId ? { ...ride, status: 'cancelled_by_driver' } : ride
    ));
  };

  const handleViewChange = (view: AppView) => {
    setActiveView(view);
    if (view === 'booking') {
        handleBookAnother(); // Reset passenger view
    }
  };

  const handleLogout = () => {
    logout();
    setActiveView('booking');
    setBookingStep('map_selection');
  };

  const fetchAiTravelPlanForSuccessScreen = useCallback(async (shuttle: SearchResult, prefersVeg: boolean) => {
    if (!ai || aiInitializationError) return;
    setIsAiTravelPlanLoading(true);
    setAiTravelPlan(null);
    setAiTravelPlanError(null);
    try {
      const plan = await geminiService.fetchAiTravelPlanService(ai, shuttle);
      setAiTravelPlan(plan);
    } catch (error) {
      setAiTravelPlanError((error as Error).message || "An unknown error occurred.");
    } finally {
      setIsAiTravelPlanLoading(false);
    }
  }, [ai, aiInitializationError]);
  
  const handleSendMessageToChatbot = async (messageText: string, imageBase64?: string, imageMimeType?: string) => {
    if (!chat || !ai || aiInitializationError) {
      const errorMessage: ChatMessageType = { id: `ai-err-${Date.now()}`, text: "Himalayan Helper chat is unavailable.", sender: 'ai', error: true, timestamp: new Date() };
      setChatMessages(prev => [...prev, errorMessage]);
      return;
    }
    const newUserMessage: ChatMessageType = { id: `user-${Date.now()}`, text: messageText, sender: 'user', timestamp: new Date(), image: imageBase64 };
    setChatMessages(prev => [...prev, newUserMessage]);
    setIsChatLoading(true);
    let imagePart: Part | null = imageBase64 ? { inlineData: { data: imageBase64.split(',')[1], mimeType: imageMimeType! } } : null;
    try {
      const aiResponseText = await geminiService.sendMessageToChatbotService(chat, messageText, imagePart);
      const newAiMessage: ChatMessageType = { id: `ai-${Date.now()}`, text: aiResponseText, sender: 'ai', timestamp: new Date() };
      setChatMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
       const newAiErrorMessage: ChatMessageType = { id: `ai-err-${Date.now()}`, text: (error as Error).message, sender: 'ai', error: true, timestamp: new Date() };
       setChatMessages(prev => [...prev, newAiErrorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };


  if (isApiKeyMissing && aiInitializationError) {
    return <ApiKeyMissingScreen errorMessage={aiInitializationError} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'login':
        return <LoginScreen onLoginSuccess={() => handleViewChange('booking')} onSwitchToSignup={() => setActiveView('signup')} />;
      case 'signup':
        return <SignupScreen onSignupSuccess={() => handleViewChange('booking')} onSwitchToLogin={() => setActiveView('login')} />;
      case 'profile':
        return <ProfileScreen onNavigateBack={() => handleViewChange('booking')} />;
      case 'driver':
        return <DriverDashboard 
                    rideRequests={rideRequests} 
                    currentDriver={user}
                    onAcceptRide={handleAcceptRide}
                    onRejectRide={handleRejectRide}
                    onCompleteRide={handleCompleteRide}
                    onCancelRide={handleCancelRideByDriver}
                />;
      case 'booking':
      default:
        return (
          <>
            {bookingStep === 'map_selection' && <BookingSearchForm onFindRide={handleFindRide} />}
            {bookingStep === 'fare_estimate' && <FareEstimateScreen results={searchResults} isLoading={isSearchLoading} searchCriteria={searchCriteria} onSelectShuttle={handleSelectShuttle} onBack={() => setBookingStep('map_selection')} />}
            {bookingStep === 'confirmation' && selectedShuttle && (
              <BookingConfirmationScreen shuttle={selectedShuttle} passengerContact={passengerDetails} onPassengerDetailsChange={handlePassengerDetailsChange} onConfirmBooking={handleProceedToPayment} onCancel={handleCancelBooking} />
            )}
            {bookingStep === 'payment' && pendingPaymentData && (
                <PaymentScreen bookingData={pendingPaymentData} onPaymentSuccess={() => handlePaymentSuccess(pendingPaymentData)} onCancelPayment={handleCancelPayment} />
            )}
            {bookingStep === 'booked' && confirmedBookingData && (
              <BookingSuccessScreen 
                bookingData={confirmedBookingData} 
                rideRequests={rideRequests}
                onBookAnother={handleBookAnother} 
                onFetchAiTravelPlan={fetchAiTravelPlanForSuccessScreen} 
                aiTravelPlan={aiTravelPlan} 
                isAiTravelPlanLoading={isAiTravelPlanLoading} 
                aiTravelPlanError={aiTravelPlanError} 
                aiInitializationError={aiInitializationError} 
                isApiKeyMissing={isApiKeyMissing}
                />
            )}
          </>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col items-center font-[sans-serif] text-slate-800">
        <Header 
          onCustomTourClick={() => setShowCustomTourPlanner(true)} 
          onLoginClick={() => handleViewChange('login')}
          onSignupClick={() => handleViewChange('signup')}
          onProfileClick={() => handleViewChange('profile')}
          onLogoutClick={handleLogout}
          onHomeClick={() => handleViewChange('booking')}
          onViewChange={handleViewChange}
          currentView={activeView}
        />
        <main className="flex-grow w-full max-w-4xl p-4 flex flex-col items-center">
          {renderContent()}
        </main>
        
        {/* Modals and Widgets */}
        <CustomTourPlanner
          isOpen={showCustomTourPlanner}
          onClose={() => setShowCustomTourPlanner(false)}
          onSubmit={async (prefs) => {
              if(!ai) return;
              setIsCustomTourPlanLoading(true);
              try {
                  const plan = await geminiService.fetchCustomTourPlanService(ai, prefs);
                  setCustomTourPlan(plan);
              } catch(e) {
                  setCustomTourPlanError((e as Error).message);
              } finally {
                  setIsCustomTourPlanLoading(false);
              }
          }}
          plan={customTourPlan}
          isLoading={isCustomTourPlanLoading}
          error={customTourPlanError}
          onClearPlan={() => setCustomTourPlan(null)}
          onProceedToBooking={() => {
              setShowCustomTourPlanner(false);
              handleBookAnother();
          }}
        />
        <ChatWidget
          isOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(!isChatOpen)}
          messages={chatMessages}
          onSendMessage={handleSendMessageToChatbot}
          isLoading={isChatLoading}
          error={chatError}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;