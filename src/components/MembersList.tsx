import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone, Video } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  role: string;
  status: 'available' | 'in-call' | 'offline';
  statusMessage?: string;
  avatar?: string;
  category: 'leads' | 'admins';
}

interface MembersListProps {
  onBack: () => void;
}

// Members list component showing attendant managers and team leads
const MembersList: React.FC<MembersListProps> = ({ onBack }) => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const mockMembers: Member[] = [
    {
      id: '1',
      name: 'Keiko Tanaka',
      role: 'Team Lead',
      status: 'in-call',
      statusMessage: 'In a call for 34m',
      category: 'leads'
    },
    {
      id: '2',
      name: 'Joshua Vanburen',
      role: 'Senior Manager',
      status: 'in-call',
      statusMessage: 'In a call for 17m',
      category: 'leads'
    },
    {
      id: '3',
      name: 'Reta Taylor',
      role: 'Operations Lead',
      status: 'in-call',
      statusMessage: 'In a call for 2m',
      category: 'leads'
    },
    {
      id: '4',
      name: 'Miguel Silva',
      role: 'System Admin',
      status: 'available',
      statusMessage: 'Available',
      category: 'admins'
    },
    {
      id: '5',
      name: 'Kayo Miwa',
      role: 'Technical Admin',
      status: 'offline',
      statusMessage: 'Offline',
      category: 'admins'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'in-call':
        return 'bg-red-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-600';
      case 'in-call':
        return 'text-red-600';
      case 'offline':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const generateAvatar = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const leadsMembers = mockMembers.filter(member => member.category === 'leads');
  const adminsMembers = mockMembers.filter(member => member.category === 'admins');

  const handleChatClick = (member: Member) => {
    console.log('Initiating chat with:', member.name);
    // Handle chat initiation
  };

  const MemberItem: React.FC<{ member: Member }> = ({ member }) => (
    <div
      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors relative"
      onMouseEnter={() => setHoveredMember(member.id)}
      onMouseLeave={() => setHoveredMember(null)}
    >
      <div className="relative">
        {member.avatar ? (
          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xs">
              {generateAvatar(member.name)}
            </span>
          </div>
        )}
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(member.status)} rounded-full border border-white`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm">{member.name}</h4>
        <p className={`text-xs ${getStatusTextColor(member.status)}`}>
          {member.statusMessage}
        </p>
      </div>
      
      {/* Chat button on hover */}
      {hoveredMember === member.id && member.status === 'available' && (
        <button
          onClick={() => handleChatClick(member)}
          className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition-colors"
          title="Start chat"
        >
          <MessageCircle size={14} />
        </button>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
            <p className="text-sm text-gray-600">Attendant managers and administrators</p>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Leads Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-gray-900">▼ Leads</span>
            <span className="text-xs text-gray-500">({leadsMembers.length})</span>
          </div>
          <div className="space-y-1">
            {leadsMembers.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* Admins Section */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-gray-900">▼ Admins</span>
            <span className="text-xs text-gray-500">({adminsMembers.length})</span>
          </div>
          <div className="space-y-1">
            {adminsMembers.map((member) => (
              <MemberItem key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersList;