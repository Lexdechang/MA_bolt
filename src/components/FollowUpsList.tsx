import React, { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';

interface FollowUpCall {
  id: string;
  callerName: string;
  phoneNumber: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  duration: string;
  summary: string;
  tags: string[];
}

interface FollowUpsListProps {
  onCallSelect: (call: FollowUpCall) => void;
  onBack: () => void;
}

// Follow-ups list component showing prioritized calls requiring attention
const FollowUpsList: React.FC<FollowUpsListProps> = ({ onCallSelect, onBack }) => {

  const mockFollowUps: FollowUpCall[] = [
    {
      id: '1',
      callerName: 'Mary Johnson',
      phoneNumber: '+1 (555) 345-6789',
      priority: 'critical',
      timestamp: '2h 14m ago',
      duration: '5:20',
      summary: 'VIP customer investment inquiry needs specialist follow-up',
      tags: ['VIP Customer', 'Callback promised', 'Knowledge gap']
    },
    {
      id: '2',
      callerName: 'Richard Davis',
      phoneNumber: '+1 (555) 678-9012',
      priority: 'high',
      timestamp: '7h 14m ago',
      duration: '2:30',
      summary: 'Billing dispute requires manager review and callback',
      tags: ['Billing', 'Manager Review', 'Callback promised']
    },
    {
      id: '3',
      callerName: 'Amanda Thompson',
      phoneNumber: '+1 (555) 567-1234',
      priority: 'medium',
      timestamp: '4h 14m ago',
      duration: '4:15',
      summary: 'Product feature request needs product team consultation',
      tags: ['Feature Request', 'Product Team']
    },
    {
      id: '4',
      callerName: 'Kevin Rodriguez',
      phoneNumber: '+1 (555) 678-9012',
      priority: 'medium',
      timestamp: '5h 14m ago',
      duration: '1:45',
      summary: 'Account upgrade questions, needs sales team follow-up',
      tags: ['Sales', 'Account Upgrade']
    },
    {
      id: '5',
      callerName: 'Carol Lewis',
      phoneNumber: '+1 (555) 901-2345',
      priority: 'medium',
      timestamp: '8h 14m ago',
      duration: '2:15',
      summary: 'Insurance inquiry needs follow-up',
      tags: ['Insurance', 'Follow-up']
    },
    {
      id: '6',
      callerName: 'Frank Allen',
      phoneNumber: '+1 (555) 234-5678',
      priority: 'medium',
      timestamp: '3h 14m ago',
      duration: '1:30',
      summary: 'Technical support question',
      tags: ['Technical Support']
    },
    {
      id: '7',
      callerName: 'John Smith',
      phoneNumber: '+1 (555) 234-5678',
      priority: 'medium',
      timestamp: '3h 14m ago',
      duration: '2:45',
      summary: 'Account verification needed',
      tags: ['Account', 'Verification']
    },
    {
      id: '8',
      callerName: 'Helen Jackson',
      phoneNumber: '+1 (555) 345-6789',
      priority: 'high',
      timestamp: '14h 14m ago',
      duration: '4:20',
      summary: 'Urgent billing issue requires attention',
      tags: ['Billing', 'Urgent']
    }
  ];

  const getPriorityStarColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-500 fill-current';
      case 'high':
        return 'text-orange-500 fill-current';
      case 'medium':
        return 'text-yellow-500 fill-current';
      default:
        return 'text-gray-400 fill-current';
    }
  };

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
            <h2 className="text-lg font-semibold text-gray-900">Follow-ups Required</h2>
            <p className="text-sm text-gray-600">Calls requiring your attention</p>
          </div>
        </div>
      </div>

      {/* Calls List */}
      <div className="flex-1 overflow-y-auto">
        {mockFollowUps.map((call) => (
          <div
            key={call.id}
            onClick={() => onCallSelect(call)}
            className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              {/* Priority Star */}
              <div className="flex-shrink-0">
                <Star size={16} className={getPriorityStarColor(call.priority)} />
              </div>

              {/* Call Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm">{call.callerName}</h3>
                <p className="text-sm text-gray-600">{call.phoneNumber}</p>
              </div>
              
              {/* Timestamp */}
              <div className="flex-shrink-0 text-right">
                <span className="text-sm text-gray-500">{call.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUpsList;