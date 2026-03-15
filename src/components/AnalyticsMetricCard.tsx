import React from 'react';
import { TrendingUp, TrendingDown, Minus, ExternalLink, Info } from 'lucide-react';
import BarChart from './BarChart';

interface TrendDataPoint {
  day: string;
  value: number;
}

interface AnalyticsMetricCardProps {
  id: string;
  title: string;
  value: string;
  subtitle?: string;
  status: 'good' | 'warning' | 'critical' | 'info';
  trend?: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
  hasDetails?: boolean;
  onClick?: () => void;
  trendData?: TrendDataPoint[];
  showMiniChart?: boolean;
}

// Analytics metric card component with Microsoft design system
const AnalyticsMetricCard: React.FC<AnalyticsMetricCardProps> = ({
  id,
  title,
  value,
  subtitle,
  status,
  trend,
  hasDetails = false,
  onClick,
  trendData,
  showMiniChart = false
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'good':
        return 'border-l-green-500 bg-green-50 hover:bg-green-100';
      case 'warning':
        return 'border-l-orange-500 bg-orange-50 hover:bg-orange-100';
      case 'critical':
        return 'border-l-red-500 bg-red-50 hover:bg-red-100';
      case 'info':
        return 'border-l-blue-500 bg-blue-50 hover:bg-blue-100';
      default:
        return 'border-l-gray-300 bg-white hover:bg-gray-50';
    }
  };

  const getStatusIndicator = () => {
    switch (status) {
      case 'good':
        return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      case 'warning':
        return <div className="w-2 h-2 bg-orange-500 rounded-full" />;
      case 'critical':
        return <div className="w-2 h-2 bg-red-500 rounded-full" />;
      case 'info':
        return <div className="w-2 h-2 bg-blue-500 rounded-full" />;
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    switch (trend.direction) {
      case 'up':
        return <TrendingUp size={14} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={14} className="text-red-500" />;
      case 'stable':
        return <Minus size={14} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    if (!trend) return '';
    
    switch (trend.direction) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return '';
    }
  };

  // Convert trend data to bar chart format
  const convertToBarData = (data: TrendDataPoint[]) => {
    return data.map(point => ({
      label: point.day,
      value: point.value,
      color: 'bg-blue-500'
    }));
  };

  return (
    <div
      className={`border-l-4 rounded-r-lg p-4 transition-all duration-200 cursor-pointer min-h-[120px] ${
        getStatusStyles()
      } ${hasDetails ? 'hover:shadow-md transform hover:-translate-y-1' : ''}`}
      onClick={hasDetails ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getStatusIndicator()}
          <button className="p-1 hover:bg-white hover:bg-opacity-50 rounded-full">
            <Info size={14} className="text-gray-500" />
          </button>
        </div>
        {trend && (
          <div className="flex items-center space-x-1">
            {getTrendIcon()}
            <span className={`text-sm font-medium ${getTrendColor()}`}>
              {trend.percentage}%
            </span>
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Segoe UI, sans-serif' }}>
          {value}
        </div>
        <h3 className="text-sm font-medium text-gray-700 leading-tight">
          {title}
        </h3>
      </div>
      
      {subtitle && (
        <p className="text-xs text-gray-600 mb-2">
          {subtitle}
        </p>
      )}
      
      {showMiniChart && trendData && (
        <div className="mt-3">
          <BarChart
            data={convertToBarData(trendData)}
            height={60}
            showValues={false}
          />
        </div>
      )}
      
      {hasDetails && (
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500">Click for details</span>
          <ExternalLink size={12} className="text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default AnalyticsMetricCard;