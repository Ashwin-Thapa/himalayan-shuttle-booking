
import React, { Component, ErrorInfo, ReactNode } from 'react';

// Using the same WarningIcon structure as in ApiKeyMissingScreen.tsx for consistency
const WarningIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-red-500 mx-auto mb-6">
    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.519 13.008a3.001 3.001 0 0 1-2.598 4.504H4.48c-1.963 0-3.37-2.026-2.599-4.504L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
  </svg>
);

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4 text-center" role="alert">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md">
            <WarningIcon />
            <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
            <p className="text-slate-700 mb-4">
              We encountered an unexpected problem. Please try refreshing the page. If the problem persists, please contact support.
            </p>
            {/* Display error details in development for easier debugging */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 text-left text-xs text-slate-600 bg-red-50 p-3 rounded-md border border-red-200">
                <summary className="font-semibold cursor-pointer">Error Details (Development)</summary>
                <pre className="mt-2 whitespace-pre-wrap" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors font-semibold"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
