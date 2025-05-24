import React, { useState } from 'react';
import { Phone, Link as LinkIcon, Shield, AlertTriangle, User, FileText, MapPin, ExternalLink } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('emergency');

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', description: 'For immediate police, fire, or medical emergencies' },
    { name: 'Non-Emergency City Services', number: '311', description: 'Report non-emergency issues, get information on city services' },
    { name: 'NYPD 40th Precinct', number: '(718) 402-2270', description: 'South Bronx - Mott Haven, Melrose' },
    { name: 'NYPD 41st Precinct', number: '(718) 542-4771', description: 'Hunts Point, Longwood' },
    { name: 'NYPD 42nd Precinct', number: '(718) 402-3887', description: 'Morrisania, Crotona Park East' },
    { name: 'NYPD 44th Precinct', number: '(718) 590-5511', description: 'Highbridge, Concourse, Mt. Eden' },
    { name: 'NYPD 46th Precinct', number: '(718) 220-5211', description: 'University Heights, Morris Heights, Mt. Hope' },
    { name: 'NYPD 48th Precinct', number: '(718) 299-3900', description: 'Belmont, East Tremont, West Farms' },
    { name: 'NYPD 52nd Precinct', number: '(718) 220-5811', description: 'Bedford Park, Fordham, Norwood, University Heights' },
    { name: 'Domestic Violence Hotline', number: '(800) 621-HOPE (4673)', description: '24/7 confidential assistance for domestic violence victims' },
    { name: 'NYC Well Mental Health Hotline', number: '1-888-NYC-WELL (692-9355)', description: 'Free, confidential mental health support' },
  ];

  const communityResources = [
    { 
      name: 'Bronx Neighborhood Safety Coalition',
      description: 'Community organization focused on neighborhood safety initiatives and crime prevention.',
      website: 'https://example.org/bnsc',
      contact: '(718) 555-1234'
    },
    { 
      name: 'South Bronx Community Coalition',
      description: 'Organizing community watches and safety education programs in the South Bronx.',
      website: 'https://example.org/sbcc',
      contact: '(718) 555-2345'
    },
    { 
      name: 'Bronx Legal Aid Society',
      description: 'Free legal assistance for low-income Bronx residents dealing with crime-related issues.',
      website: 'https://example.org/blas',
      contact: '(718) 555-3456'
    },
    { 
      name: 'Youth Safety Network',
      description: 'Programs to keep youth safe and engaged in positive activities.',
      website: 'https://example.org/ysn',
      contact: '(718) 555-4567'
    },
    { 
      name: 'Fordham Community Center',
      description: 'Safe space offering programs and resources for Fordham residents.',
      website: 'https://example.org/fcc',
      contact: '(718) 555-5678'
    },
    { 
      name: 'Bronx Housing Resources',
      description: 'Help with housing safety issues and tenant rights.',
      website: 'https://example.org/bhr',
      contact: '(718) 555-6789'
    },
  ];

  const safetyTips = [
    {
      category: 'Street Safety',
      tips: [
        'Stay alert and aware of your surroundings at all times',
        'Avoid displaying valuable items like phones, jewelry, or cash in public',
        'Try to travel in groups when possible, especially after dark',
        'Use well-lit, busy streets and avoid shortcuts through parks or alleys at night',
        'Keep your wallet in a front pocket and bags/purses close to your body',
        'Trust your instincts - if a situation feels unsafe, leave immediately',
      ]
    },
    {
      category: 'Public Transportation',
      tips: [
        'Wait for buses and trains in well-lit areas with other people when possible',
        'Sit near the driver or conductor on buses and trains',
        'Stay awake and alert while using public transportation',
        'Have your MetroCard or fare ready before entering the station',
        'Be cautious about which subway car you enter late at night',
        'Consider using ride-sharing services for late-night travel',
      ]
    },
    {
      category: 'Home Safety',
      tips: [
        'Install good quality locks on all doors and windows',
        'Use a doorbell camera or peephole before opening your door to visitors',
        'Never buzz in someone you don\'t know to your building',
        'Keep emergency numbers easily accessible',
        'Get to know your neighbors and look out for each other',
        'Report suspicious activity around your building',
      ]
    },
    {
      category: 'Digital Safety',
      tips: [
        'Be careful about sharing your location on social media',
        'Don\'t announce when you\'ll be away from home on public platforms',
        'Be cautious about meeting people in person that you\'ve only met online',
        'Use secure passwords and two-factor authentication for accounts',
        'Be aware of scams targeting Bronx residents',
        'Report online threats or harassment to authorities',
      ]
    },
  ];

  const dataResources = [
    {
      name: 'NYC Crime Map',
      description: 'Interactive map showing recent crime data across NYC neighborhoods.',
      url: 'https://maps.nyc.gov/crime/',
      type: 'map'
    },
    {
      name: 'NYPD CompStat',
      description: 'Weekly, monthly, and yearly crime statistics for each precinct.',
      url: 'https://www1.nyc.gov/site/nypd/stats/crime-statistics/compstat.page',
      type: 'report'
    },
    {
      name: 'NYC Open Data - NYPD Complaints',
      description: 'Detailed dataset of crime complaints filed with the NYPD.',
      url: 'https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Current-Year-To-Date-/5uac-w243',
      type: 'dataset'
    },
    {
      name: 'NYC 311 Service Requests',
      description: 'Data on non-emergency service requests, including quality of life issues.',
      url: 'https://data.cityofnewyork.us/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9',
      type: 'dataset'
    },
    {
      name: 'Bronx Community District Profiles',
      description: 'Detailed information about each Bronx community district, including safety data.',
      url: 'https://communityprofiles.planning.nyc.gov/bronx',
      type: 'profile'
    },
    {
      name: 'Vision Zero View',
      description: 'Map and data tool focused on traffic safety and crash data.',
      url: 'https://vzv.nyc/',
      type: 'map'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Safety Resources</h1>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto space-x-1 mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              activeTab === 'emergency'
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            Emergency Contacts
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              activeTab === 'community'
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            Community Resources
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              activeTab === 'safety'
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            Safety Tips
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
              activeTab === 'data'
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            }`}
          >
            Data & Reports
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Emergency Contacts */}
          {activeTab === 'emergency' && (
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Phone size={20} className="text-red-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Emergency & Non-Emergency Contacts</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Important phone numbers for emergency services, local precincts, and community resources. 
                Save these numbers in your phone for quick access when needed.
              </p>
              
              <div className="grid gap-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h3 className="font-medium text-gray-800">{contact.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{contact.description}</p>
                    <a 
                      href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                    >
                      <Phone size={16} className="mr-1" />
                      {contact.number}
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
                <div className="flex">
                  <AlertTriangle size={20} className="text-blue-600 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Remember</h3>
                    <p className="text-sm text-blue-700">
                      Always call 911 in emergency situations that require immediate police, 
                      fire department, or ambulance assistance. Use 311 for non-emergency city services 
                      and information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Community Resources */}
          {activeTab === 'community' && (
            <div className="p-6">
              <div className="flex items-center mb-4">
                <User size={20} className="text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Community Safety Resources</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Local organizations that provide safety resources, support services, and 
                community initiatives to improve neighborhood safety in the Bronx.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communityResources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h3 className="font-medium text-gray-800 mb-2">{resource.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    <div className="flex flex-col space-y-2">
                      <a 
                        href={resource.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <LinkIcon size={14} className="mr-1" />
                        Website
                        <ExternalLink size={12} className="ml-1" />
                      </a>
                      <a 
                        href={`tel:${resource.contact.replace(/[^0-9]/g, '')}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <Phone size={14} className="mr-1" />
                        {resource.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Get Involved</h3>
                <p className="text-blue-700 text-sm">
                  Looking to make a difference in your community? Consider volunteering with one 
                  of these organizations or attending your local community board meetings to get 
                  involved in neighborhood safety initiatives.
                </p>
              </div>
            </div>
          )}

          {/* Safety Tips */}
          {activeTab === 'safety' && (
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Shield size={20} className="text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Safety Tips for Bronx Residents</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Practical advice to help you stay safe in your neighborhood, at home, and while 
                traveling throughout the Bronx. Following these tips can help reduce your risk 
                and increase your personal safety.
              </p>
              
              <div className="space-y-6">
                {safetyTips.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3">{category.category}</h3>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <span className="text-green-500 mr-2 mt-1">•</span>
                          <span className="text-gray-600 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-md">
                <div className="flex">
                  <AlertTriangle size={20} className="text-green-600 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Safety First</h3>
                    <p className="text-sm text-green-700">
                      Remember that your safety is the priority. If you feel unsafe or 
                      threatened, trust your instincts and seek help immediately. No 
                      possession is worth risking your personal safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data & Reports */}
          {activeTab === 'data' && (
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FileText size={20} className="text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Crime Data & Safety Reports</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Access official crime statistics, reports, and data resources to stay informed 
                about safety trends in the Bronx and throughout New York City.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataResources.map((resource, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800">{resource.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        resource.type === 'map' ? 'bg-blue-100 text-blue-800' :
                        resource.type === 'report' ? 'bg-green-100 text-green-800' :
                        resource.type === 'dataset' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm my-2">{resource.description}</p>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-purple-600 hover:text-purple-800 text-sm"
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Access Resource
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <h3 className="font-medium text-purple-800 mb-2">Understanding Crime Data</h3>
                  <p className="text-purple-700 text-sm">
                    Crime statistics can help identify trends and hotspots, but remember 
                    that data collection methods and reporting practices may vary.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <h3 className="font-medium text-purple-800 mb-2">Making Informed Decisions</h3>
                  <p className="text-purple-700 text-sm">
                    Use data resources to make informed decisions about your daily routines, 
                    travel routes, and safety precautions.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <h3 className="font-medium text-purple-800 mb-2">Community Advocacy</h3>
                  <p className="text-purple-700 text-sm">
                    Data can be a powerful tool for community advocacy. Use these resources 
                    to support calls for improved safety measures in your neighborhood.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Report Safety Concern CTA */}
        <div className="mt-8 bg-blue-800 rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="p-6 md:w-2/3">
              <h2 className="text-xl font-bold text-white mb-2">See Something? Say Something.</h2>
              <p className="text-blue-100 mb-4">
                Your reports help make the Bronx safer for everyone. Submit anonymous tips or report 
                non-emergency safety concerns through our community safety portal.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="/report" 
                  className="inline-block bg-white hover:bg-gray-100 transition-colors text-blue-800 font-medium rounded-md px-4 py-2"
                >
                  Report a Concern
                </a>
                <a 
                  href="/map" 
                  className="inline-block bg-transparent hover:bg-blue-700 transition-colors border border-white text-white font-medium rounded-md px-4 py-2"
                >
                  View Safety Map
                </a>
              </div>
            </div>
            <div className="md:w-1/3 bg-blue-900 flex items-center justify-center p-6">
              <div className="text-white text-center">
                <AlertTriangle size={48} className="mx-auto mb-2" />
                <p className="font-medium">For emergencies, always call</p>
                <p className="text-2xl font-bold">911</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;