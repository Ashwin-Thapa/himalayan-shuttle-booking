
import React, { useState, useRef } from 'react';
import { SendIcon } from './icons/SendIcon';
import { PaperClipIcon } from './icons/PaperClipIcon'; // New Icon
import { MicrophoneIcon } from './icons/MicrophoneIcon'; // New Icon
import { XCircleIcon } from './icons/XCircleIcon'; // New Icon for clearing image

interface ChatInputProps {
  onSendMessage: (message: string, imageBase64?: string, imageMimeType?: string) => void;
  disabled?: boolean;
}

// SpeechRecognition type handling for browsers that support it
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
let recognition: any | null = null;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<{ base64: string; name: string; type: string } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage({
          base64: reader.result as string,
          name: file.name,
          type: file.type,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select an image file.');
    }
    // Reset file input value to allow selecting the same file again
    if (event.target) {
        event.target.value = ''; 
    }
  };

  const clearAttachedImage = () => {
    setAttachedImage(null);
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Voice recognition is not supported by your browser.');
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsRecording(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      alert(`Voice recognition error: ${event.error}`);
      setIsRecording(false);
    };
    
    recognition.onspeechend = () => {
        recognition.stop();
        setIsRecording(false);
    };
    recognition.onend = () => {
        setIsRecording(false);
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageToSend = inputText.trim();
    if ((messageToSend || attachedImage) && !disabled) {
      onSendMessage(messageToSend, attachedImage?.base64, attachedImage?.type);
      setInputText('');
      setAttachedImage(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border-t border-slate-200 bg-white"
      aria-label="Chat input form"
    >
      {attachedImage && (
        <div className="mb-2 p-2 bg-slate-100 rounded-md flex items-center justify-between text-sm">
          <div className="flex items-center overflow-hidden">
            <img src={attachedImage.base64} alt="Preview" className="w-10 h-10 object-cover rounded mr-2" />
            <span className="text-slate-700 truncate">{attachedImage.name}</span>
          </div>
          <button
            type="button"
            onClick={clearAttachedImage}
            className="text-slate-500 hover:text-slate-700 p-1"
            aria-label="Remove attached image"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageAttach}
          accept="image/*"
          className="hidden"
          aria-label="Attach image file"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isRecording}
          className="p-2.5 text-slate-500 hover:text-[rgb(240,45,85)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50 disabled:opacity-50 transition-colors"
          aria-label="Attach image"
        >
          <PaperClipIcon className="w-5 h-5" />
        </button>
         <button
          type="button"
          onClick={handleVoiceInput}
          disabled={disabled || !SpeechRecognition} // Disable if recognition stopped or mid-text-entry
          className={`p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50 disabled:opacity-50 transition-colors ${
            isRecording ? 'text-red-500 animate-pulse' : 'text-slate-500 hover:text-[rgb(240,45,85)]'
          }`}
          aria-label={isRecording ? "Stop recording" : "Start voice input"}
        >
          <MicrophoneIcon className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={disabled ? "AI is responding..." : isRecording ? "Listening..." : "Type or say something..."}
          className="flex-grow p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-[rgb(240,45,85)] focus:border-transparent outline-none text-sm transition-shadow placeholder:text-slate-400"
          disabled={disabled || isRecording}
          aria-label="Chat message input"
        />
        <button
          type="submit"
          disabled={disabled || (!inputText.trim() && !attachedImage) || isRecording}
          className="p-2.5 bg-[rgb(240,45,85)] text-white rounded-lg hover:bg-[rgb(220,35,75)] focus:outline-none focus:ring-2 focus:ring-[rgb(240,45,85)] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Send chat message"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};