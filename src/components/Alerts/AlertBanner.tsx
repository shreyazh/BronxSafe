import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useAlert } from '../../contexts/AlertContext';

const AlertBanner: React.FC = () => {
  const { activeAlerts } = useAlert();
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (activeAlerts.length > 0) {
      setShowBanner(true);
      
      // Rotate through alerts every 8 seconds
      const interval = setInterval(() => {
        setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % activeAlerts.length);
      }, 8000);
      
      return () => clearInterval(interval);
    } else {
      setShowBanner(false);
    }
  }, [activeAlerts]);

  const currentAlert = activeAlerts[currentAlertIndex];
  
  if (!showBanner || !currentAlert) return null;

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-600';
      case 'medium':
        return 'bg-yellow-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className={`${getAlertColor(currentAlert.severity)} text-white py-2 px-4`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle size={18} className="mr-2 flex-shrink-0" />
          <div className="text-sm font-medium mr-2">{currentAlert.title}:</div>
          <div className="text-sm">{currentAlert.message}</div>
        </div>
        <button 
          onClick={() => setShowBanner(false)}
          className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close alert"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;