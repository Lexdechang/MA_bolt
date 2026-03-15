import React from 'react';
import { Users, MoreHorizontal } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'active' | 'away' | 'busy' | 'offline';
  workspace?: string;
}

interface TeamPanelProps {
  title: string;
  description: string;
  members: TeamMember[];
  totalCount?: number;
  onViewAll?: () => void;
}

// Team panel component showing team members and their status
const TeamPanel: React.FC<TeamPanelProps> = ({
  title,
  description,
  members,
  totalCount,
  onViewAll
}) => {
  const statusColors = {
    active: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-400'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-md border border-indigo-200">
              Agents
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200">
              Users
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="flex items-center space-x-3">
              <div className="relative">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColors[member.status]} rounded-full border border-white`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.workspace || member.role}</p>
              </div>
              
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal size={14} className="text-gray-400" />
              </button>
            </div>
          ))}
        </div>
        
        {totalCount && totalCount > members.length && (
          <button 
            onClick={onViewAll}
            className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            All {totalCount} agents →
          </button>
        )}
      </div>
    </div>
  );
};

export default TeamPanel;