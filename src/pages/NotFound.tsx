
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Log the error for debugging
    console.error(`404 Error: User attempted to access non-existent route: ${window.location.pathname}`);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="mb-6 p-6 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
        <AlertTriangle className="h-16 w-16 text-yellow-600 dark:text-yellow-400" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      
      <div className="space-y-4">
        <Button 
          onClick={() => navigate('/')}
          className="w-full sm:w-auto"
        >
          Go to Home
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto"
        >
          Go Back
        </Button>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        If you believe this is an error, please contact support.
      </p>
    </div>
  );
};

export default NotFound;
