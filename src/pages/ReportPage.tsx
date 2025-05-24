import React, { useState } from 'react';
import { AlertTriangle, MapPin, Camera, Calendar, Clock, CheckCircle, Info } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const ReportPage: React.FC = () => {
  const { isAuthenticated, user } = useUser();
  const [step, setStep] = useState(1);
  const [reportType, setReportType] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
    isAnonymous: !isAuthenticated,
    severity: 'medium',
    photos: [] as File[],
    contactInfo: isAuthenticated && user ? user.email || '' : '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...filesArray] }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after submission if needed
      // setFormData({ ... });
    }, 1500);
  };

  const handleReportTypeSelect = (type: string) => {
    setReportType(type);
    setStep(2);
  };

  const reportTypes = [
    { id: 'suspicious-activity', name: 'Suspicious Activity', icon: <AlertTriangle size={24} /> },
    { id: 'assault', name: 'Assault', icon: <AlertTriangle size={24} /> },
    { id: 'robbery', name: 'Robbery', icon: <AlertTriangle size={24} /> },
    { id: 'vandalism', name: 'Vandalism', icon: <AlertTriangle size={24} /> },
    { id: 'drug-activity', name: 'Drug Activity', icon: <AlertTriangle size={24} /> },
    { id: 'traffic-incident', name: 'Traffic Incident', icon: <AlertTriangle size={24} /> },
    { id: 'public-disturbance', name: 'Public Disturbance', icon: <AlertTriangle size={24} /> },
    { id: 'other', name: 'Other Concerns', icon: <Info size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Report an Incident</h1>
            
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Report Submitted Successfully</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for helping keep our community safe. Your report has been submitted and will be reviewed by our team.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                      setReportType('');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Another Report
                  </button>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Return Home
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        1
                      </div>
                      <span className="text-xs mt-1">Type</span>
                    </div>
                    <div className="flex-1 h-1 mx-2 bg-gray-200">
                      <div className={`h-1 bg-blue-600 ${step >= 2 ? 'w-full' : 'w-0'} transition-all duration-300`}></div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        2
                      </div>
                      <span className="text-xs mt-1">Details</span>
                    </div>
                  </div>
                </div>
                
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">What type of incident would you like to report?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {reportTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => handleReportTypeSelect(type.id)}
                          className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                        >
                          <div className="text-blue-600 mb-2">{type.icon}</div>
                          <span className="text-sm text-center font-medium text-gray-800">{type.name}</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Info size={20} className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">Important Information</h3>
                          <div className="mt-2 text-sm text-blue-700">
                            <p>
                              For emergencies requiring immediate police, fire, or medical response, please call 911 directly.
                              This reporting tool is for non-emergency situations only.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title/Subject *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief description of the incident"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Please provide as much detail as possible about what you observed"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Street address or intersection"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
                          Severity
                        </label>
                        <select
                          id="severity"
                          name="severity"
                          value={formData.severity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="low">Low - Minor concern</option>
                          <option value="medium">Medium - Moderate concern</option>
                          <option value="high">High - Serious concern</option>
                          <option value="critical">Critical - Urgent attention needed</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock size={18} className="text-gray-500" />
                          </div>
                          <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Photos (Optional)
                      </label>
                      <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Camera size={24} className="mx-auto text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="photos" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload photos</span>
                              <input
                                id="photos"
                                name="photos"
                                type="file"
                                className="sr-only"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      
                      {formData.photos.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          {formData.photos.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Uploaded photo ${index + 1}`}
                                className="h-24 w-full object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="isAnonymous"
                          name="isAnonymous"
                          type="checkbox"
                          checked={formData.isAnonymous}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="isAnonymous" className="font-medium text-gray-700">
                          Report Anonymously
                        </label>
                        <p className="text-gray-500">
                          Your identity will be kept private and not shared with the public.
                        </p>
                      </div>
                    </div>
                    
                    {!formData.isAnonymous && (
                      <div>
                        <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Information (Optional)
                        </label>
                        <input
                          type="email"
                          id="contactInfo"
                          name="contactInfo"
                          value={formData.contactInfo}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Email address for follow-up if needed"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Providing contact information allows authorities to reach out if they need additional details.
                        </p>
                      </div>
                    )}
                    
                    <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle size={20} className="text-yellow-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Important Reminder</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              Filing a false report is a serious offense and may result in legal consequences.
                              Please ensure all information provided is accurate to the best of your knowledge.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors
                          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Report'}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;