import React from 'react';
import { Phone, User, Clock } from 'lucide-react';
import StatusIndicator from './StatusIndicator';

type CallStatus = 'unresolved' | 'in-progress' | 'resolved';

interface CallListItemProps {
  phoneNumber: string;
  caller?: string;
  status: CallStatus;
  timestamp: string;
  duration: string;
  mailbox: string;
  isUrgent?: boolean;
}

// Individual call list item component
const CallListItem: React.FC<CallListItemProps> = ({
  phoneNumber,
  caller,
  status,
  timestamp,
  duration,
  mailbox,
  isUrgent = false
}) => {
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
        {caller ? (
          <span className="text-white font-semibold text-sm">
            {caller.split(' ').map(n => n[0]).join('')}
          </span>
        ) : (
          <Phone className="text-white" size={16} />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-900">{caller || phoneNumber}</span>
          <Phone className="text-gray-400" size={14} />
          <StatusIndicator status={status} size="sm" />
        </div>
        <p className="text-sm text-gray-500 truncate">
          Forwarded to {mailbox}
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-sm text-gray-900">{timestamp}</p>
        <p className="text-xs text-gray-500">{duration}</p>
      </div>
    </div>
  );
};

export default CallListItem;