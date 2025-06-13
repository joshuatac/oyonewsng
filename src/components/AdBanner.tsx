'use client';

import { useEffect } from 'react';

interface AdBannerProps {
  size: 'large' | 'medium' | 'sidebar';
  position: 'top' | 'content' | 'sidebar' | 'bottom' | 'mid-content';
}

const AdBanner = ({ size, position }: AdBannerProps) => {
  useEffect(() => {
    // First script
    const s1 = document.createElement('script');
    s1.src = 'https://groleegni.net/401/9445018';
    try {
      (document.body || document.documentElement).appendChild(s1);
    } catch (e) {
      console.error('Failed to append first Monetag script:', e);
    }

    // Second script
    const s2 = document.createElement('script');
    s2.src = 'https://vemtoutcheeg.com/400/8890907';
    try {
      (document.body || document.documentElement).appendChild(s2);
    } catch (e) {
      console.error('Failed to append second Monetag script:', e);
    }

    // Third script (head injection)
    const s3 = document.createElement('script');
    s3.src = 'https://eechicha.com/act/files/tag.min.js?z=8890887';
    s3.setAttribute('data-cfasync', 'false');
    s3.async = true;
    try {
      document.head.appendChild(s3);
    } catch (e) {
      console.error('Failed to append third Monetag script to head:', e);
    }

    return () => {
      // Optional: cleanup if necessary
    };
  }, []);

  const getAdDimensions = () => {
    switch (size) {
      case 'large':
        return 'h-32 md:h-40';
      case 'medium':
        return 'h-24 md:h-32';
      case 'sidebar':
        return 'h-64';
      default:
        return 'h-32';
    }
  };

  const getMarginClasses = () => {
    switch (position) {
      case 'top':
        return 'mb-8';
      case 'content':
        return 'my-8';
      case 'sidebar':
        return 'mb-8';
      case 'bottom':
        return 'mt-8 mb-4';
      case 'mid-content':
        return 'my-6';
      default:
        return 'my-4';
    }
  };

  return (
    <div className={`w-full ${getMarginClasses()}`}>
      <div
        className={`
          ${getAdDimensions()}
          relative overflow-hidden rounded-lg
          border-2 border-dashed border-gray-300
          bg-gradient-to-r from-blue-100 to-purple-100
          flex items-center justify-center
          hover:from-blue-200 hover:to-purple-200
          transition-all duration-300
        `}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" />
        </div>

        <div className="z-10 text-center text-sm text-gray-600">
          Loading Ad...
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
