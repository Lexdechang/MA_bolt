import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Tab {
  id: string;
  label: string;
  active?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  showAnalytics?: boolean;
}

// Tab navigation component for queue management
const TabNavigation: React.FC<TabNavigationProps> = ({ 
  tabs, 
  activeTab,
  onTabChange,
  showAnalytics = true 
}) => {
  const navigate = useNavigate();

  const handleAnalyticsClick = () => {
    navigate('/analytics');
  };

  return (
    <div className="bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id || tab.active
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {showAnalytics && (
        <button 
          onClick={handleAnalyticsClick}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
        >
          <BarChart3 size={16} />
          <span>Analytics</span>
        </button>
      )}
    </div>
  );
};

export default TabNavigation;