'use client';
import { useState, useEffect } from 'react';

type AvailabilityStatus = 'available' | 'limited' | 'away' | 'unknown';

interface Availability {
  status: AvailabilityStatus;
  text: string;
}

export const useTimeAndAvailability = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  // Set mounted state to handle client-side only features
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate local time in Indonesia
  const getLocalTime = (): string | null => {
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
  const getAvailabilityStatus = (): Availability => {
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

  return {
    getLocalTime,
    availability
  };
}