
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LoadingSpinner } from '../LoadingSpinner';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onSwitchToSignup: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl animate-fadeIn">
      <h2 className="text-3xl font-bold text-[rgb(35,65,65)] mb-6 text-center">Login</h2>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm mb-4 border border-red-200">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)] sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" a-label="Password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-[rgb(240,45,85)] focus:border-[rgb(240,45,85)] sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(240,45,85)] hover:bg-[rgb(220,35,75)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(240,45,85)] disabled:opacity-50"
          >
            {isLoading ? <LoadingSpinner size="h-5 w-5" color="text-white" /> : 'Login'}
          </button>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        Don't have an account?{' '}
        <button onClick={onSwitchToSignup} className="font-medium text-[rgb(240,45,85)] hover:text-[rgb(220,35,75)]">
          Sign up
        </button>
      </p>
    </div>
  );
};
