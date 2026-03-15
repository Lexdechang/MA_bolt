import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterTab {
  id: string;
  label: string;
  active?: boolean;
}

interface SearchFilterProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  tabs: FilterTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  placeholder?: string;
}

// Search input with filter tabs component
const SearchFilter: React.FC<SearchFilterProps> = ({
  searchValue = '',
  onSearchChange,
  tabs,
  activeTab,
  onTabChange,
  placeholder = 'Search by name or number'
}) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <Filter size={16} />
        </button>
      </div>
      
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === tab.id || tab.active
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;