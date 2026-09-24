import React from 'react';

export default function BrandLogo({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`relative shrink-0 ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-sm">
        {/* Rounded Green App Icon Background */}
        <rect width="120" height="120" rx="34" fill="#22A45D" />
        
        {/* White Map Pin */}
        <path
          d="M60 22C43.4315 22 30 35.4315 30 52C30 72.5 60 98 60 98C60 98 90 72.5 90 52C90 35.4315 76.5685 22 60 22Z"
          fill="#FFFFFF"
        />
        
        {/* Inner Green Circle */}
        <circle cx="60" cy="50" r="13" fill="#22A45D" />
        
        {/* Mint Star/Sparkle */}
        <path
          d="M78 20L80.5 30.5L91 33L80.5 35.5L78 46L75.5 35.5L65 33L75.5 30.5L78 20Z"
          fill="#6FE3A6"
        />
      </svg>
    </div>
  );
}
