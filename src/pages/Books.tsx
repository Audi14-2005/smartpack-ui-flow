
import React, { useState } from 'react';
import { BottomNav } from '@/components/layout/BottomNav';
import { BookItem, Book } from '@/components/ui/BookItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { BookPlus, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Books = () => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  
  // Mock book data
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Mathematics Textbook',
      author: 'John Smith',
      isRequired: true,
      isPresent: false
    },
    {
      id: '2',
      title: 'Physics Fundamentals',
      author: 'Robert Johnson',
      isRequired: true,
      isPresent: true
    },
    {
      id: '3',
      title: 'History of Science',
      author: 'Mary Williams',
      isRequired: true,
      isPresent: true
    },
    {
      id: '4',
      title: 'English Literature',
      author: 'Sarah Brown',
      isRequired: true,
      isPresent: true
    },
    {
      id: '5',
      title: 'Programming Basics',
      author: 'David Miller',
      isRequired: true,
      isPresent: true
    },
    {
      id: '6',
      title: 'Art History',
      author: 'Elizabeth Taylor',
      isRequired: false,
      isPresent: false
    }
  ]);
  
  const toggleBookPresence = (id: string) => {
    setBooks(books.map(book => 
      book.id === id 
        ? { ...book, isPresent: !book.isPresent } 
        : book
    ));
    
    const book = books.find(b => b.id === id);
    if (book) {
      toast({
        title: book.isPresent ? `Removed from bag` : `Added to bag`,
        description: book.title,
        duration: 2000
      });
    }
  };
  
  const startScan = () => {
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      const missingBook = books.find(b => b.isRequired && !b.isPresent);
      if (missingBook) {
        setBooks(books.map(book => 
          book.id === missingBook.id 
            ? { ...book, isPresent: true } 
            : book
        ));
        
        toast({
          title: 'Book scanned!',
          description: `${missingBook.title} added to your backpack`,
          duration: 3000
        });
      } else {
        toast({
          title: 'Scan completed',
          description: 'No new books detected',
          duration: 3000
        });
      }
      setScanning(false);
    }, 3000);
  };
  
  // Calculate required books stats
  const requiredBooks = books.filter(book => book.isRequired);
  const presentRequiredBooks = requiredBooks.filter(book => book.isPresent);
  const progressPercentage = (presentRequiredBooks.length / requiredBooks.length) * 100;

  return (
    <div className="pb-20 max-w-lg mx-auto">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Books</h1>
          <p className="text-gray-500">Track and manage your textbooks</p>
        </div>
        
        {/* Books Status Card */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Required Books Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {presentRequiredBooks.length} of {requiredBooks.length} books in bag
              </span>
              <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            {progressPercentage < 100 && (
              <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-md border border-amber-200 dark:border-amber-800">
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  You're missing {requiredBooks.length - presentRequiredBooks.length} required book(s)
                </p>
              </div>
            )}
            
            {progressPercentage === 100 && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-md border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400">
                  All required books are in your backpack!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Scan Button */}
        <div className="flex justify-center mb-6">
          <Button 
            onClick={startScan}
            disabled={scanning}
            className="relative overflow-hidden"
            size="lg"
          >
            <ScanLine className="mr-2 h-5 w-5" />
            {scanning ? 'Scanning...' : 'Scan for Books'}
            {scanning && (
              <span className="absolute inset-0 bg-smartpack-secondary opacity-20 animate-pulse"></span>
            )}
          </Button>
        </div>
        
        {/* Required Books Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Required Books</h2>
          {requiredBooks.map(book => (
            <BookItem 
              key={book.id} 
              book={book} 
              onTogglePresence={toggleBookPresence} 
            />
          ))}
        </div>
        
        {/* Optional Books Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Other Books</h2>
          {books.filter(book => !book.isRequired).length > 0 ? (
            books.filter(book => !book.isRequired).map(book => (
              <BookItem 
                key={book.id} 
                book={book} 
                onTogglePresence={toggleBookPresence} 
              />
            ))
          ) : (
            <div className="text-center py-6 border border-dashed rounded-lg">
              <BookPlus className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">No additional books</p>
              <p className="text-sm text-gray-400">Additional books will appear here</p>
            </div>
          )}
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Books;
