import React from 'react';
import { X } from 'lucide-react';

interface SentimentCall {
  id: string;
  callerName: string;
  timestamp: string;
  feedback: string;
}

interface SentimentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sentiment: 'positive' | 'neutral' | 'negative';
  calls: SentimentCall[];
}

// Modal for displaying detailed sentiment analysis calls
const SentimentDetailModal: React.FC<SentimentDetailModalProps> = ({
  isOpen,
  onClose,
  sentiment,
  calls
}) => {
  if (!isOpen) return null;

  const getSentimentTitle = () => {
    switch (sentiment) {
      case 'positive':
        return 'Positive Sentiment Calls';
      case 'neutral':
        return 'Neutral Sentiment Calls';
      case 'negative':
        return 'Negative Sentiment Calls';
      default:
        return 'Sentiment Calls';
    }
  };

  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'neutral':
        return 'text-orange-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getIndicatorColor = () => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'neutral':
        return 'bg-orange-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{getSentimentTitle()}</h2>
            <div className="flex items-center space-x-2 mt-2 text-gray-300">
              <span>Dashboard</span>
              <span>&gt;</span>
              <span>Sentiment Analysis</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            {calls.map((call) => (
              <div key={call.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className={`w-3 h-3 ${getIndicatorColor()} rounded-full mt-2 flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {call.callerName}
                      </h3>
                      <span className="text-gray-500 text-sm">
                        {call.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {call.feedback}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentDetailModal;
