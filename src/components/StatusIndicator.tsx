import React from 'react';

type StatusType = 'unresolved' | 'in-progress' | 'resolved' | 'urgent';

interface StatusIndicatorProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

// Status indicator component with color-coded dots
const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  size = 'md',
  showLabel = false 
}) => {
  const statusConfig = {
    unresolved: { color: 'bg-red-500', label: 'Unresolved' },
    'in-progress': { color: 'bg-yellow-500', label: 'In Progress' },
    resolved: { color: 'bg-green-500', label: 'Resolved' },
    urgent: { color: 'bg-red-600', label: 'Urgent' }
  };
  
  const sizeConfig = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };
  
  const config = statusConfig[status];
  
  return (
    <div className="flex items-center space-x-2">
      <div className={`rounded-full ${config.color} ${sizeConfig[size]}`} />
      {showLabel && (
        <span className="text-xs text-gray-600">{config.label}</span>
      )}
    </div>
  );
};

export default StatusIndicator;