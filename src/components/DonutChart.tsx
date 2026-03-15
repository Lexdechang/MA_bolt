import React from 'react';

interface DonutChartProps {
  total: number;
  segments: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
}

// Simple donut chart component for data visualization
const DonutChart: React.FC<DonutChartProps> = ({ 
  total, 
  segments, 
  size = 120,
  strokeWidth = 8 
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
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{total}</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-1 mt-4">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <div 
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-gray-600">{segment.label}</span>
            <span className="font-semibold text-gray-900">{segment.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;