import React from 'react';
import { getCrowdLevel } from '../services/iotCrowdService';

export default function CrowdBadge({ current, max, showPercent = false, size = 'md' }) {
  const info = getCrowdLevel(current, max);
  const percent = Math.round((current / max) * 100);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-sm font-semibold'
  };

  return (
    <div className={`inline-flex items-center space-x-1.5 rounded-full border ${info.bgClass} ${sizeClasses[size] || sizeClasses.md}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${info.dotClass}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${info.dotClass}`}></span>
      </span>
      <span className="font-semibold tracking-wide">{info.badge}</span>
      {showPercent && (
        <span className="opacity-80 font-mono text-[10px]">
          ({percent}% cap)
        </span>
      )}
    </div>
  );
}
