import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, Layers, AlertTriangle, Bookmark, Check } from 'lucide-react';

const SafetyMapPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [routeStart, setRouteStart] = useState('');
  const [routeEnd, setRouteEnd] = useState('');
  const [layersOpen, setLayersOpen] = useState(false);
  const [selectedLayers, setSelectedLayers] = useState<string[]>([
    'recent-crimes',
    'police-stations',
    'street-lights'
  ]);
  const [isSavedRoute, setIsSavedRoute] = useState(false);
  const [routeCalculated, setRouteCalculated] = useState(false);
  
  // Simulating map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleLayerToggle = (layer: string) => {
    setSelectedLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer) 
        : [...prev, layer]
    );
  };
  
  const handleRouteCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (routeStart && routeEnd) {
      // In a real app, this would call a routing API
      setRouteCalculated(true);
    }
  };
  
  const toggleSaveRoute = () => {
    setIsSavedRoute(!isSavedRoute);
  };
  
  const availableLayers = [
    { id: 'recent-crimes', name: 'Recent Incidents (7 days)', color: 'bg-red-500' },
    { id: 'historical-crimes', name: 'Historical Crime Data', color: 'bg-orange-500' },
    { id: 'police-stations', name: 'Police Stations', color: 'bg-blue-500' },
    { id: 'street-lights', name: 'Street Lights', color: 'bg-yellow-500' },
    { id: 'safe-corridors', name: 'Safe Corridors', color: 'bg-green-500' },
    { id: 'emergency-phones', name: 'Emergency Phones', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'map' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('map')}
            >
              Safety Map
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'route' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('route')}
            >
              Safe Route Planner
            </button>
          </div>
          
          {/* Map Controls */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4">
              {activeTab === 'map' && (
                <>
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search for an address or place"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="relative">
                    <button
                      onClick={() => setLayersOpen(!layersOpen)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Layers size={18} className="mr-2" />
                      Map Layers
                    </button>
                    
                    {layersOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                        <div className="p-3 border-b border-gray-200">
                          <h3 className="text-sm font-medium text-gray-700">Toggle Map Layers</h3>
                        </div>
                        <div className="p-3 max-h-64 overflow-y-auto">
                          {availableLayers.map((layer) => (
                            <div key={layer.id} className="flex items-center py-1.5">
                              <input
                                type="checkbox"
                                id={`layer-${layer.id}`}
                                checked={selectedLayers.includes(layer.id)}
                                onChange={() => handleLayerToggle(layer.id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <div className={`ml-2 w-3 h-3 rounded-full ${layer.color}`}></div>
                              <label htmlFor={`layer-${layer.id}`} className="ml-2 block text-sm text-gray-700">
                                {layer.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {activeTab === 'route' && (
                <form onSubmit={handleRouteCalculate} className="w-full">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Starting point"
                        value={routeStart}
                        onChange={(e) => setRouteStart(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Navigation size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Destination"
                        value={routeEnd}
                        onChange={(e) => setRouteEnd(e.target.value)}
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Find Safe Route
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Map Display */}
          <div className="relative h-[70vh]">
            {!mapLoaded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-3 text-sm text-gray-600">Loading map data...</p>
                </div>
              </div>
            ) : (
              <div 
                className="w-full h-full bg-gray-200"
                style={{ 
                  backgroundImage: "url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* This would be replaced with an actual map integration like Google Maps or Mapbox */}
                {/* Simulated map content */}
                <div className="p-4">
                  <div className="bg-white bg-opacity-90 p-3 rounded-md shadow-sm inline-block">
                    <p className="text-sm text-gray-800">
                      <strong>Map Placeholder</strong>
                    </p>
                    <p className="text-xs text-gray-600">
                      In the actual implementation, this would be replaced with a real interactive map using Google Maps or a similar service.
                    </p>
                    
                    {activeTab === 'map' && (
                      <div className="mt-2 text-xs text-gray-700">
                        <p><strong>Active Layers:</strong></p>
                        <ul className="list-disc pl-4 mt-1">
                          {selectedLayers.map(layer => {
                            const layerInfo = availableLayers.find(l => l.id === layer);
                            return layerInfo ? (
                              <li key={layer} className="flex items-center">
                                <div className={`mr-1.5 w-2 h-2 rounded-full ${layerInfo.color}`}></div>
                                {layerInfo.name}
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                    
                    {activeTab === 'route' && routeCalculated && (
                      <div className="mt-2 text-xs">
                        <p className="text-green-700"><strong>Safe route calculated!</strong></p>
                        <p className="text-gray-700 mt-1">From: {routeStart}</p>
                        <p className="text-gray-700">To: {routeEnd}</p>
                        <div className="mt-2 flex justify-between">
                          <span className="text-gray-700">
                            <strong>Safety Score:</strong> <span className="text-green-600">85/100</span>
                          </span>
                          <button
                            onClick={toggleSaveRoute}
                            className={`flex items-center text-xs px-2 py-1 rounded ${
                              isSavedRoute 
                                ? 'bg-green-100 text-green-700 border border-green-200' 
                                : 'bg-blue-100 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {isSavedRoute ? (
                              <>
                                <Check size={14} className="mr-1" /> Saved
                              </>
                            ) : (
                              <>
                                <Bookmark size={14} className="mr-1" /> Save Route
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Simulated map markers for incidents */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                        <AlertTriangle size={14} />
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 p-2 text-xs">
                        <p className="font-medium text-gray-800">Reported Robbery</p>
                        <p className="text-gray-600 mt-1">Reported 2 days ago near Grand Concourse</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group">
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
                        <AlertTriangle size={14} />
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 p-2 text-xs">
                        <p className="font-medium text-gray-800">Suspicious Activity</p>
                        <p className="text-gray-600 mt-1">Reported 5 days ago on Fordham Road</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="relative group">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 3l18 18"></path>
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                          <path d="M12 7v1"></path>
                          <path d="M12 15v1"></path>
                          <path d="M7 12h1"></path>
                          <path d="M15 12h1"></path>
                        </svg>
                      </div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 p-2 text-xs">
                        <p className="font-medium text-gray-800">Police Station</p>
                        <p className="text-gray-600 mt-1">42nd Precinct</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-md shadow-md p-3 text-xs border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Legend</h4>
              <div className="space-y-1.5">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Recent Incidents (7 days)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Historical Crime Data</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Police Stations</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Safe Corridors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Street Lights</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Bronx Safety Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600">Incidents (Last 7 Days)</p>
                <p className="text-lg font-bold text-red-600">127</p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600">Reports Submitted</p>
                <p className="text-lg font-bold text-blue-600">89</p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600">Safe Routes Planned</p>
                <p className="text-lg font-bold text-green-600">215</p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                <p className="text-xs text-gray-600">Avg. Safety Score</p>
                <p className="text-lg font-bold text-purple-600">76/100</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Safety Tips */}
        {activeTab === 'route' && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Safety Tips for Walking in the Bronx</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-1">Stay Alert</h4>
                <p className="text-sm text-blue-700">
                  Be aware of your surroundings at all times. Avoid using headphones or devices that distract you.
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-1">Walk in Groups</h4>
                <p className="text-sm text-blue-700">
                  Whenever possible, walk with friends or family, especially after dark.
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-1">Stick to Well-Lit Areas</h4>
                <p className="text-sm text-blue-700">
                  Use main streets and well-lit pathways, especially at night.
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-1">Share Your Location</h4>
                <p className="text-sm text-blue-700">
                  Let someone know your route and expected arrival time.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetyMapPage;