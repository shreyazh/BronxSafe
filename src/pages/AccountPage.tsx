import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { MapPin, Bell, Lock, User, Mail, LogOut, Edit, CheckCircle, AlertTriangle } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, login, logout, signup, updateProfile } = useUser();
  
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  
  const [editMode, setEditMode] = useState(false);
  const [profileUpdates, setProfileUpdates] = useState({
    name: user?.name || '',
    neighborhood: user?.neighborhood || '',
    email: user?.email || '',
  });
  
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      if (authMode === 'login') {
        await login(email, password);
        setFormSuccess('Logged in successfully!');
      } else {
        await signup(email, password, name);
        setFormSuccess('Account created successfully!');
      }
    } catch (error) {
      setFormError('Authentication failed. Please check your credentials and try again.');
    }
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    try {
      if (user) {
        await updateProfile({
          ...user,
          name: profileUpdates.name,
          neighborhood: profileUpdates.neighborhood,
          email: profileUpdates.email,
        });
        setFormSuccess('Profile updated successfully!');
        setEditMode(false);
      }
    } catch (error) {
      setFormError('Failed to update profile. Please try again.');
    }
  };
  
  const handleLogout = () => {
    logout();
    setFormSuccess('Logged out successfully!');
  };
  
  const startEditMode = () => {
    if (user) {
      setProfileUpdates({
        name: user.name || '',
        neighborhood: user.neighborhood || '',
        email: user.email || '',
      });
      setEditMode(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isAuthenticated ? 'Your Account' : 'Sign In or Create Account'}
          </h1>
          
          {formSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-md flex items-start">
              <CheckCircle size={16} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-700">{formSuccess}</p>
            </div>
          )}
          
          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-start">
              <AlertTriangle size={16} className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{formError}</p>
            </div>
          )}
          
          {isAuthenticated && user ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Profile Information */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                  {!editMode && (
                    <button
                      onClick={startEditMode}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit Profile
                    </button>
                  )}
                </div>
                
                {editMode ? (
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="edit-name"
                          value={profileUpdates.name || ''}
                          onChange={(e) => setProfileUpdates({ ...profileUpdates, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="edit-email"
                          value={profileUpdates.email || ''}
                          onChange={(e) => setProfileUpdates({ ...profileUpdates, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label htmlFor="edit-neighborhood" className="block text-sm font-medium text-gray-700 mb-1">
                          Neighborhood
                        </label>
                        <select
                          id="edit-neighborhood"
                          value={profileUpdates.neighborhood || ''}
                          onChange={(e) => setProfileUpdates({ ...profileUpdates, neighborhood: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Neighborhood</option>
                          <option value="Fordham">Fordham</option>
                          <option value="South Bronx">South Bronx</option>
                          <option value="Tremont">Tremont</option>
                          <option value="Concourse">Concourse</option>
                          <option value="Mott Haven">Mott Haven</option>
                          <option value="Highbridge">Highbridge</option>
                          <option value="University Heights">University Heights</option>
                          <option value="Morris Heights">Morris Heights</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setEditMode(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User size={18} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium text-gray-800">{user.name || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail size={18} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-800">{user.email || 'Not provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin size={18} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Neighborhood</p>
                        <p className="font-medium text-gray-800">{user.neighborhood || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Alert Preferences Summary */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Alert Preferences</h2>
                  <a 
                    href="/alerts" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Manage Alerts
                  </a>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Bell size={18} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Notification Methods</p>
                      <div className="flex space-x-3 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          user.alertPreferences.email 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          Email {user.alertPreferences.email ? 'On' : 'Off'}
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          user.alertPreferences.push 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          Push {user.alertPreferences.push ? 'On' : 'Off'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={18} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Alert Radius</p>
                      <p className="font-medium text-gray-800">{user.alertPreferences.radius} miles</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Bell size={18} className="text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Alert Categories</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {user.alertPreferences.categories.map((category) => (
                          <span 
                            key={category} 
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Account Actions */}
              <div className="border-t border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h2>
                
                <div className="space-y-3">
                  <a 
                    href="/map" 
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <MapPin size={18} className="mr-2" />
                    View Saved Safe Routes
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <Lock size={18} className="mr-2" />
                    Change Password
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-4">
                <div className="flex space-x-4 border-b">
                  <button
                    className={`py-2 px-1 -mb-px text-sm font-medium ${
                      authMode === 'login'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setAuthMode('login')}
                  >
                    Sign In
                  </button>
                  <button
                    className={`py-2 px-1 -mb-px text-sm font-medium ${
                      authMode === 'signup'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setAuthMode('signup')}
                  >
                    Create Account
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required={authMode === 'signup'}
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                </div>
                
                {authMode === 'login' && (
                  <div className="text-center">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                      Forgot your password?
                    </a>
                  </div>
                )}
              </form>
              
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Why create an account?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Receive customized safety alerts for your neighborhood</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Save and share safe routes with family and friends</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Participate in community discussions about safety</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Track and manage your incident reports</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Privacy Notice */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Privacy & Security</h3>
            <p className="text-sm text-blue-700">
              We take your privacy seriously. Your personal information is encrypted and never shared 
              with third parties. You can control what information is visible to other community members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;