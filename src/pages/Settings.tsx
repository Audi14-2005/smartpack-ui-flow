
import React, { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Weight, 
  BookOpen,
  Battery, 
  Bluetooth, 
  Smartphone,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const { toast } = useToast();
  
  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [maxWeightAlert, setMaxWeightAlert] = useState(5);
  const [lowBatteryThreshold, setLowBatteryThreshold] = useState(20);
  const [autoScanBooks, setAutoScanBooks] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  
  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to defaults",
      duration: 3000
    });
    
    // Reset to defaults
    setNotificationsEnabled(true);
    setDarkModeEnabled(false);
    setMaxWeightAlert(5);
    setLowBatteryThreshold(20);
    setAutoScanBooks(true);
    setBluetoothEnabled(true);
  };
  
  const handleSyncDevice = () => {
    toast({
      title: "Syncing Device",
      description: "Connecting to your SmartPack...",
      duration: 2000
    });
    
    // Simulate syncing process
    setTimeout(() => {
      toast({
        title: "Device Synced",
        description: "Successfully connected to your SmartPack",
        duration: 3000
      });
    }, 2000);
  };
  
  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    control 
  }: { 
    icon: React.ElementType; 
    title: string; 
    description: string; 
    control: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex items-center">
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full mr-3">
          <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div>{control}</div>
    </div>
  );

  return (
    <div className="pb-20 max-w-lg mx-auto">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500">Configure your SmartPack</p>
        </div>
        
        {/* General Settings */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">General Settings</CardTitle>
            <CardDescription>Configure app behavior and appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <SettingItem
              icon={Bell}
              title="Notifications"
              description="Receive alerts and reminders"
              control={
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                />
              }
            />
            
            <SettingItem
              icon={Moon}
              title="Dark Mode"
              description="Use dark theme"
              control={
                <Switch 
                  checked={darkModeEnabled} 
                  onCheckedChange={setDarkModeEnabled} 
                />
              }
            />
          </CardContent>
        </Card>
        
        {/* Device Settings */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Device Settings</CardTitle>
            <CardDescription>Configure SmartPack features</CardDescription>
          </CardHeader>
          <CardContent>
            <SettingItem
              icon={Weight}
              title="Maximum Weight Alert"
              description={`Alert when backpack exceeds ${maxWeightAlert}kg`}
              control={
                <div className="w-24">
                  <Slider 
                    value={[maxWeightAlert]} 
                    onValueChange={(value) => setMaxWeightAlert(value[0])}
                    min={1}
                    max={10}
                    step={0.5}
                  />
                </div>
              }
            />
            
            <SettingItem
              icon={Battery}
              title="Low Battery Threshold"
              description={`Alert when battery falls below ${lowBatteryThreshold}%`}
              control={
                <div className="w-24">
                  <Slider 
                    value={[lowBatteryThreshold]} 
                    onValueChange={(value) => setLowBatteryThreshold(value[0])}
                    min={5}
                    max={50}
                    step={5}
                  />
                </div>
              }
            />
            
            <SettingItem
              icon={BookOpen}
              title="Auto-Scan Books"
              description="Automatically scan for books when opened"
              control={
                <Switch 
                  checked={autoScanBooks} 
                  onCheckedChange={setAutoScanBooks} 
                />
              }
            />
            
            <SettingItem
              icon={Bluetooth}
              title="Bluetooth Connection"
              description="Connect to SmartPack via Bluetooth"
              control={
                <Switch 
                  checked={bluetoothEnabled} 
                  onCheckedChange={setBluetoothEnabled} 
                />
              }
            />
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleReset} className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Default
          </Button>
          
          <Button onClick={handleSyncDevice} className="flex items-center">
            <Smartphone className="h-4 w-4 mr-2" />
            Sync Device
          </Button>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>SmartPack v1.0.0</p>
          <p className="mt-1">Device ID: SP12345678</p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Settings;
