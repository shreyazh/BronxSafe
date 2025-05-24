import React, { useState } from 'react';
import { AlertTriangle, Filter, Map, Trash2, Bell, BellOff, CheckCircle } from 'lucide-react';
import { useAlert, Alert } from '../contexts/AlertContext';
import { useUser } from '../contexts/UserContext';

const AlertsPage: React.FC = () => {
  const { activeAlerts, removeAlert } = useAlert();
  const { user, isAuthenticated, updateProfile } = useUser();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    email: user?.alertPreferences.email || false,
    push: user?.alertPreferences.push || false,
    categories: user?.alertPreferences.categories || ['crime', 'emergency'],
    radius: user?.alertPreferences.radius || 1,
  });
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  const filteredAlerts = activeAlerts.filter(alert => {
    if (selectedCategory && alert.category !== selectedCategory) return false;
    if (selectedSeverity && alert.severity !== selectedSeverity) return false;
    return true;
  });

  const handleUpdatePreferences = async () => {
    if (isAuthenticated && user) {
      try {
        await updateProfile({
          ...user,
          alertPreferences: preferences,
        });
        setPreferencesSaved(true);
        setTimeout(() => setPreferencesSaved(false), 3000);
      } catch (error) {
        console.error('Failed to update preferences:', error);
      }
    }
  };

  const handleCategoryChange = (category: string) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category],
    }));
  };

  const severityColors = {
    critical: 'bg-red-600',
    high: 'bg-orange-600',
    medium: 'bg-yellow-600',
    low: 'bg-blue-600',
  };

  const categories = [
    { id: 'crime', label: 'Crime' },
    { id: 'traffic', label: 'Traffic' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'police', label: 'Police Activity' },
    { id: 'weather', label: 'Weather' },
    { id: 'community', label: 'Community' },
  ];

  const severities = [
    { id: 'critical', label: 'Critical' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Community Alerts</h1>
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              <Bell size={16} className="mr-2" />
              Alert Preferences
            </button>
          </div>

          {/* Alert Preferences Panel */}
          {showPreferences && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Alert Preferences</h2>
                {preferencesSaved && (
                  <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                    <CheckCircle size={16} className="mr-1" />
                    Preferences saved
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Notification Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="email-notifications"
                        type="checkbox"
                        checked={preferences.email}
                        onChange={() => setPreferences(prev => ({ ...prev, email: !prev.email }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={!isAuthenticated}
                      />
                      <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">
                        Email Notifications
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="push-notifications"
                        type="checkbox"
                        checked={preferences.push}
                        onChange={() => setPreferences(prev => ({ ...prev, push: !prev.push }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={!isAuthenticated}
                      />
                      <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-700">
                        Push Notifications
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Alert Radius</h3>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={preferences.radius}
                        onChange={(e) => setPreferences(prev => ({ ...prev, radius: parseFloat(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        disabled={!isAuthenticated}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">{preferences.radius} miles</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Alert Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <input
                          id={`category-${category.id}`}
                          type="checkbox"
                          checked={preferences.categories.includes(category.id)}
                          onChange={() => handleCategoryChange(category.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          disabled={!isAuthenticated}
                        />
                        <label htmlFor={`category-${category.id}`} className="ml-2 block text-sm text-gray-700">
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors mr-3"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePreferences}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated ? 'Save Preferences' : 'Sign in to Save'}
                </button>
              </div>
              
              {!isAuthenticated && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> You need to be signed in to save your alert preferences.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center mb-3">
              <Filter size={16} className="text-gray-500 mr-2" />
              <h2 className="text-sm font-medium text-gray-700">Filter Alerts</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category-filter" className="block text-xs text-gray-600 mb-1">
                  Category
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="severity-filter" className="block text-xs text-gray-600 mb-1">
                  Severity
                </label>
                <select
                  id="severity-filter"
                  value={selectedSeverity || ''}
                  onChange={(e) => setSelectedSeverity(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">All Severities</option>
                  {severities.map((severity) => (
                    <option key={severity.id} value={severity.id}>
                      {severity.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
              <h2 className="text-sm font-medium text-gray-700">Active Alerts ({filteredAlerts.length})</h2>
            </div>
            
            {filteredAlerts.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredAlerts.map((alert: Alert) => (
                  <div key={alert.id} className="p-4">
                    <div className="flex justify-between">
                      <div className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                        alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        <AlertTriangle size={12} className="mr-1" />
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </div>
                      <button
                        onClick={() => removeAlert(alert.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <span className="sr-only">Dismiss</span>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <h3 className="mt-2 text-lg font-medium text-gray-800">{alert.title}</h3>
                    <p className="mt-1 text-gray-600">{alert.message}</p>
                    
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-500">
                        <Map size={14} className="mr-1" />
                        {alert.location || 'Unknown location'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <BellOff size={24} className="text-gray-400" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No alerts found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedCategory || selectedSeverity
                    ? 'Try changing your filters to see more alerts.'
                    : 'There are no active alerts at this time.'}
                </p>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-3">Alert Levels Explained</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="mt-1 w-3 h-3 rounded-full bg-red-600 mr-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Critical</h3>
                    <p className="text-xs text-gray-600">
                      Immediate danger or threat. Requires urgent attention or action.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 w-3 h-3 rounded-full bg-orange-600 mr-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">High</h3>
                    <p className="text-xs text-gray-600">
                      Serious situation that may pose a significant risk to safety.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 w-3 h-3 rounded-full bg-yellow-600 mr-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Medium</h3>
                    <p className="text-xs text-gray-600">
                      Situation that requires awareness but not immediate action.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 w-3 h-3 rounded-full bg-blue-600 mr-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Low</h3>
                    <p className="text-xs text-gray-600">
                      General information or minor incidents. For awareness only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-3">Emergency Contacts</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Emergency Services</h3>
                  <p className="text-sm text-gray-600">911</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Non-Emergency Police</h3>
                  <p className="text-sm text-gray-600">311 or (718) 590-3500</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Bronx Borough President's Office</h3>
                  <p className="text-sm text-gray-600">(718) 590-3500</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">NYC Emergency Management</h3>
                  <p className="text-sm text-gray-600">(718) 422-8700</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;