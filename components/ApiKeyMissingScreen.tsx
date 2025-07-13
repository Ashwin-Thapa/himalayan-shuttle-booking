import React from 'react';

const WarningIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-red-500 mx-auto mb-6">
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.519 13.008a3.001 3.001 0 0 1-2.598 4.504H4.48c-1.963 0-3.37-2.026-2.599-4.504L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
  </svg>
);

interface ApiKeyMissingScreenProps {
  errorMessage: string;
}

export const ApiKeyMissingScreen: React.FC<ApiKeyMissingScreenProps> = ({ errorMessage }) => {
  return (
    <div className="fixed inset-0 bg-slate-800 flex flex-col items-center justify-center p-8 z-[100]">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md">
        <WarningIcon />
        <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
        <p className="text-slate-700 mb-2">
          Himalayan Helper services cannot be initialized.
        </p>
        <p className="text-sm text-slate-600 bg-red-50 p-3 rounded-md border border-red-200">
          <strong>Details:</strong> {errorMessage}
        </p>
        <p className="text-xs text-slate-500 mt-6">
          Please ensure the <code className="bg-slate-200 px-1 rounded">API_KEY</code> environment variable is correctly set up and the application is rebuilt/restarted if necessary.
          Contact support if the issue persists.
        </p>
      </div>
    </div>
  );
};