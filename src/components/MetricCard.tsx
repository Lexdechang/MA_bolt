import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  breakdown?: { label: string; value: string | number; color?: string }[];
  className?: string;
}

// Metric card component for displaying analytics data
const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle,
  breakdown,
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {subtitle && (
          <span className="text-sm text-gray-500">{subtitle}</span>
        )}
      </div>
      
      {breakdown && (
        <div className="mt-4 flex space-x-4">
          {breakdown.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {item.color && (
                <div className={`w-3 h-3 rounded-sm ${item.color}`} />
              )}
              <span className="text-xs text-gray-600">{item.label}</span>
              <span className="text-sm font-semibold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricCard;