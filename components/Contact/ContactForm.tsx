import React, { useRef } from 'react';
import { 
  CheckCircle, Loader2, AlertCircle, User, 
  AtSign, Info, MessageSquare, Send, Clock, Check 
} from 'lucide-react';
import { useContactForm } from './hooks/useContactForm';

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { 
    formState, 
    formStatus, 
    formErrors, 
    focusedField,
    handleChange, 
    handleFocus, 
    handleBlur, 
    handleSubmit 
  } = useContactForm(formRef);

  // Get icon for form field
  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case 'name': return <User className="w-5 h-5" />;
      case 'email': return <AtSign className="w-5 h-5" />;
      case 'subject': return <Info className="w-5 h-5" />;
      case 'message': return <MessageSquare className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="md:col-span-7 lg:col-span-8 p-8 lg:p-12" ref={formRef}>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Send Me a Message</h3>
      <p className="text-gray-600 mb-8">Feel free to reach out with any questions or project inquiries. I&apos;d love to hear from you!</p>
      
      {formStatus === 'success' ? (
        <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-bounce">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Message Sent Successfully!</h4>
            <p className="text-gray-600 mb-6">Thank you for reaching out. I&apos;ll get back to you as soon as possible!</p>
            <div className="flex space-x-4 items-center justify-center">
              <div className="flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-gray-600">Delivered to inbox</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-sm text-gray-600">Expected response: 24hrs</span>
              </div>
            </div>
          </div>
        </div>
      ) : formStatus === 'error' ? (
        <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6 animate-bounce">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Message Sending Failed</h4>
            <p className="text-gray-600 mb-6">There was an error sending your message. Please try again later or contact directly via email.</p>
            <a 
              href="mailto:hello@baharihari.com" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Email Directly
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="relative">
              <label 
                className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                  focusedField === 'name' ? 'text-blue-600' : formErrors.name ? 'text-red-600' : 'text-gray-700'
                }`} 
                htmlFor="name"
              >
                Your Name *
              </label>
              <div className="relative">
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  focusedField === 'name' ? 'text-blue-600' : formErrors.name ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {getFieldIcon('name')}
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  className={`pl-10 w-full px-4 py-3 rounded-lg border text-gray-800 bg-gray-50 transition-all duration-300 ${
                    focusedField === 'name'
                      ? 'border-blue-600 shadow-sm shadow-blue-100 bg-white'
                      : formErrors.name
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  } focus:outline-none focus:bg-white`}
                  required
                />
                {formErrors.name && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>
            
            {/* Email Input */}
            <div className="relative">
              <label 
                className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                  focusedField === 'email' ? 'text-blue-600' : formErrors.email ? 'text-red-600' : 'text-gray-700'
                }`}
                htmlFor="email"
              >
                Email Address *
              </label>
              <div className="relative">
                <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  focusedField === 'email' ? 'text-blue-600' : formErrors.email ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {getFieldIcon('email')}
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  placeholder="john@example.com"
                  className={`pl-10 w-full px-4 py-3 rounded-lg border text-gray-800 bg-gray-50 transition-all duration-300 ${
                    focusedField === 'email'
                      ? 'border-blue-600 shadow-sm shadow-blue-100 bg-white'
                      : formErrors.email
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-300'
                  } focus:outline-none focus:bg-white`}
                  required
                />
                {formErrors.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>
          </div>
          
          {/* Subject Input */}
          <div className="relative">
            <label 
              className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                focusedField === 'subject' ? 'text-blue-600' : 'text-gray-700'
              }`}
              htmlFor="subject"
            >
              Subject
            </label>
            <div className="relative">
              <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                focusedField === 'subject' ? 'text-blue-600' : 'text-gray-400'
              }`}>
                {getFieldIcon('subject')}
              </div>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formState.subject}
                onChange={handleChange}
                onFocus={() => handleFocus('subject')}
                onBlur={handleBlur}
                placeholder="What&apos;s this about?"
                className={`pl-10 w-full px-4 py-3 rounded-lg border text-gray-800 bg-gray-50 transition-all duration-300 ${
                  focusedField === 'subject'
                    ? 'border-blue-600 shadow-sm shadow-blue-100 bg-white'
                    : 'border-gray-300'
                } focus:outline-none focus:bg-white`}
              />
            </div>
          </div>
          
          {/* Message Input */}
          <div className="relative">
            <label 
              className={`block text-sm font-medium mb-2 transition-all duration-300 ${
                focusedField === 'message' ? 'text-blue-600' : formErrors.message ? 'text-red-600' : 'text-gray-700'
              }`}
              htmlFor="message"
            >
              Your Message *
            </label>
            <div className="relative">
              <div className={`absolute left-3 top-4 ${
                focusedField === 'message' ? 'text-blue-600' : formErrors.message ? 'text-red-600' : 'text-gray-400'
              }`}>
                {getFieldIcon('message')}
              </div>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                placeholder="Tell me about your project or inquiry..."
                rows={5}
                className={`pl-10 w-full px-4 py-3 rounded-lg border text-gray-800 bg-gray-50 transition-all duration-300 ${
                  focusedField === 'message'
                    ? 'border-blue-600 shadow-sm shadow-blue-100 bg-white'
                    : formErrors.message
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300'
                } focus:outline-none focus:bg-white`}
                required
              ></textarea>
              {formErrors.message && (
                <div className="absolute right-3 top-4 text-red-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
              )}
            </div>
            {formErrors.message && (
              <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
            )}
          </div>
          
          {/* Form footer with privacy note and submit button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pt-2">
            <p className="text-sm text-gray-500">
              * Required fields
            </p>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'submitting'}
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg relative overflow-hidden group"
            >
              {formStatus === 'submitting' ? (
                <span className="flex items-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </span>
              ) : (
                <>
                  <span className="relative z-10 flex items-center">
                    Send Message
                    <Send className="ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 w-0 bg-blue-700 transition-all duration-300 group-hover:w-full"></span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;