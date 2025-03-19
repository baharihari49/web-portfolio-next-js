import React from 'react';

interface TimelineDotsProps {
  isMounted: boolean;
}

// Fixed dot positions (pre-calculated to avoid hydration mismatch)
const timelineDots = [
  { top: '5%', left: '0px', delay: '0s' },
  { top: '10%', left: '2px', delay: '0.1s' },
  { top: '15%', left: '3px', delay: '0.2s' },
  { top: '20%', left: '2px', delay: '0.3s' },
  { top: '25%', left: '0px', delay: '0.4s' },
  { top: '30%', left: '-2px', delay: '0.5s' },
  { top: '35%', left: '-3px', delay: '0.6s' },
  { top: '40%', left: '-2px', delay: '0.7s' },
  { top: '45%', left: '0px', delay: '0.8s' },
  { top: '50%', left: '2px', delay: '0.9s' },
  { top: '55%', left: '3px', delay: '1.0s' },
  { top: '60%', left: '2px', delay: '1.1s' },
  { top: '65%', left: '0px', delay: '1.2s' },
  { top: '70%', left: '-2px', delay: '1.3s' },
  { top: '75%', left: '-3px', delay: '1.4s' },
  { top: '80%', left: '-2px', delay: '1.5s' },
  { top: '85%', left: '0px', delay: '1.6s' },
  { top: '90%', left: '2px', delay: '1.7s' },
  { top: '95%', left: '3px', delay: '1.8s' },
  { top: '100%', left: '2px', delay: '1.9s' }
];

const TimelineDots: React.FC<TimelineDotsProps> = ({ isMounted }) => {
  if (!isMounted) return null;
  
  return (
    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 h-full">
      {timelineDots.map((dot, i) => (
        <div 
          key={i} 
          className="w-1 h-1 bg-blue-300 rounded-full absolute opacity-50"
          style={{ 
            top: dot.top, 
            left: dot.left,
            animationDelay: dot.delay
          }}
        ></div>
      ))}
    </div>
  );
};

export default TimelineDots;