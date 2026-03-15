import React from 'react';
import { Search, ChevronLeft, ChevronRight, MoreHorizontal, Minus, X } from 'lucide-react';

interface HeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showNavigation?: boolean;
}

// Top header component with navigation, search, and window controls
const Header: React.FC<HeaderProps> = ({ 
  searchValue = '', 
  onSearchChange,
  showNavigation = true 
}) => {
  return (
    <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4">
      {showNavigation && (
        <div className="flex items-center space-x-2 mr-4">
          <button className="p-1 rounded hover:bg-gray-200 text-gray-600">
            <ChevronLeft size={16} />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 text-gray-600">
            <ChevronRight size={16} />
          </button>
        </div>
      )}
      
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      
      <div className="flex items-center space-x-2 ml-auto">
        <button className="p-2 rounded hover:bg-gray-200 text-gray-600">
          <MoreHorizontal size={16} />
        </button>
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
        </div>
        <div className="flex space-x-1">
          <button className="p-1 rounded hover:bg-gray-200 text-gray-600">
            <Minus size={14} />
          </button>
          <button className="p-1 rounded hover:bg-gray-200 text-gray-600">
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;