
import React, { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { Notification, NotificationItem } from '@/components/ui/NotificationItem';
import { useToast } from '@/hooks/use-toast';
import { Bell, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Notifications = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock notifications data
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
    },
    {
      id: '3',
      type: 'weight',
      title: 'Weight Alert',
      message: 'Backpack weight exceeds recommended limit of 5kg',
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      isRead: false
    },
    {
      id: '4',
      type: 'weather',
      title: 'Weather Alert',
      message: 'Rain expected today, pack your umbrella',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true
    },
    {
      id: '5',
      type: 'general',
      title: 'SmartPack Update',
      message: 'New firmware update available for your SmartPack',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      isRead: true
    }
  ]);
  
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
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    toast({
      description: "All notifications marked as read",
      duration: 2000,
    });
  };
  
  const dismissAll = () => {
    setNotifications([]);
    toast({
      description: "All notifications cleared",
      duration: 2000,
    });
  };
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="pb-20 max-w-lg mx-auto">
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        
        {notifications.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-gray-500" />
                <span>
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up'}
                </span>
              </div>
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    Mark all as read
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={dismissAll}>
                  Clear all
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              {notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onDismiss={dismissNotification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          </>
        ) : (
          <Card>
            <CardContent className="pt-6 pb-6 flex flex-col items-center">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                <Bell className="h-8 w-8 text-gray-500" />
              </div>
              <h2 className="text-xl font-semibold mb-2">All caught up!</h2>
              <p className="text-gray-500 text-center">
                You don't have any notifications at the moment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Notifications;
