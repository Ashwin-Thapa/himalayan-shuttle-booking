
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { AiIcon } from './icons/AiIcon';
import { LoadingIndicator } from './LoadingIndicator';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggleChat: () => void;
  messages: ChatMessageType[];
  onSendMessage: (message: string, imageBase64?: string, imageMimeType?: string) => void;
  isLoading: boolean;
  error: string | null;
}

const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onToggleChat,
  messages,
  onSendMessage,
  isLoading,
  error,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const initialMessage: ChatMessageType = {
    id: 'initial-ai-message',
    text: "Hello! I'm Himalayan Helper, your travel assistant. How can I help you today? Ask me about destinations, bookings, or general travel tips for the Himalayas.",
    sender: 'ai',
    timestamp: new Date()
  };

  const displayMessages = messages.length === 0 && !error && !isLoading ? [initialMessage] : messages;


  return (
    <>
      {!isOpen && (
        <button
          onClick={onToggleChat}
          className="fixed bottom-5 right-5 bg-[rgb(240,45,85)] text-white p-2.5 rounded-full shadow-lg hover:bg-[rgb(220,35,75)] transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50 z-50"
          aria-label="Open Himalayan Helper Chat"
        >
          <AiIcon className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-5 sm:right-5 w-full sm:w-96 h-[50vh] sm:h-auto sm:max-h-[480px] bg-white border border-slate-300 rounded-t-lg sm:rounded-lg shadow-lg flex flex-col z-50 transition-all duration-300 ease-out">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-slate-100 rounded-t-lg">
            <h3 className="text-lg font-semibold text-[rgb(35,65,65)] flex items-center">
              <AiIcon className="w-6 h-6 mr-2 text-[rgb(240,45,85)]" />
              Himalayan Helper Chat
            </h3>
            <button
              onClick={onToggleChat}
              className="text-slate-500 hover:text-slate-700"
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-slate-50">
            {displayMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && messages.length > 0 && messages[messages.length -1].sender === 'user' && (
                 <div className="flex justify-start">
                    <div className="flex items-center space-x-2 bg-slate-200 text-slate-700 p-2.5 rounded-lg max-w-[80%]">
                        <AiIcon className="w-5 h-5 text-slate-500 flex-shrink-0" />
                        <LoadingIndicator/>
                        <span className="text-sm italic">Himalayan Helper is typing...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Error Display */}
          {error && !isLoading && (
            <div className="p-2 text-center bg-red-50 text-red-600 text-xs border-t border-red-200">
              {error}
            </div>
          )}
          
          {/* Input Area */}
          <ChatInput onSendMessage={onSendMessage} disabled={isLoading} />
        </div>
      )}
    </>
  );
};