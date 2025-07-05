import { useState, RefObject } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/app/config/emailJs';
import { trackPortfolioEvents } from '@/components/analytics/GoogleAnalytics';

// Define types for our form state and handlers
interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  [key: string]: string;
}

export const useContactForm = (formRef: RefObject<HTMLDivElement | null>) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('submitting');
    
    try {
      // Menyiapkan template parameters untuk EmailJS
      const templateParams = {
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject || "Website Contact Form",
        message: formState.message
      };

      // Mengirim email menggunakan EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      
      // Track successful form submission
      trackPortfolioEvents.contactFormSubmit();
      
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
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Track form submission error
      trackPortfolioEvents.contactFormError(error instanceof Error ? error.message : 'Unknown error');
      
      setFormStatus('error');
      // Return to idle state after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  // Handle focus and blur events for animation effects
  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return {
    formState,
    formStatus,
    formErrors,
    focusedField,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit
  };
};