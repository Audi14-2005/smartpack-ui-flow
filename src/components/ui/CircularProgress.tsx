
import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'error';
  showValue?: boolean;
  unit?: string;
}

export const CircularProgress = ({
  value,
  max,
  size = 'md',
  label,
  color = 'primary',
  showValue = true,
  unit = '%'
}: CircularProgressProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const dimensions = {
    sm: 80,
    md: 120,
    lg: 160
  };
  const actualSize = dimensions[size];
  const radius = (actualSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    primary: 'stroke-smartpack-primary',
    secondary: 'stroke-smartpack-secondary',
    accent: 'stroke-smartpack-accent',
    error: 'stroke-smartpack-error'
  };
  
  const textSize = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  };
  
  const labelSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        <svg
          width={actualSize}
          height={actualSize}
          viewBox={`0 0 ${actualSize} ${actualSize}`}
        >
          {/* Background circle */}
          <circle
            cx={actualSize / 2}
            cy={actualSize / 2}
            r={radius}
            fill="transparent"
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={actualSize / 2}
            cy={actualSize / 2}
            r={radius}
            fill="transparent"
            className={cn(colorClasses[color])}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${actualSize / 2} ${actualSize / 2})`}
          />
        </svg>
        
        {showValue && (
          <div className="absolute flex flex-col items-center justify-center">
            <span className={cn("font-semibold", textSize[size])}>
              {Math.round(value)}
              <span className="text-xs ml-0.5">{unit}</span>
            </span>
          </div>
        )}
      </div>
      
      {label && (
        <span className={cn("text-gray-600 dark:text-gray-400 mt-2", labelSize[size])}>
          {label}
        </span>
      )}
    </div>
  );
};
