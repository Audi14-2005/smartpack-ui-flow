
import React from 'react';
import { Umbrella, Sun, Cloud, CloudRain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface WeatherCardProps {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  humidity: number;
  chanceOfRain: number;
}

export const WeatherCard = ({
  temperature,
  condition,
  humidity,
  chanceOfRain
}: WeatherCardProps) => {
  const { toast } = useToast();
  const [notified, setNotified] = React.useState(false);

  React.useEffect(() => {
    if (chanceOfRain > 50 && !notified) {
      toast({
        title: "Rain expected today!",
        description: "Don't forget your umbrella.",
        duration: 5000,
      });
      setNotified(true);
    }
  }, [chanceOfRain, notified, toast]);

  const weatherIcons = {
    sunny: <Sun className="h-12 w-12 text-yellow-500" />,
    cloudy: <Cloud className="h-12 w-12 text-gray-500" />,
    rainy: <CloudRain className="h-12 w-12 text-smartpack-secondary" />
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Today's Weather</CardTitle>
        <CardDescription>
          {condition.charAt(0).toUpperCase() + condition.slice(1)} conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{temperature}°C</span>
            <span className="text-sm text-muted-foreground">Humidity: {humidity}%</span>
          </div>
          {weatherIcons[condition]}
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Chance of Rain</span>
            <span className="text-sm font-medium">{chanceOfRain}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-smartpack-secondary h-2 rounded-full" 
              style={{ width: `${chanceOfRain}%` }}
            ></div>
          </div>
        </div>
        
        {chanceOfRain > 50 && (
          <div className="flex items-center mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <Umbrella className="h-5 w-5 text-smartpack-secondary mr-2" />
            <span className="text-sm">Don't forget your umbrella today!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
