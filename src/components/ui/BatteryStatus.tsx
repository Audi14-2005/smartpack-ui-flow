
import React from 'react';
import { Battery, BatteryFull, BatteryLow, BatteryWarning } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BatteryStatusProps {
  level: number;
  isCharging?: boolean;
  className?: string;
}

export const BatteryStatus = ({
  level,
  isCharging = false,
  className
}: BatteryStatusProps) => {
  const getBatteryColor = () => {
    if (level <= 20) return 'error';
    if (level <= 50) return 'secondary';
    return 'accent';
  };

  const getBatteryIcon = () => {
    if (level <= 20) return <BatteryLow className="h-6 w-6 text-smartpack-error" />;
    if (level <= 50) return <BatteryWarning className="h-6 w-6 text-smartpack-secondary" />;
    return <BatteryFull className="h-6 w-6 text-smartpack-accent" />;
  };

  const getStatusText = () => {
    if (isCharging) return "Charging";
    if (level <= 20) return "Low Battery";
    if (level <= 50) return "Moderate";
    return "Good";
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Battery Status</CardTitle>
          {getBatteryIcon()}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-6">
        <CircularProgress 
          value={level} 
          max={100} 
          size="lg"
          color={getBatteryColor()}
          label={getStatusText()}
        />
        
        {level <= 20 && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md w-full">
            <p className="text-sm text-center text-smartpack-error">
              Battery level is low. Please charge your backpack soon.
            </p>
          </div>
        )}
        
        {isCharging && (
          <div className="mt-4 flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-green-600 dark:text-green-400">Charging</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
