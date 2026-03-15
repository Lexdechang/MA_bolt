import React from 'react';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  height?: number;
  title?: string;
}

// Simple bar chart component for key options visualization
const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  maxValue, 
  height = 200,
  title 
}) => {
  const max = maxValue || Math.max(...data.map(d => d.value));
  
  return (
    <div className="w-full">
      {title && (
        <h4 className="text-sm font-medium text-gray-600 mb-4">{title}</h4>
      )}
      
      <div 
        className="flex items-end space-x-3 justify-center"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / max) * (height - 40);
          
          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={`w-8 ${item.color || 'bg-indigo-500'} rounded-t transition-all duration-300`}
                style={{ height: `${barHeight}px` }}
              />
              <span className="text-xs text-gray-600 font-medium">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default BarChart;