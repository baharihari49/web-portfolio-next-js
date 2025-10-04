'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  fill = false,
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  style,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuwjA";

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    console.log('❌ Image failed to load:', src);
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Error state
  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        style={fill ? undefined : style}
      >
        <div className="flex flex-col items-center gap-2">
          <ImageIcon className="w-8 h-8" />
          <span className="text-sm">Failed to load image</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={fill ? undefined : style}
    >
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-300" />
        </div>
      )}
      
      {/* Optimized Next.js Image */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? (blurDataURL || defaultBlurDataURL) : undefined}
        sizes={sizes || (fill ? "100vw" : undefined)}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${fill ? 'object-cover' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
        style={fill ? undefined : {
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

// Responsive image component with preset breakpoints
interface ResponsiveImageProps extends Omit<OptimizedImageProps, 'sizes'> {
  breakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  breakpoints = { mobile: 480, tablet: 768, desktop: 1200 },
  ...props
}) => {
  const sizes = `(max-width: ${breakpoints.mobile}px) 100vw, (max-width: ${breakpoints.tablet}px) 50vw, 33vw`;
  
  return (
    <OptimizedImage
      {...props}
      sizes={sizes}
    />
  );
};

// Gallery image with lazy loading and intersection observer
export const GalleryImage: React.FC<OptimizedImageProps & { 
  lazy?: boolean;
}> = ({ lazy = true, ...props }) => {
  const [inView, setInView] = useState(!lazy);
  const imgRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!lazy || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, inView]);

  return (
    <div ref={imgRef} className={props.className}>
      {inView ? (
        <OptimizedImage
          {...props}
          placeholder="blur"
        />
      ) : (
        <div className="bg-gray-100 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;