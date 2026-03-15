import React from 'react';
import { 
  Shield, 
  Mic, 
  Target, 
  Users, 
  DollarSign, 
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  score: number;
  status: 'good' | 'needs-attention' | 'critical';
  trend: 'up' | 'down' | 'stable';
  description: string;
  category: 'core' | 'specialized';
}

interface MetricsGridProps {
  metrics: Record<string, any>;
  onMetricClick: (metricId: string) => void;
}

// Metrics grid displaying 10 key performance indicators
const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics, onMetricClick }) => {
  const getMetricIcon = (metricId: string) => {
    const iconProps = { size: 20 };
    
    switch (metricId) {
      case 'reliability':
        return <Shield {...iconProps} />;
      case 'voiceQuality':
        return <Mic {...iconProps} />;
      case 'taskSuccess':
        return <Target {...iconProps} />;
      case 'satisfaction':
        return <Users {...iconProps} />;
      case 'cost':
        return <DollarSign {...iconProps} />;
      case 'brand':
        return <Star {...iconProps} />;
      case 'escalation':
        return <TrendingUp {...iconProps} />;
      case 'hallucination':
        return <AlertTriangle {...iconProps} />;
      case 'knowledge':
        return <CheckCircle {...iconProps} />;
      case 'rejection':
        return <Clock {...iconProps} />;
      default:
        return <Shield {...iconProps} />;
    }
  };

  const getMetricName = (metricId: string) => {
    const names: Record<string, string> = {
      reliability: 'Reliability',
      voiceQuality: 'Voice Quality',
      taskSuccess: 'Task Success Rate',
      satisfaction: 'User Satisfaction',
      cost: 'Cost Efficiency',
      brand: 'Brand Alignment',
      escalation: 'Escalation Rate',
      hallucination: 'Hallucination Detection',
      knowledge: 'Knowledge Gap',
      rejection: 'Rejection Rate'
    };
    return names[metricId] || metricId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-attention':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'needs-attention':
        return <AlertTriangle size={16} className="text-orange-600" />;
      case 'critical':
        return <AlertTriangle size={16} className="text-red-600" />;
      default:
        return <Minus size={16} className="text-gray-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
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

  const isProblematic = (status: string) => {
    return status === 'needs-attention' || status === 'critical';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(metrics).map(([metricId, data]) => (
          <div
            key={metricId}
            onClick={() => isProblematic(data.status) && onMetricClick(metricId)}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              getStatusColor(data.status)
            } ${
              isProblematic(data.status) 
                ? 'cursor-pointer hover:shadow-md transform hover:-translate-y-1' 
                : 'cursor-default'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getMetricIcon(metricId)}
                {getStatusIcon(data.status)}
              </div>
              {getTrendIcon(data.trend)}
            </div>
            
            <div className="mb-2">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {data.score}
              </div>
              <h4 className="text-sm font-medium text-gray-700">
                {getMetricName(metricId)}
              </h4>
            </div>
            
            {isProblematic(data.status) && (
              <div className="text-xs text-gray-600 mt-2">
                Click to analyze →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;