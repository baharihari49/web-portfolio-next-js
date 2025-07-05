'use client';

import React from 'react';
import { Share2, Twitter, Facebook, Linkedin, MessageCircle, Mail, Copy, Check } from 'lucide-react';
import { generateSocialShareUrls } from '@/lib/contentUtils';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  url,
  title,
  description,
  className = "",
  showLabels = false,
  size = 'md',
}) => {
  const [copied, setCopied] = React.useState(false);
  
  const shareUrls = generateSocialShareUrls(url, title, description);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  const shareButtons = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: shareUrls.twitter,
      color: 'hover:bg-blue-500 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-600',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: shareUrls.facebook,
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-700',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: shareUrls.linkedin,
      color: 'hover:bg-blue-700 hover:text-white',
      bgColor: 'bg-blue-50 text-blue-800',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: shareUrls.whatsapp,
      color: 'hover:bg-green-500 hover:text-white',
      bgColor: 'bg-green-50 text-green-600',
    },
    {
      name: 'Email',
      icon: Mail,
      url: shareUrls.email,
      color: 'hover:bg-gray-600 hover:text-white',
      bgColor: 'bg-gray-50 text-gray-600',
    },
  ];

  const openShareWindow = (url: string) => {
    window.open(
      url,
      'share-window',
      'width=600,height=400,scrollbars=yes,resizable=yes,toolbar=no,menubar=no'
    );
  };

  return (
    <div className={`${className}`}>
      {/* Native Share Button (mobile) */}
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className={`${sizeClasses[size]} ${
            showLabels ? 'px-4 py-2 rounded-lg' : 'rounded-full'
          } bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 sm:hidden mb-3`}
          title="Share"
        >
          <Share2 className={iconSizes[size]} />
          {showLabels && <span className="text-sm font-medium">Share</span>}
        </button>
      )}

      {/* Individual Share Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {shareButtons.map((button) => (
          <button
            key={button.name}
            onClick={() => openShareWindow(button.url)}
            className={`${
              showLabels ? 'px-3 py-2 rounded-lg w-full min-h-[44px]' : `${sizeClasses[size]} rounded-full`
            } ${button.bgColor} ${button.color} transition-all duration-200 flex items-center justify-center gap-1 hover:scale-105 hover:shadow-md`}
            title={`Share on ${button.name}`}
          >
            <button.icon className={iconSizes[size]} />
            {showLabels && <span className="text-sm font-medium whitespace-nowrap">{button.name}</span>}
          </button>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={`${
            showLabels ? 'px-3 py-2 rounded-lg w-full min-h-[44px]' : `${sizeClasses[size]} rounded-full`
          } ${
            copied 
              ? 'bg-green-100 text-green-600' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } transition-all duration-200 flex items-center justify-center gap-1 hover:scale-105 hover:shadow-md`}
          title={copied ? 'Link copied!' : 'Copy link'}
        >
          {copied ? (
            <Check className={iconSizes[size]} />
          ) : (
            <Copy className={iconSizes[size]} />
          )}
          {showLabels && (
            <span className="text-sm font-medium whitespace-nowrap">
              {copied ? 'Copied!' : 'Copy'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

// Compact version for inline use
export const CompactSocialShare: React.FC<SocialShareButtonsProps> = (props) => {
  return (
    <SocialShareButtons 
      {...props}
      size="sm"
      showLabels={false}
      className={`${props.className}`}
    />
  );
};

// Full version with labels for dedicated sections
export const FullSocialShare: React.FC<SocialShareButtonsProps> = (props) => {
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-xl p-6 ${props.className}`}>
      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5 text-blue-600" />
        Share This Article
      </h4>
      <SocialShareButtons 
        {...props}
        size="md"
        showLabels={true}
        className="gap-3"
      />
    </div>
  );
};

export default SocialShareButtons;