import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface AlertCardProps {
  title: string;
  count: number;
  severity: 'critical' | 'warning' | 'info' | 'resolved';
  trend?: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
    period: string;
  };
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Alert card component for displaying key metrics and alerts
const AlertCard: React.FC<AlertCardProps> = ({
  title,
  count,
  severity,
  trend,
  icon,
  onClick,
  className = ''
}) => {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'critical':
        return 'border-red-200 bg-red-50 hover:bg-red-100';
      case 'warning':
        return 'border-orange-200 bg-orange-50 hover:bg-orange-100';
      case 'info':
        return 'border-blue-200 bg-blue-50 hover:bg-blue-100';
      case 'resolved':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      default:
        return 'border-gray-200 bg-white hover:bg-gray-50';
    }
  };

  const getSeverityColor = () => {
    switch (severity) {
      case 'critical':
        return 'text-red-600';
      case 'warning':
        return 'text-orange-600';
      case 'info':
        return 'text-blue-600';
      case 'resolved':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp size={16} className="text-red-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-green-500" />;
      case 'stable':
        return <Minus size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer min-w-[280px] ${getSeverityStyles()} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg bg-white ${getSeverityColor()}`}>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center space-x-1 text-sm">
            {getTrendIcon()}
            <span className={trend.direction === 'up' ? 'text-red-600' : trend.direction === 'down' ? 'text-green-600' : 'text-gray-600'}>
              {trend.percentage}%
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
          {count.toLocaleString()}
        </div>
        <h3 className="text-sm font-medium text-gray-700" style={{ fontSize: '0.9em' }}>
          {title}
        </h3>
      </div>
      
      {trend && (
        <div className="text-xs text-gray-500">
          vs {trend.period}
        </div>
      )}
    </div>
  );
};

export default AlertCard;