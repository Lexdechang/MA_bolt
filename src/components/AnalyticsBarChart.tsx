import React from 'react';

interface AnalyticsBarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  height?: number;
  title?: string;
  showValues?: boolean;
}

// Analytics bar chart component with Microsoft design system
const AnalyticsBarChart: React.FC<AnalyticsBarChartProps> = ({ 
  data, 
  maxValue, 
  height = 200,
  title,
  showValues = true
}) => {
  const max = maxValue || Math.max(...data.map(d => d.value));
  
  return (
    <div className="w-full">
      {title && (
        <h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
      )}
      
      <div 
        className="flex items-end space-x-4 justify-center"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / max) * (height - 60);
          
          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="relative">
                <div
                  className={`w-12 ${item.color || 'bg-blue-500'} rounded-t transition-all duration-500 hover:opacity-80`}
                  style={{ height: `${barHeight}px` }}
                />
                {showValues && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs font-medium text-gray-700">
                      {item.value}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-4">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default AnalyticsBarChart;