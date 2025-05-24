import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  neighborhood: string | null;
  isAnonymous: boolean;
  alertPreferences: {
    email: boolean;
    push: boolean;
    categories: string[];
    radius: number; // in miles
  };
  savedRoutes: any[];
}

interface UserContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Simulate checking for a logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem('bronxSafeUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('bronxSafeUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate authentication API call
    // In a real app, this would call your authentication API
    try {
      // Mock successful login for demonstration
      const mockUser: UserProfile = {
        id: '123456',
        name: 'John Doe',
        email: email,
        neighborhood: 'Fordham',
        isAnonymous: false,
        alertPreferences: {
          email: true,
          push: true,
          categories: ['crime', 'traffic', 'emergency'],
          radius: 2,
        },
        savedRoutes: [],
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('bronxSafeUser', JSON.stringify(mockUser));
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('bronxSafeUser');
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate signup API call
    try {
      // Mock successful signup for demonstration
      const mockUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 15),
        name: name,
        email: email,
        neighborhood: null,
        isAnonymous: false,
        alertPreferences: {
          email: true,
          push: false,
          categories: ['crime', 'emergency'],
          radius: 1,
        },
        savedRoutes: [],
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('bronxSafeUser', JSON.stringify(mockUser));
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      // In a real app, this would call your API to update the user
      if (user) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('bronxSafeUser', JSON.stringify(updatedUser));
      }
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        signup,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};