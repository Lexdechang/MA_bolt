import React from 'react';
import { MessageCircle, Phone, Video, MoreHorizontal, Circle } from 'lucide-react';

interface AgentCardProps {
  name: string;
  role: string;
  avatar?: string;
  status: 'active' | 'away' | 'busy' | 'offline';
  statusMessage?: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

// Agent card component showing agent details and status
const AgentCard: React.FC<AgentCardProps> = ({
  name,
  role,
  avatar,
  status,
  statusMessage,
  isExpanded = false,
  onToggleExpand
}) => {
  const statusColors = {
    active: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-400'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3">
        <div className="relative">
          {avatar ? (
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors[status]} rounded-full border-2 border-white`} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
          {statusMessage && (
            <p className="text-xs text-gray-500 mt-1">{statusMessage}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MessageCircle size={16} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone size={16} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video size={16} className="text-gray-600" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={onToggleExpand}
          >
            <MoreHorizontal size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;