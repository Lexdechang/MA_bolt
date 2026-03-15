import React from 'react';
import { TrendingUp, TrendingDown, Clock, Phone, Users, AlertTriangle } from 'lucide-react';
import BarChart from './BarChart';
import DonutChart from './DonutChart';

interface ThresholdMetric {
  id: string;
  name: string;
  currentValue: number;
  threshold: number;
  unit: string;
  severity: 'critical' | 'warning';
  description: string;
  trend: {
    direction: 'up' | 'down';
    percentage: number;
    period: string;
  };
  chartData?: any;
}

interface ThresholdExpansionProps {
  isExpanded: boolean;
  metrics: ThresholdMetric[];
}

// Threshold expansion component with detailed metrics and visualizations
const ThresholdExpansion: React.FC<ThresholdExpansionProps> = ({
  isExpanded,
  metrics
}) => {
  if (!isExpanded) return null;

  const getIcon = (metricName: string) => {
    if (metricName.includes('wait time')) return <Clock size={20} className="text-orange-600" />;
    if (metricName.includes('abandonment')) return <Phone size={20} className="text-red-600" />;
    if (metricName.includes('capacity')) return <Users size={20} className="text-yellow-600" />;
    return <TrendingUp size={20} className="text-gray-600" />;
  };

  const getSeverityColor = (severity: string) => {
    return severity === 'critical' ? 'text-red-600' : 'text-orange-600';
  };

  const getSeverityBg = (severity: string) => {
    return severity === 'critical' ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200';
  };

  // Sample chart data for different metrics
  const waitTimeData = [
    { label: '9AM', value: 0.8, color: 'bg-green-500' },
    { label: '10AM', value: 2.5, color: 'bg-yellow-500' },
    { label: '11AM', value: 4.2, color: 'bg-orange-500' },
    { label: '12PM', value: 5.5, color: 'bg-red-500' },
    { label: '1PM', value: 3.8, color: 'bg-orange-500' }
  ];

  const abandonmentData = {
    total: 100,
    segments: [
      { label: 'Completed', value: 88, color: '#16A34A' },
      { label: 'Abandoned', value: 12, color: '#DC2626' }
    ]
  };

  const capacityData = [
    { label: 'Available', value: 5, color: 'bg-green-500' },
    { label: 'In Use', value: 95, color: 'bg-red-500' }
  ];

  const getTrendIcon = (direction: string) => {
    return direction === 'up' ? 
      <TrendingUp className="text-red-500" size={16} /> : 
      <TrendingDown className="text-green-500" size={16} />;
  };

  const getChartLegend = (metricName: string) => {
    if (metricName.includes('wait time')) {
      return (
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Good (&lt;1min)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Fair (1-3min)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span>Poor (3-5min)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Critical (&gt;5min)</span>
          </div>
        </div>
      );
    }
    
    if (metricName.includes('abandonment')) {
      return (
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Completed Calls</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-600 rounded"></div>
            <span>Abandoned Calls</span>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Trend Alert Details</h3>
        
        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.id} className={`border rounded-lg p-6 ${getSeverityBg(metric.severity)}`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getIcon(metric.name)}
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{metric.name}</h4>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`text-3xl font-bold ${getSeverityColor(metric.severity)}`}>
                      {metric.currentValue}{metric.unit}
                    </span>
                    <AlertTriangle size={24} className={getSeverityColor(metric.severity)} />
                  </div>
                  <p className="text-sm text-gray-600">
                    Threshold: {metric.threshold}{metric.unit}
                  </p>
                </div>
              </div>

              {/* Combined Visualization and Trend Analysis */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Chart Visualization */}
                  <div className="lg:col-span-2">
                    <h5 className="font-medium text-gray-900 mb-4">Performance Visualization</h5>
                    
                    {metric.name.includes('wait time') && (
                      <div>
                        <BarChart
                          title="Hourly Wait Times"
                          data={waitTimeData}
                          maxValue={6}
                          height={180}
                        />
                        <div className="mt-3">
                          {getChartLegend(metric.name)}
                        </div>
                      </div>
                    )}
                    
                    {metric.name.includes('abandonment') && (
                      <div className="flex flex-col items-center">
                        <DonutChart
                          total={abandonmentData.total}
                          segments={abandonmentData.segments}
                          size={140}
                        />
                        <div className="mt-4">
                          {getChartLegend(metric.name)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Trend Analysis */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-3">Trend Analysis</h5>
                      <div className="flex items-center space-x-2 mb-2">
                        {getTrendIcon(metric.trend.direction)}
                        <span className={`font-semibold ${metric.trend.direction === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                          {metric.trend.percentage}% {metric.trend.direction === 'up' ? 'increase' : 'decrease'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">vs {metric.trend.period}</p>
                    </div>
                    
                    {/* Simplified Action Recommendations */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <h6 className="font-medium text-blue-900 mb-2">Quick Actions</h6>
                      <ul className="text-sm text-blue-800 space-y-1">
                        {metric.name.includes('wait time') && (
                          <>
                            <li>• Add more staff during peak hours</li>
                            <li>• Review call routing efficiency</li>
                            <li>• Enable callback options</li>
                          </>
                        )}
                        {metric.name.includes('abandonment') && (
                          <>
                            <li>• Offer transfer options</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThresholdExpansion;