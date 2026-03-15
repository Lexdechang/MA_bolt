import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  description: string;
  type?: 'success' | 'warning' | 'info' | 'neutral';
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

// Summary card component for displaying key insights and recommendations
const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  description,
  type = 'neutral',
  icon,
  actionText,
  onAction
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-orange-200 bg-orange-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-orange-600" size={20} />;
      case 'info':
        return <TrendingUp className="text-blue-600" size={20} />;
      default:
        return <Clock className="text-gray-600" size={20} />;
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${getTypeStyles()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          {icon || getDefaultIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
          
          {actionText && onAction && (
            <button
              onClick={onAction}
              className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {actionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;