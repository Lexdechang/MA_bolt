import React from 'react';

interface PerformanceScoreProps {
  score: number;
  status: 'good' | 'needs-attention' | 'critical';
  title?: string;
  subtitle?: string;
}

// Circular performance score component
const PerformanceScore: React.FC<PerformanceScoreProps> = ({
  score,
  status,
  title = "Overall Agent Performance",
  subtitle
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return '#10B981';
      case 'needs-attention':
        return '#F97316';
      case 'critical':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'good':
        return 'PERFORMING WELL';
      case 'needs-attention':
        return 'NEEDS ATTENTION';
      case 'critical':
        return 'CRITICAL ISSUES';
      default:
        return 'UNKNOWN';
    }
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="relative inline-block mb-6">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={getStatusColor()}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{score}</span>
          <span className="text-sm font-medium mt-1" style={{ color: getStatusColor() }}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      {subtitle && (
        <p className="text-gray-600">{subtitle}</p>
      )}
    </div>
  );
};

export default PerformanceScore;