
import React from 'react';
import { Weight } from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WeightMonitorProps {
  currentWeight: number;
  maxRecommendedWeight?: number;
  unit?: 'kg' | 'lb';
  className?: string;
}

export const WeightMonitor = ({
  currentWeight,
  maxRecommendedWeight = 5,
  unit = 'kg',
  className
}: WeightMonitorProps) => {
  const weightPercentage = (currentWeight / maxRecommendedWeight) * 100;
  const isOverweight = currentWeight > maxRecommendedWeight;
  
  const getWeightColor = () => {
    if (weightPercentage >= 100) return 'error';
    if (weightPercentage >= 75) return 'secondary';
    return 'accent';
  };

  const getStatusText = () => {
    if (weightPercentage >= 100) return "Too Heavy!";
    if (weightPercentage >= 75) return "Getting Heavy";
    return "Good Weight";
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Bag Weight</CardTitle>
          <Weight className="h-6 w-6 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-6">
        <CircularProgress 
          value={currentWeight} 
          max={maxRecommendedWeight} 
          size="lg"
          color={getWeightColor()}
          label={getStatusText()}
          unit={unit}
        />
        
        {isOverweight && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md w-full">
            <p className="text-sm text-center text-smartpack-error">
              Your backpack is too heavy! Consider removing some items.
            </p>
          </div>
        )}
        
        <div className="mt-4 w-full">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>0 {unit}</span>
            <span>{maxRecommendedWeight} {unit}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
            <div 
              className={cn(
                "h-2 rounded-full",
                isOverweight ? "bg-smartpack-error" : "bg-smartpack-accent"
              )}
              style={{ width: `${Math.min(weightPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
