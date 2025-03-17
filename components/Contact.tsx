import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Phone, CheckCircle, Loader2, Github, Linkedin, 
  Instagram, Twitter, Calendar, MapPin, Clock, AlertCircle, Info,
  Send, User, AtSign, MessageSquare, HelpCircle, ChevronDown,
  ChevronUp, ExternalLink, Check
} from 'lucide-react';

export const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state to handle client-side only features
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormState({
      ...formState,
      [name]: value
    });
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formState.message.trim()) {
      errors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message is too short (min 10 characters)';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      // Scroll to top of form for confirmation message
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
      setFormStatus('success');
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setFormState({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }, 1500);
  };

  // Handle focus and blur events for animation effects
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFocusedField(null);
    
    // Validate field on blur
    if (name === 'name' && !value.trim()) {
      setFormErrors({ ...formErrors, name: 'Name is required' });
    } else if (name === 'email') {
      if (!value.trim()) {
        setFormErrors({ ...formErrors, email: 'Email is required' });
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        setFormErrors({ ...formErrors, email: 'Email is invalid' });
      }
    } else if (name === 'message' && value.trim().length < 10) {
      setFormErrors({ ...formErrors, message: 'Message is too short (min 10 characters)' });
    }
  };
  
  // Toggle FAQ item
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };
  
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
  
  // FAQ data
  const faqs = [
    {
      question: "What kind of projects do you take on?",
      answer: "I specialize in web development, including frontend interfaces, full-stack applications, e-commerce solutions, and interactive web experiences. I'm particularly interested in projects that require creative problem-solving and technical excellence."
    },
    {
      question: "What is your typical response time?",
      answer: "I typically respond to all inquiries within 24 hours during business days. For urgent matters, please indicate this in your message and I'll prioritize your request."
    },
    {
      question: "Do you work with clients internationally?",
      answer: "Yes! I work with clients from around the world. With modern collaboration tools, time zones are rarely an issue. I'm flexible with scheduling calls and meetings to accommodate different time zones."
    },
    {
      question: "What information should I include in my message?",
      answer: "For the most productive first conversation, please include: project type, intended timeline, key goals/features, and any relevant background. The more context you provide, the more tailored my response can be."
    }
  ];
  
  // Calculate local time in Indonesia
  const getLocalTime = () => {
    if (!isMounted) return null;
    
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Jakarta'
    };
    
    return new Date().toLocaleTimeString('en-US', options);
  };
  
  // Availability status based on current time
  const getAvailabilityStatus = () => {
    if (!isMounted) return { status: 'unknown', text: '' };
    
    const now = new Date();
    const hours = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })).getHours();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    
    // Weekend
    if (day === 0 || day === 6) {
      return { 
        status: 'away',
        text: 'Weekend - Might be slower to respond' 
      };
    }
    
    // Weekday working hours (9 AM - 6 PM)
    if (hours >= 9 && hours < 18) {
      return { 
        status: 'available',
        text: 'Working Hours - Quick Response Expected' 
      };
    }
    
    // After hours
    return { 
      status: 'limited',
      text: 'After Hours - Will respond when available' 
    };
  };
  
  const availability = getAvailabilityStatus();

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-r from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
        
        {/* Code patterns */}
        <div className="absolute top-10 left-10 text-blue-100 opacity-10 text-9xl font-mono">&lt;/&gt;</div>
        <div className="absolute bottom-10 right-10 text-indigo-100 opacity-10 text-9xl font-mono">{`{ }`}</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-fit mx-auto px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">Let&apos;s Connect</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 inline-block text-transparent bg-clip-text">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-lg">
            Have a project in mind or want to explore possibilities? I&apos;m here to help bring your ideas to life.
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          {/* Main contact card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Contact Information - Left side */}
              <div className="md:col-span-5 lg:col-span-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 lg:p-12 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-20 translate-y-20"></div>
                
                <h3 className="text-2xl font-bold mb-8 relative">Contact Information</h3>
                
                <div className="space-y-8 relative z-10">
                  {/* Email Contact */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 shrink-0">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm text-blue-100 mb-1">Email Me</h4>
                      <a 
                        href="mailto:hello@baharihari.com" 
                        className="text-lg font-medium text-white hover:underline transition-all group flex items-center"
                      >
                        hello@baharihari.com
                        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Phone Contact */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 shrink-0">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm text-blue-100 mb-1">Call Me</h4>
                      <a 
                        href="tel:6283184512580" 
                        className="text-lg font-medium text-white hover:underline transition-all group flex items-center"
                      >
                        +62 (831) 8451 2580
                        <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                  
                  {/* Location info */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 shrink-0">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm text-blue-100 mb-1">Location</h4>
                      <p className="text-lg font-medium text-white">
                        Jakarta, Indonesia
                      </p>
                    </div>
                  </div>
                  
                  {/* Availability */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4 shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm text-blue-100 mb-1">Local Time</h4>
                      <div className="flex flex-col">
                        <p className="text-lg font-medium text-white">
                          {getLocalTime() || 'WIB (GMT+7)'}
                        </p>
                        <div className="flex items-center mt-1">
                          <span className={`w-2.5 h-2.5 rounded-full mr-2 ${
                            availability.status === 'available' ? 'bg-green-400 animate-pulse' : 
                            availability.status === 'limited' ? 'bg-yellow-400' : 
                            'bg-gray-400'
                          }`}></span>
                          <span className="text-sm text-blue-100">{availability.text}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Social connect */}
                <div className="mt-12 pt-8 border-t border-white border-opacity-20">
                  <h4 className="text-white text-sm mb-4">Connect with me</h4>
                  <div className="flex space-x-3">
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-110 hover:shadow-lg"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-110 hover:shadow-lg"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-110 hover:shadow-lg"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-110 hover:shadow-lg"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                {/* Response time commitment */}
                <div className="mt-12 p-4 bg-white bg-opacity-10 rounded-lg">
                  <div className="flex items-center text-white mb-2">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <h4 className="font-medium text-blue-600">Response Time</h4>
                  </div>
                  <p className="text-sm text-blue-600">
                    I typically respond to all inquiries within 24 hours on business days.
                  </p>
                </div>
              </div>
              
              {/* Form - Right side */}
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
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions about working with me
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-800 flex items-center">
                      <HelpCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                      {faq.question}
                    </span>
                    <span className="text-gray-500 ml-4">
                      {activeFaq === index ? 
                        <ChevronUp className="w-5 h-5" /> : 
                        <ChevronDown className="w-5 h-5" />
                      }
                    </span>
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      activeFaq === index ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* More ways to connect */}
          <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to start a conversation?</h3>
                <p className="text-gray-600">Choose the way that works best for you</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:hello@baharihari.com"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md flex items-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Me
                </a>
                
                <a
                  href="https://wa.me/6283184512580"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow-md flex items-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
                
                <a
                  href="https://calendly.com" // Replace with your actual Calendly link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md flex items-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};