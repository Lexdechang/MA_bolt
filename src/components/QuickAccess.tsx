import React from 'react';
import { BarChart3 } from 'lucide-react';

interface QuickAccessProps {
  title: string;
  items: { id: string; label: string; icon?: React.ReactNode }[];
  onItemClick?: (itemId: string) => void;
}

// Quick access panel component
const QuickAccess: React.FC<QuickAccessProps> = ({ title, items, onItemClick }) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <h3 className="text-sm font-medium text-gray-900 mb-3">{title}</h3>
      
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className="w-full flex items-center space-x-3 p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
          >
            <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center">
              {item.icon || <BarChart3 className="text-indigo-600" size={16} />}
            </div>
            <span className="text-sm text-gray-700">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;