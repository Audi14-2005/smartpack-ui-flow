
import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Book {
  id: string;
  title: string;
  author: string;
  isRequired: boolean;
  isPresent: boolean;
}

interface BookItemProps {
  book: Book;
  onTogglePresence?: (id: string) => void;
}

export const BookItem = ({ book, onTogglePresence }: BookItemProps) => {
  const handleToggle = () => {
    if (onTogglePresence) {
      onTogglePresence(book.id);
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 border rounded-lg mb-2 transition-colors",
        book.isRequired && !book.isPresent 
          ? "border-smartpack-error bg-red-50 dark:bg-red-900/10" 
          : "border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="flex-1">
        <h3 className={cn(
          "font-medium",
          book.isRequired && !book.isPresent ? "text-smartpack-error" : ""
        )}>
          {book.title}
          {book.isRequired && (
            <span className="ml-2 text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
              Required
            </span>
          )}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{book.author}</p>
      </div>
      
      <div className="flex items-center">
        {book.isRequired && !book.isPresent ? (
          <div className="flex items-center text-smartpack-error mr-2">
            <AlertTriangle className="h-4 w-4 mr-1" />
            <span className="text-xs">Missing</span>
          </div>
        ) : book.isPresent ? (
          <div className="flex items-center text-smartpack-accent mr-2">
            <Check className="h-4 w-4 mr-1" />
            <span className="text-xs">Present</span>
          </div>
        ) : (
          <div className="flex items-center text-gray-400 mr-2">
            <X className="h-4 w-4 mr-1" />
            <span className="text-xs">Not in bag</span>
          </div>
        )}
        
        <button
          onClick={handleToggle}
          className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"
        >
          {book.isPresent ? (
            <X className="h-4 w-4 text-gray-500" />
          ) : (
            <Check className="h-4 w-4 text-smartpack-accent" />
          )}
        </button>
      </div>
    </div>
  );
};
