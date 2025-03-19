import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/app/config/emailJs';

/**
 * Hook untuk menginisialisasi EmailJS
 * Panggil hook ini di komponen root aplikasi Anda (seperti _app.tsx)
 */
export const useEmailJsInit = () => {
  useEffect(() => {
    // Inisialisasi EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);
};