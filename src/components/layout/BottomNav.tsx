
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Umbrella, Battery, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavItem = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean;
}) => (
  <Link 
    to={to} 
    className="flex flex-col items-center justify-center w-full"
  >
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-full transition-colors", 
        isActive ? "text-smartpack-secondary" : "text-gray-500"
      )}
    >
      <Icon className="w-6 h-6" />
      <span className="text-xs mt-1">{label}</span>
    </div>
  </Link>
);

export const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/books', label: 'Books', icon: BookOpen },
    { path: '/weather', label: 'Weather', icon: Umbrella },
    { path: '/battery', label: 'Battery', icon: Battery },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg rounded-t-xl z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            to={item.path}
            icon={item.icon}
            label={item.label}
            isActive={currentPath === item.path}
          />
        ))}
      </div>
    </div>
  );
};
