import React from 'react';

interface AnalyticsDonutChartProps {
  total: number;
  segments: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  onSegmentClick?: (segmentIndex: number, segment: { label: string; value: number; color: string }) => void;
}

// Analytics donut chart component with Microsoft design system
const AnalyticsDonutChart: React.FC<AnalyticsDonutChartProps> = ({ 
  total, 
  segments, 
  size = 200,
  strokeWidth = 12,
  onSegmentClick
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  let cumulativePercentage = 0;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          
          {segments.map((segment, index) => {
            const percentage = (segment.value / total) * 100;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((cumulativePercentage / 100) * circumference);
            
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 cursor-pointer hover:opacity-80"
                onClick={() => onSegmentClick?.(index, segment)}
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{total}</span>
          <span className="text-sm text-gray-600">Total Calls</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 mt-6 w-full">
        {segments.map((segment, index) => {
          const percentage = Math.round((segment.value / total) * 100);
          return (
            <div 
              key={index} 
              className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              onClick={() => onSegmentClick?.(index, segment)}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-gray-700">{segment.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{segment.value}</span>
                <span className="text-gray-500">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsDonutChart;