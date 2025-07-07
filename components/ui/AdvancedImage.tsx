'use client'
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty' | 'skeleton';
  blurDataURL?: string;
  fallbackSrc?: string;
  enableProgressiveLoading?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  errorText?: string;
  showLoadingSpinner?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

// Generate low quality placeholder from Cloudinary URL
const generateBlurDataURL = (src: string): string => {
  if (src.includes('cloudinary.com')) {
    // Extract cloudinary base and add blur transformation
    const cloudinaryBase = src.split('/upload/')[0];
    const imagePath = src.split('/upload/')[1];
    return `${cloudinaryBase}/upload/w_10,h_10,c_fill,e_blur:1000,f_webp,q_auto:low/${imagePath}`;
  }
  
  // Default SVG blur placeholder
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyN0MyMy44NjYgMjcgMjcgMjMuODY2IDI3IDIwQzI3IDE2LjEzNCAyMy44NjYgMTMgMjAgMTNDMTYuMTM0IDEzIDEzIDE2LjEzNCAxMyAyMEMxMyAyMy44NjYgMTYuMTM0IDI3IDIwIDI3WiIgZmlsbD0iI0Q5REREOSIvPgo8cGF0aCBkPSJNMTcgMTlDMTcuNTUyMyAxOSAxOCAxOC41NTIzIDE4IDE4QzE4IDE3LjQ0NzcgMTcuNTUyMyAxNyAxNyAxN0MxNi40NDc3IDE3IDE2IDE3LjQ0NzcgMTYgMThDMTYgMTguNTUyMyAxNi40NDc3IDE5IDE3IDE5WiIgZmlsbD0iI0Q5REREOSIvPgo8L3N2Zz4K';
};

// Skeleton placeholder component
const SkeletonPlaceholder: React.FC<{ aspectRatio?: string }> = ({ aspectRatio = '16/9' }) => (
  <div 
    className="animate-pulse bg-gray-200 rounded-lg relative overflow-hidden"
    style={{ aspectRatio }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_2s_infinite]" />
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
);

// Loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 backdrop-blur-sm z-10">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />
  </div>
);

// Error fallback component
const ErrorFallback: React.FC<{ errorText?: string; aspectRatio?: string }> = ({ 
  errorText = 'Failed to load image', 
  aspectRatio = '16/9' 
}) => (
  <div 
    className="flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg border-2 border-dashed border-gray-300"
    style={{ aspectRatio }}
  >
    <div className="text-center p-4">
      <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-sm">{errorText}</p>
    </div>
  </div>
);

export const AdvancedImage: React.FC<AdvancedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  className = '',
  containerClassName = '',
  quality = 80,
  placeholder = 'blur',
  blurDataURL,
  fallbackSrc,
  enableProgressiveLoading = true,
  aspectRatio = '16/9',
  objectFit = 'cover',
  errorText,
  showLoadingSpinner = true,
  onLoad,
  onError,
}) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSrc, setImageSrc] = useState(src);
  const [isInView, setIsInView] = useState(priority); // If priority, assume in view
  const [progressiveQuality, setProgressiveQuality] = useState(enableProgressiveLoading ? 20 : quality);
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate blur data URL if not provided
  const finalBlurDataURL = blurDataURL || generateBlurDataURL(src);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Progressive loading effect
  useEffect(() => {
    if (!enableProgressiveLoading || !isInView) return;

    const timer = setTimeout(() => {
      setProgressiveQuality(quality);
    }, 500);

    return () => clearTimeout(timer);
  }, [isInView, enableProgressiveLoading, quality]);

  const handleLoad = () => {
    setImageStatus('loaded');
    onLoad?.();
  };

  const handleError = () => {
    setImageStatus('error');
    if (fallbackSrc && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setImageStatus('loading');
    } else {
      onError?.();
    }
  };

  // Generate optimized Cloudinary URL with quality
  const getOptimizedSrc = (originalSrc: string, targetQuality: number) => {
    if (!originalSrc.includes('cloudinary.com')) return originalSrc;
    
    const [baseUrl, params] = originalSrc.split('/upload/');
    if (!params) return originalSrc;
    
    // Add or update quality parameter
    const qualityParam = `q_${targetQuality}`;
    const hasQuality = params.includes('q_');
    
    if (hasQuality) {
      const updatedParams = params.replace(/q_\d+/, qualityParam);
      return `${baseUrl}/upload/${updatedParams}`;
    } else {
      return `${baseUrl}/upload/${qualityParam},${params}`;
    }
  };

  const optimizedSrc = getOptimizedSrc(imageSrc, progressiveQuality);

  // Container classes
  const containerClasses = `relative overflow-hidden ${containerClassName}`;

  if (!isInView) {
    return (
      <div ref={imgRef} className={containerClasses} style={{ aspectRatio: fill ? undefined : aspectRatio }}>
        {placeholder === 'skeleton' ? (
          <SkeletonPlaceholder aspectRatio={aspectRatio} />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
        )}
      </div>
    );
  }

  return (
    <div ref={imgRef} className={containerClasses} style={{ aspectRatio: fill ? undefined : aspectRatio }}>
      <AnimatePresence>
        {imageStatus === 'error' ? (
          <ErrorFallback errorText={errorText} aspectRatio={aspectRatio} />
        ) : (
          <>
            {/* Show skeleton placeholder during loading */}
            {imageStatus === 'loading' && placeholder === 'skeleton' && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <SkeletonPlaceholder aspectRatio={aspectRatio} />
              </motion.div>
            )}

            {/* Show loading spinner if enabled */}
            {imageStatus === 'loading' && showLoadingSpinner && placeholder !== 'skeleton' && (
              <LoadingSpinner />
            )}

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: imageStatus === 'loaded' ? 1 : 0.8 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={optimizedSrc}
                alt={alt}
                width={fill ? undefined : width}
                height={fill ? undefined : height}
                fill={fill}
                priority={priority}
                quality={progressiveQuality}
                sizes={sizes}
                className={`${className} transition-all duration-500 ${objectFit === 'cover' ? 'object-cover' : `object-${objectFit}`}`}
                placeholder={placeholder === 'blur' ? 'blur' : 'empty'}
                blurDataURL={placeholder === 'blur' ? finalBlurDataURL : undefined}
                onLoad={handleLoad}
                onError={handleError}
                loading={priority ? 'eager' : 'lazy'}
              />
            </motion.div>

            {/* Progressive quality indicator (dev only) */}
            {process.env.NODE_ENV === 'development' && enableProgressiveLoading && (
              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                Q{progressiveQuality}
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Pre-configured variants for common use cases
export const HeroImage: React.FC<Omit<AdvancedImageProps, 'priority' | 'placeholder'>> = (props) => (
  <AdvancedImage
    {...props}
    priority={true}
    placeholder="blur"
    enableProgressiveLoading={true}
    showLoadingSpinner={false}
  />
);

export const PortfolioImage: React.FC<AdvancedImageProps & { index: number }> = ({ index, ...props }) => (
  <AdvancedImage
    {...props}
    priority={index < 3} // First 3 images get priority
    placeholder="skeleton"
    enableProgressiveLoading={true}
    aspectRatio="16/9"
  />
);

export const BlogImage: React.FC<AdvancedImageProps> = (props) => (
  <AdvancedImage
    {...props}
    placeholder="skeleton"
    enableProgressiveLoading={true}
    aspectRatio="16/9"
    fallbackSrc="/images/blog-placeholder.jpg"
  />
);

export const AvatarImage: React.FC<AdvancedImageProps> = (props) => (
  <AdvancedImage
    {...props}
    placeholder="blur"
    enableProgressiveLoading={false}
    aspectRatio="1/1"
    objectFit="cover"
    className="rounded-full"
  />
);

export default AdvancedImage;