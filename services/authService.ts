import { User } from '../types';

const USER_STORAGE_KEY = 'himalayan_shuttle_user';

// Mock function to simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const login = async (email: string, password: string): Promise<User> => {
  await delay(500); // Simulate API call

  // In a real app, this would be an API call. Here, we'll check localStorage.
  const storedUsers = JSON.parse(localStorage.getItem('users_db') || '{}');
  const userRecord = Object.values(storedUsers).find((u: any) => u.email.toLowerCase() === email.toLowerCase()) as User;

  if (userRecord) {
    // Mock password check - in reality, never store plain text passwords
    if (password) { // This is a mock, so we just check for existence
        // Add mock data if it doesn't exist for older stored users
        if (!userRecord.rating) {
            userRecord.rating = parseFloat((4.5 + Math.random() * 0.5).toFixed(1));
        }
        if (!userRecord.totalRides) {
             userRecord.totalRides = Math.floor(Math.random() * 50);
        }
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userRecord));
        return userRecord;
    }
  }

  throw new Error('Invalid email or password.');
};

export const signup = async (fullName: string, email: string, password: string): Promise<User> => {
    await delay(700);
    
    if (!fullName.trim() || !email.trim() || !password.trim()) {
        throw new Error('All fields are required.');
    }

    const storedUsers = JSON.parse(localStorage.getItem('users_db') || '{}');
    const emailExists = Object.values(storedUsers).some((u: any) => u.email.toLowerCase() === email.toLowerCase());

    if(emailExists) {
        throw new Error('An account with this email already exists.');
    }

    const newUser: User = {
        id: `user_${new Date().getTime()}`,
        fullName,
        email,
        rating: parseFloat((4.5 + Math.random() * 0.5).toFixed(1)), // Mock rating between 4.5 and 5.0
        totalRides: Math.floor(Math.random() * 50), // Mock rides
    };

    // Storing user in our mock DB and setting the current session
    storedUsers[newUser.id] = newUser;
    localStorage.setItem('users_db', JSON.stringify(storedUsers));
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

    return newUser;
};

export const logout = (): void => {
  localStorage.removeItem(USER_STORAGE_KEY);
};

export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser) as User;
       // Add mock data if it doesn't exist for older stored users
        if (!parsedUser.rating) {
            parsedUser.rating = parseFloat((4.5 + Math.random() * 0.5).toFixed(1));
        }
        if (!parsedUser.totalRides) {
             parsedUser.totalRides = Math.floor(Math.random() * 50);
        }
      return parsedUser;
    } catch (e) {
      console.error("Error parsing stored user data", e);
      logout(); // Clear corrupted data
      return null;
    }
  }
  return null;
};
