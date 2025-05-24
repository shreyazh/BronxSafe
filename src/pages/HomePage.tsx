import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, MapPin, Shield, FileText, Bell, Users } from 'lucide-react';
import { useAlert } from '../contexts/AlertContext';
import { useUser } from '../contexts/UserContext';

const HomePage: React.FC = () => {
  const { activeAlerts } = useAlert();
  const { isAuthenticated, user } = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Making the Bronx Safer, Together
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Report incidents, receive real-time alerts, and navigate safely through your neighborhood.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/report"
                className="inline-block bg-red-600 hover:bg-red-700 transition-colors text-white font-medium rounded-md px-6 py-3 text-center"
              >
                Report an Incident
              </Link>
              <Link
                to="/map"
                className="inline-block bg-white hover:bg-gray-100 transition-colors text-blue-900 font-medium rounded-md px-6 py-3 text-center"
              >
                View Safety Map
              </Link>
            </div>
          </div>
        </div>
        {/* Wave pattern divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-12 flex-grow">
        <div className="container mx-auto px-4">
          {/* Welcome/Personalized Section */}
          {isAuthenticated && user && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome back, {user.name || 'Community Member'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Your Neighborhood</h3>
                  <p>{user.neighborhood || 'Set your neighborhood in account settings'}</p>
                </div>
                <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Alert Radius</h3>
                  <p>{user.alertPreferences.radius} mile{user.alertPreferences.radius !== 1 ? 's' : ''}</p>
                </div>
                <div className="bg-blue-50 rounded-md p-4 border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Alert Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.alertPreferences.categories.map((category) => (
                      <span key={category} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Alerts */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Recent Alerts</h2>
              <Link
                to="/alerts"
                className="text-blue-700 hover:text-blue-800 transition-colors font-medium text-sm"
              >
                View All Alerts
              </Link>
            </div>
            {activeAlerts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                    <div className={`
                      ${alert.severity === 'critical' ? 'bg-red-600' : 
                      alert.severity === 'high' ? 'bg-orange-600' : 
                      alert.severity === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'} 
                      py-2 px-4`}
                    >
                      <div className="flex items-center">
                        <AlertTriangle size={18} className="text-white mr-2" />
                        <h3 className="font-medium text-white">{alert.title}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 mb-3">{alert.message}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{alert.location || 'Unknown location'}</span>
                        <span>
                          {new Date(alert.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
                <p className="text-gray-600">No active alerts at this time.</p>
              </div>
            )}
          </div>

          {/* Features Section */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Community Safety Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-red-600 mb-4">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Anonymous Reporting</h3>
              <p className="text-gray-600 mb-4">
                Report suspicious activities or safety concerns without revealing your identity.
              </p>
              <Link
                to="/report"
                className="text-red-600 hover:text-red-700 transition-colors font-medium text-sm inline-flex items-center"
              >
                Report Now <span className="ml-1">→</span>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety Map</h3>
              <p className="text-gray-600 mb-4">
                View crime-prone zones and plan safe routes through your neighborhood.
              </p>
              <Link
                to="/map"
                className="text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm inline-flex items-center"
              >
                Explore Map <span className="ml-1">→</span>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-orange-600 mb-4">
                <Bell size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Alerts</h3>
              <p className="text-gray-600 mb-4">
                Receive notifications about safety incidents in your neighborhood as they happen.
              </p>
              <Link
                to="/alerts"
                className="text-orange-600 hover:text-orange-700 transition-colors font-medium text-sm inline-flex items-center"
              >
                Manage Alerts <span className="ml-1">→</span>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-green-600 mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety Resources</h3>
              <p className="text-gray-600 mb-4">
                Access safety tips, emergency contacts, and community resources.
              </p>
              <Link
                to="/resources"
                className="text-green-600 hover:text-green-700 transition-colors font-medium text-sm inline-flex items-center"
              >
                View Resources <span className="ml-1">→</span>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-purple-600 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Forum</h3>
              <p className="text-gray-600 mb-4">
                Connect with neighbors and discuss safety concerns and strategies.
              </p>
              <Link
                to="/community"
                className="text-purple-600 hover:text-purple-700 transition-colors font-medium text-sm inline-flex items-center"
              >
                Join Discussion <span className="ml-1">→</span>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Data Transparency</h3>
              <p className="text-gray-600 mb-4">
                Access up-to-date crime statistics and safety data for informed decision-making.
              </p>
              <Link
                to="/resources"
                className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium text-sm inline-flex items-center"
              >
                View Data <span className="ml-1">→</span>
              </Link>
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Community Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">5,280+</p>
                <p className="text-gray-600">Community Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">1,750+</p>
                <p className="text-gray-600">Reports Submitted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">430+</p>
                <p className="text-gray-600">Safety Routes Created</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">12</p>
                <p className="text-gray-600">Neighborhoods Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community Safety Network</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Sign up today to receive alerts, report incidents, and help make the Bronx a safer place for everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/account"
              className="bg-white hover:bg-gray-100 transition-colors text-blue-800 font-medium rounded-md px-6 py-3"
            >
              Create Account
            </Link>
            <Link
              to="/resources"
              className="bg-transparent hover:bg-blue-700 transition-colors border border-white text-white font-medium rounded-md px-6 py-3"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;