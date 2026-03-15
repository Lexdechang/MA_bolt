import React from 'react';
import { 
  Activity, 
  MessageCircle, 
  Users, 
  Calendar, 
  Phone, 
  Files, 
  List, 
  Grid3x3,
  MoreHorizontal 
} from 'lucide-react';

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

// Sidebar navigation component for Teams-style interface
const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'queues', onItemClick }) => {
  const sidebarItems = [
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'teams', icon: Users, label: 'Teams' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'calls', icon: Phone, label: 'Calls' },
    { id: 'files', icon: Files, label: 'Files' },
    { id: 'queues', icon: List, label: 'Queues' },
    { id: 'apps', icon: Grid3x3, label: 'Apps' },
    { id: 'more', icon: MoreHorizontal, label: 'More' },
  ];

  return (
    <div className="w-16 bg-gray-100 border-r border-gray-200 flex flex-col items-center py-2">
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`w-12 h-12 rounded-lg flex items-center justify-center mb-1 transition-colors group relative ${
              isActive 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
            title={item.label}
          >
            <Icon size={20} />
            {isActive && (
              <div className="absolute left-0 w-1 h-8 bg-indigo-600 rounded-r-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;