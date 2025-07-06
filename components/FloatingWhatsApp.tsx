'use client'
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// WhatsApp SVG Icon Component
const WhatsAppIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.688"/>
  </svg>
);

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
  showAfter?: number; // Show after X seconds
}

// Custom CSS animations
const animationStyles = `
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInUp {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes wiggle {
    0%, 7% { transform: rotateZ(0); }
    15% { transform: rotateZ(-15deg); }
    20% { transform: rotateZ(10deg); }
    25% { transform: rotateZ(-10deg); }
    30% { transform: rotateZ(6deg); }
    35% { transform: rotateZ(-4deg); }
    40%, 100% { transform: rotateZ(0); }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -5px, 0);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translate3d(0, -3px, 0);
    }
    90% {
      transform: translate3d(0, -1px, 0);
    }
  }

  @keyframes pulseGreen {
    0% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
    }
  }
`;

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '+6281234567890', // Replace with your actual WhatsApp number
  message = 'Hi! I&apos;m interested in discussing a project with you.',
  position = 'bottom-right',
  showAfter = 3000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, showAfter);

    return () => clearTimeout(timer);
  }, [showAfter]);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{animationStyles}</style>
      <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Tooltip/Message Bubble */}
      {isExpanded && (
        <div 
          className={`absolute ${position === 'bottom-right' ? 'right-0 bottom-16' : 'left-0 bottom-16'} mb-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 transform transition-all duration-500 ease-out ${isExpanded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
          style={{
            animation: isExpanded ? 'slideInUp 0.5s ease-out forwards, wiggle 0.6s ease-in-out 0.3s' : ''
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 hover:rotate-90 transform"
          >
            <X size={16} />
          </button>

          {/* Content */}
          <div className="pr-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <WhatsAppIcon size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Bahari</h4>
                <p className="text-sm text-green-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Online
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">
              👋 Hi there! Need help with your project? Let&apos;s chat on WhatsApp!
            </p>
            
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:scale-105 hover:shadow-lg transform"
            >
              <WhatsAppIcon size={18} className="text-white" />
              Start Chat
            </button>
          </div>

          {/* Speech Bubble Arrow */}
          <div className={`absolute ${position === 'bottom-right' ? 'bottom-[-8px] right-8' : 'bottom-[-8px] left-8'} w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100`}></div>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <div className="relative">
        {/* Pulse Animation Ring */}
        <div 
          className={`absolute inset-0 bg-green-500 rounded-full opacity-25 ${isHovered ? 'scale-110' : 'scale-100'} transition-transform duration-300`}
          style={{
            animation: !isExpanded ? 'pulseGreen 2s infinite' : 'none'
          }}
        ></div>
        
        {/* Main Button */}
        <button
          onClick={() => {
            if (isExpanded) {
              handleWhatsAppClick();
            } else {
              setIsExpanded(true);
            }
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ease-in-out ${isHovered ? 'scale-110 shadow-green-200 shadow-2xl' : 'scale-100'} ${isExpanded ? 'bg-green-600 scale-105' : ''} hover:rotate-12 transform`}
        >
          <WhatsAppIcon 
            size={26} 
            className={`text-white transition-all duration-300 ${isExpanded ? 'scale-110 rotate-12' : 'scale-100'} ${isHovered ? 'scale-110' : ''}`} 
          />
          
          {/* Notification Badge */}
          {!isExpanded && (
            <div 
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center transform transition-all duration-300"
              style={{
                animation: 'bounce 2s infinite'
              }}
            >
              <span className="text-xs text-white font-bold">1</span>
            </div>
          )}
        </button>

        {/* Quick Action Text (shows on hover when collapsed) */}
        {!isExpanded && isHovered && (
          <div className={`absolute ${position === 'bottom-right' ? 'right-16 bottom-0' : 'left-16 bottom-0'} bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap text-sm transform transition-all duration-300 ease-out mb-4`}
            style={{
              animation: 'fadeInUp 0.3s ease-out forwards'
            }}
          >
            Need help? Let&apos;s chat!
            <div className={`absolute top-1/2 ${position === 'bottom-right' ? 'right-[-4px]' : 'left-[-4px]'} transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45`}></div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};