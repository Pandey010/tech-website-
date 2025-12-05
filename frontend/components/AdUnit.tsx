import React from 'react';
import { AdSize } from '../types';

interface AdUnitProps {
  size: AdSize;
  className?: string;
  label?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ size, className = '', label = 'Advertisement' }) => {
  const getSizeClasses = (size: AdSize) => {
    switch (size) {
      case AdSize.LEADERBOARD:
        return 'w-full max-w-[728px] h-[90px]';
      case AdSize.RECTANGLE:
        return 'w-[300px] h-[250px]';
      case AdSize.SKYSCRAPER:
        return 'w-[160px] h-[600px]';
      case AdSize.MOBILE_BANNER:
        return 'w-[320px] h-[50px]';
      default:
        return 'w-full h-32';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center my-6 ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-1 font-sans">
        {label}
      </span>
      <div 
        className={`${getSizeClasses(size)} bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 border-dashed flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 select-none overflow-hidden relative group transition-colors hover:bg-gray-50 dark:hover:bg-slate-800`}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-10 dark:opacity-5"></div>
        <p className="font-semibold text-xs z-10">Ad Space</p>
        <p className="text-[10px] z-10 opacity-70">{size}</p>
        
        {/* Simulation of an ad hover effect */}
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-400/20 group-hover:bg-blue-500 transition-colors cursor-pointer" title="AdChoices" />
      </div>
    </div>
  );
};

export default AdUnit;