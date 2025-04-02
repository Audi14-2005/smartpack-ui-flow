
import React, { useState, useEffect } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { BatteryStatus } from '@/components/ui/BatteryStatus';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircularProgress } from '@/components/ui/CircularProgress';
import { Battery as BatteryIcon, Clock, BatteryFull, BatteryLow, Zap, Activity } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const BatteryPage = () => {
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [isCharging, setIsCharging] = useState(false);
  const [estimatedHours, setEstimatedHours] = useState(6);
  const [batteryHistory, setBatteryHistory] = useState([
    { time: '8:00 AM', level: 100 },
    { time: '10:00 AM', level: 95 },
    { time: '12:00 PM', level: 88 },
    { time: '2:00 PM', level: 82 },
    { time: '4:00 PM', level: 75 }
  ]);
  
  // Simulated power consumption per feature
  const powerConsumption = [
    { feature: 'NFC Book Scanner', percentage: 40 },
    { feature: 'Weight Sensors', percentage: 25 },
    { feature: 'LED Indicators', percentage: 15 },
    { feature: 'Bluetooth Connection', percentage: 20 }
  ];
  
  // Simulated battery reduction over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCharging && batteryLevel > 0) {
        setBatteryLevel(prev => Math.max(0, prev - 0.1));
        setEstimatedHours(prev => Math.max(0, prev - 0.02));
      } else if (isCharging && batteryLevel < 100) {
        setBatteryLevel(prev => Math.min(100, prev + 0.5));
        setEstimatedHours(prev => Math.min(12, prev + 0.1));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isCharging, batteryLevel]);
  
  const toggleCharging = () => {
    setIsCharging(!isCharging);
  };

  return (
    <div className="pb-20 max-w-lg mx-auto">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Battery Monitor</h1>
          <p className="text-gray-500">Track your backpack's battery status</p>
        </div>
        
        {/* Main Battery Status */}
        <div className="mb-6">
          <BatteryStatus level={batteryLevel} isCharging={isCharging} />
        </div>
        
        {/* Battery Actions */}
        <div className="mb-6">
          <button 
            onClick={toggleCharging}
            className="w-full py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
          >
            {isCharging ? (
              <>
                <BatteryFull className="h-5 w-5 text-smartpack-accent mr-2" />
                <span>Disconnect Charger</span>
              </>
            ) : (
              <>
                <BatteryLow className="h-5 w-5 text-smartpack-secondary mr-2" />
                <span>Simulate Charging</span>
              </>
            )}
          </button>
        </div>
        
        {/* Battery Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center min-h-[160px]">
              <Clock className="h-6 w-6 text-gray-500 mb-2" />
              <span className="text-sm text-gray-500">Estimated Time</span>
              <div className="text-center">
                <span className="text-2xl font-semibold">{Math.round(estimatedHours)}</span>
                <span className="text-lg ml-1">hours</span>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {batteryLevel < 15 ? 'Critical' : batteryLevel < 30 ? 'Low' : 'Normal'}
              </span>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center min-h-[160px]">
              <Zap className="h-6 w-6 text-yellow-500 mb-2" />
              <span className="text-sm text-gray-500">Power Mode</span>
              <span className="text-xl font-semibold mt-1">Normal</span>
              
              <div className="flex gap-2 mt-3">
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Normal</span>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full opacity-60">Power Save</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Power Consumption */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Power Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            {powerConsumption.map((item, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{item.feature}</span>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Battery History */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Battery History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-40">
              {/* Simple line chart visualization */}
              <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                <polyline
                  points="
                    0,0
                    60,5
                    120,12
                    180,18
                    240,25
                    300,25
                  "
                  fill="none"
                  stroke="#3498db"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                {batteryHistory.map((point, index) => (
                  <span key={index}>{point.time}</span>
                ))}
              </div>
              
              <div className="absolute top-0 right-0 text-xs text-gray-500">100%</div>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500">0%</div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Battery has decreased by <span className="font-medium">25%</span> in the last 8 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default BatteryPage;
