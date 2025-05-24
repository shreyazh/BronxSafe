import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: Date;
  location?: string;
  category: string;
}

interface AlertContextType {
  activeAlerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);

  // Simulate fetching initial alerts
  useEffect(() => {
    // Mock data for demonstration
    const mockAlerts: Alert[] = [
      {
        id: '1',
        title: 'Police Activity',
        message: 'Increased police presence near Fordham Plaza due to reported incident.',
        severity: 'medium',
        timestamp: new Date(),
        location: 'Fordham Plaza',
        category: 'police',
      },
      {
        id: '2',
        title: 'Traffic Alert',
        message: 'Major delays on Grand Concourse due to accident. Seek alternate routes.',
        severity: 'high',
        timestamp: new Date(),
        location: 'Grand Concourse',
        category: 'traffic',
      }
    ];
    
    setActiveAlerts(mockAlerts);
  }, []);

  const addAlert = (alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date(),
    };
    
    setActiveAlerts((prev) => [newAlert, ...prev]);
  };

  const removeAlert = (id: string) => {
    setActiveAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const clearAlerts = () => {
    setActiveAlerts([]);
  };

  return (
    <AlertContext.Provider
      value={{
        activeAlerts,
        addAlert,
        removeAlert,
        clearAlerts,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};