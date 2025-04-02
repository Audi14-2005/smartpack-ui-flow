
import React, { useState, useEffect } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { WeatherCard } from '@/components/ui/WeatherCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Cloud, CloudRain, Umbrella, Wind, Droplets, MapPin } from 'lucide-react';

type DayForecast = {
  day: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy';
  chanceOfRain: number;
};

const Weather = () => {
  const [currentLocation, setCurrentLocation] = useState('Unknown location');
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 24,
    condition: 'cloudy' as 'sunny' | 'cloudy' | 'rainy',
    humidity: 65,
    chanceOfRain: 65,
    windSpeed: 12,
  });
  
  const [forecast, setForecast] = useState<DayForecast[]>([
    { day: 'Tomorrow', temperature: 26, condition: 'sunny', chanceOfRain: 10 },
    { day: 'Wednesday', temperature: 25, condition: 'cloudy', chanceOfRain: 30 },
    { day: 'Thursday', temperature: 23, condition: 'rainy', chanceOfRain: 80 },
    { day: 'Friday', temperature: 22, condition: 'rainy', chanceOfRain: 90 },
    { day: 'Saturday', temperature: 24, condition: 'cloudy', chanceOfRain: 40 }
  ]);
  
  const [needUmbrella, setNeedUmbrella] = useState(false);
  
  useEffect(() => {
    // Check if umbrella is needed today
    setNeedUmbrella(currentWeather.chanceOfRain > 50);
  }, [currentWeather.chanceOfRain]);
  
  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demonstration, we'll just show the coordinates
          // In a real app, you would reverse geocode these coordinates to get the city name
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
          
          // Here you would typically make an API call to a weather service using these coordinates
          console.log("Location obtained:", latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCurrentLocation("Location access denied");
        }
      );
    } else {
      setCurrentLocation("Geolocation not supported by this browser");
    }
  }, []);
  
  const getWeatherIcon = (condition: 'sunny' | 'cloudy' | 'rainy', size: number = 6) => {
    const className = `h-${size} w-${size}`;
    switch (condition) {
      case 'sunny':
        return <Sun className={className} color="#f59e0b" />;
      case 'cloudy':
        return <Cloud className={className} color="#64748b" />;
      case 'rainy':
        return <CloudRain className={className} color="#3498db" />;
    }
  };

  return (
    <div className="pb-20 max-w-lg mx-auto">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Weather Forecast</h1>
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <p>{currentLocation}</p>
          </div>
        </div>
        
        {/* Today's Weather */}
        <div className="mb-6">
          <WeatherCard
            temperature={currentWeather.temperature}
            condition={currentWeather.condition}
            humidity={currentWeather.humidity}
            chanceOfRain={currentWeather.chanceOfRain}
          />
        </div>
        
        {/* Umbrella Reminder */}
        {needUmbrella && (
          <Card className="mb-6 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full mr-4">
                  <Umbrella className="h-6 w-6 text-smartpack-secondary" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-300">Rain Alert</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Don't forget your umbrella today!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Wind className="h-8 w-8 text-gray-500 mb-2" />
              <span className="text-sm text-gray-500">Wind Speed</span>
              <span className="text-xl font-semibold">{currentWeather.windSpeed} km/h</span>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Droplets className="h-8 w-8 text-smartpack-secondary mb-2" />
              <span className="text-sm text-gray-500">Humidity</span>
              <span className="text-xl font-semibold">{currentWeather.humidity}%</span>
            </CardContent>
          </Card>
        </div>
        
        {/* 5-Day Forecast */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            {forecast.map((day, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-3"
                style={{
                  borderBottom: index < forecast.length - 1 ? '1px solid #e2e8f0' : 'none'
                }}
              >
                <span className="font-medium">{day.day}</span>
                <div className="flex items-center">
                  {getWeatherIcon(day.condition, 5)}
                  <span className="ml-2 text-gray-600">{day.temperature}°C</span>
                  <div className="ml-4 flex items-center">
                    <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm text-gray-500">{day.chanceOfRain}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Weather;
