
import React from 'react';
import { X, BookOpen, Battery, Weight, Umbrella, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export type NotificationType = 'book' | 'battery' | 'weight' | 'weather' | 'general';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem = ({
  notification,
  onDismiss,
  onMarkAsRead
}: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'book':
        return <BookOpen className="h-5 w-5 text-smartpack-primary" />;
      case 'battery':
        return <Battery className="h-5 w-5 text-smartpack-error" />;
      case 'weight':
        return <Weight className="h-5 w-5 text-smartpack-secondary" />;
      case 'weather':
        return <Umbrella className="h-5 w-5 text-smartpack-secondary" />;
      default:
        return <Bell className="h-5 w-5 text-smartpack-primary" />;
    }
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (secondsAgo < 60) return `${secondsAgo} seconds ago`;
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
    if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
    return `${Math.floor(secondsAgo / 86400)} days ago`;
  };

  return (
    <div 
      className={cn(
        "flex p-3 border rounded-lg mb-2 transition-all",
        notification.isRead 
          ? "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50" 
          : "border-smartpack-secondary bg-blue-50 dark:bg-blue-900/10"
      )}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="mr-3 mt-1">{getIcon()}</div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{notification.title}</h3>
          <span className="text-xs text-gray-500">{timeAgo(notification.timestamp)}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
      </div>
      
      <button 
        className="ml-2 p-1 text-gray-400 hover:text-gray-600 self-start"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(notification.id);
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
