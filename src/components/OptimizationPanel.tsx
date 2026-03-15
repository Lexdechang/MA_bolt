import React from 'react';
import { ExternalLink, ArrowRight, AlertCircle } from 'lucide-react';

interface OptimizationOpportunity {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionText: string;
  actionUrl?: string;
  category: string;
}

interface OptimizationPanelProps {
  opportunities: OptimizationOpportunity[];
  onActionClick: (opportunityId: string) => void;
}

// Recommendations panel with prioritized improvement opportunities
const OptimizationPanel: React.FC<OptimizationPanelProps> = ({
  opportunities,
  onActionClick
}) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-orange-500 bg-orange-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getActionButtonColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'medium':
        return 'bg-orange-600 hover:bg-orange-700 text-white';
      case 'low':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
        <AlertCircle className="text-orange-600" size={20} />
        <h3 className="text-lg font-semibold text-gray-900">Optimization Opportunities</h3>
        <button className="ml-auto text-sm text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className={`border-l-4 rounded-r-lg p-4 ${getImpactColor(opportunity.impact)}`}
          >
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 mb-1">
                {opportunity.title}
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {opportunity.description}
              </p>
            </div>
            
            <button
              onClick={() => onActionClick(opportunity.id)}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${getActionButtonColor(opportunity.impact)}`}
            >
              <span>{opportunity.actionText}</span>
              {opportunity.actionUrl ? (
                <ExternalLink size={14} />
              ) : (
                <ArrowRight size={14} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimizationPanel;