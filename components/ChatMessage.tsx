
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { UserIcon } from './icons/UserIcon';
import { AiIcon } from './icons/AiIcon';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const bubbleClasses = isUser
    ? 'bg-[rgb(240,45,85)] text-white rounded-l-lg rounded-br-lg ml-auto'
    : 'bg-slate-200 text-slate-800 rounded-r-lg rounded-bl-lg';
  
  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  const IconComponent = isUser ? UserIcon : AiIcon;
  const iconContainerClasses = isUser 
    ? `bg-slate-100 border border-[rgb(240,45,85)] text-[rgb(240,45,85)]` 
    : `bg-slate-100 border border-slate-300 text-slate-500`;

  return (
    <div className={`flex items-end space-x-2 ${containerClasses} animate-fadeIn group`}>
      {!isUser && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconContainerClasses}`}>
          <IconComponent className="w-5 h-5" />
        </div>
      )}
      <div
        className={`p-3 max-w-[80%] break-words ${bubbleClasses} shadow-sm`}
        aria-live={message.sender === 'ai' ? 'polite' : undefined}
        role="log"
      >
        {message.image && (
          <div className="mb-2 border border-slate-300 rounded overflow-hidden">
            <img 
              src={message.image} 
              alt="Uploaded content" 
              className="max-w-full h-auto max-h-40 object-contain rounded" 
            />
          </div>
        )}
        {message.isLoading && message.sender === 'ai' && !message.text ? (
          <span className="italic text-sm">Thinking...</span>
        ) : (
          message.text && <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        )}
        {message.error && (
            <p className={`text-xs ${isUser ? 'text-red-200' : 'text-red-500'} italic mt-1`}>
                Message failed or error in response.
            </p>
        )}
      </div>
      {isUser && (
         <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconContainerClasses}`}>
            <IconComponent className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};