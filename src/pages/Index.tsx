
import React, { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { BatteryStatus } from '@/components/ui/BatteryStatus';
import { WeatherCard } from '@/components/ui/WeatherCard';
import { WeightMonitor } from '@/components/ui/WeightMonitor';
import { BookOpen, Bell, Battery, Package } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { NotificationItem, Notification } from '@/components/ui/NotificationItem';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { toast } = useToast();
  
  // Mock data
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [bagWeight, setBagWeight] = useState(4.2);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'book',
      title: 'Missing Book',
      message: 'Mathematics textbook is not in your backpack',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false
    },
    {
      id: '2',
      type: 'battery',
      title: 'Battery Status',
      message: 'Your backpack battery is at 75%',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      isRead: true
    }
  ]);
  
  const requiredBooks = 5;
  const presentBooks = 4;
  
  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      description: "Notification dismissed",
      duration: 2000,
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  
  // UI helpers
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="pb-20 max-w-lg mx-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{getGreeting()}</h1>
            <p className="text-gray-500">Your SmartPack is ready</p>
          </div>
          <Link to="/notifications">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.some(n => !n.isRead) && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-smartpack-error rounded-full"></span>
              )}
            </Button>
          </Link>
        </div>
        
        {/* Main Status Overview */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-around">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-2">
                    <BookOpen className="h-6 w-6 text-smartpack-primary" />
                  </div>
                  <span className="text-2xl font-bold">{presentBooks}/{requiredBooks}</span>
                  <span className="text-sm text-gray-500">Books</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full mb-2">
                    <Battery className="h-6 w-6 text-smartpack-accent" />
                  </div>
                  <span className="text-2xl font-bold">{batteryLevel}%</span>
                  <span className="text-sm text-gray-500">Battery</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-2">
                    <Package className="h-6 w-6 text-purple-500" />
                  </div>
                  <span className="text-2xl font-bold">{bagWeight}kg</span>
                  <span className="text-sm text-gray-500">Weight</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Battery Status */}
          <BatteryStatus level={batteryLevel} className="col-span-2 md:col-span-1" />
          
          {/* Weight Monitor */}
          <WeightMonitor 
            currentWeight={bagWeight} 
            maxRecommendedWeight={5}
            className="col-span-2 md:col-span-1"
          />
        </div>
        
        {/* Weather Card */}
        <div className="mb-6">
          <WeatherCard
            temperature={24}
            condition="cloudy"
            humidity={65}
            chanceOfRain={65}
          />
        </div>
        
        {/* Recent Notifications */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Recent Notifications</h2>
            <Link to="/notifications">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>
          
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onDismiss={dismissNotification}
                onMarkAsRead={markAsRead}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No notifications</p>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Index;
