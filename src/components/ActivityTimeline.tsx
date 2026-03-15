import React from 'react';
import { AlertTriangle, CheckCircle, Clock, FileText, Users } from 'lucide-react';

interface TimelineItem {
  id: string;
  type: 'warning' | 'success' | 'info' | 'action';
  title: string;
  description: string;
  timestamp: string;
  tags?: string[];
  priority?: 'high' | 'medium' | 'low';
}

interface ActivityTimelineProps {
  items: TimelineItem[];
  title?: string;
}

// Activity timeline component showing chronological events
const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ 
  items, 
  title = "Recent Activity" 
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={16} className="text-orange-500" />;
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'action':
        return <FileText size={16} className="text-blue-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">Here's an overview of the latest activity towards this objective</p>
      </div>
      
      <div className="p-4 space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon(item.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    {item.priority && (
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority === 'high' ? 'Needs attention' : item.priority}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  
                  {item.tags && (
                    <div className="flex items-center space-x-2 mt-2">
                      {item.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <span className="text-xs text-gray-500 ml-4">{item.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;