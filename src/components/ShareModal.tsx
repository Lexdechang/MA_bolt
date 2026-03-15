import React, { useState } from 'react';
import { X, Calendar, Users, User, Bot, ChevronDown, Share2, FileText } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDateRange: { start: Date; end: Date };
}

interface Recipient {
  id: string;
  name: string;
  email: string;
  type: 'individual' | 'group' | 'agent';
  avatar?: string;
}

// Share modal component with metrics selection and recipient options
const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  selectedDateRange
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['engagement']);
  const [customDateRange, setCustomDateRange] = useState(selectedDateRange);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [shareRawData, setShareRawData] = useState(false);
  const [recipientSearch, setRecipientSearch] = useState('');
  const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);

  if (!isOpen) return null;

  const categories = [
    {
      id: 'engagement',
      name: 'Engagement',
      description: 'Call volume, duration, and interaction patterns',
      metrics: ['Total Callers', 'Call Volume', 'Average Duration', 'Peak Hours']
    },
    {
      id: 'quality',
      name: 'Agent Quality',
      description: 'Performance scores, accuracy, and customer satisfaction',
      metrics: ['Escalation Rate', 'Tool Utilization', 'Conversation Quality', 'Voice Quality']
    },
    {
      id: 'insights',
      name: 'Conversational Insights',
      description: 'Sentiment analysis, knowledge gaps, and conversation patterns',
      metrics: ['Sentiment Analysis', 'Popular Topics', 'Complaint Drivers', 'Competitor Mentions']
    }
  ];

  const mockRecipients: Recipient[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      type: 'individual'
    },
    {
      id: '2',
      name: 'Marketing Team',
      email: 'marketing@company.com',
      type: 'group'
    },
    {
      id: '3',
      name: 'Customer Service Agents',
      email: 'cs-agents@company.com',
      type: 'group'
    },
    {
      id: '4',
      name: 'AI Assistant Bot',
      email: 'ai-bot@company.com',
      type: 'agent'
    },
    {
      id: '5',
      name: 'David Miller',
      email: 'david.miller@company.com',
      type: 'individual'
    },
    {
      id: '6',
      name: 'Analytics Team',
      email: 'analytics@company.com',
      type: 'group'
    }
  ];

  const filteredRecipients = mockRecipients.filter(recipient =>
    recipient.name.toLowerCase().includes(recipientSearch.toLowerCase()) ||
    recipient.email.toLowerCase().includes(recipientSearch.toLowerCase())
  );

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleRecipientToggle = (recipientId: string) => {
    setSelectedRecipients(prev =>
      prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleShare = () => {
    const shareData = {
      categories: selectedCategories,
      dateRange: customDateRange,
      recipients: selectedRecipients,
      includeRawData: shareRawData
    };
    
    console.log('Sharing analytics report:', shareData);
    
    // Here you would typically send the data to your backend
    // For now, we'll just close the modal
    onClose();
  };

  const getRecipientIcon = (type: string) => {
    switch (type) {
      case 'individual':
        return <User size={16} className="text-blue-600" />;
      case 'group':
        return <Users size={16} className="text-green-600" />;
      case 'agent':
        return <Bot size={16} className="text-purple-600" />;
      default:
        return <User size={16} className="text-gray-600" />;
    }
  };

  const getSelectedRecipientsText = () => {
    if (selectedRecipients.length === 0) return 'Select recipients...';
    if (selectedRecipients.length === 1) {
      const recipient = mockRecipients.find(r => r.id === selectedRecipients[0]);
      return recipient?.name || 'Unknown';
    }
    return `${selectedRecipients.length} recipients selected`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Share2 className="text-blue-600" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Share Analytics Report</h2>
              <p className="text-sm text-gray-600">Select metrics and recipients for sharing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          {/* Metrics Categories Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Metrics Categories</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCategories.includes(category.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {category.metrics.map((metric, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Date Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(customDateRange.start)}
                  onChange={(e) => setCustomDateRange(prev => ({
                    ...prev,
                    start: new Date(e.target.value)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(customDateRange.end)}
                  onChange={(e) => setCustomDateRange(prev => ({
                    ...prev,
                    end: new Date(e.target.value)
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Recipients Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share With</h3>
            <div className="relative">
              <button
                onClick={() => setShowRecipientDropdown(!showRecipientDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span className="text-gray-700">{getSelectedRecipientsText()}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {showRecipientDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search recipients..."
                      value={recipientSearch}
                      onChange={(e) => setRecipientSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredRecipients.map((recipient) => (
                      <div
                        key={recipient.id}
                        className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRecipientToggle(recipient.id)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedRecipients.includes(recipient.id)}
                          onChange={() => handleRecipientToggle(recipient.id)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-2 flex-1">
                          {getRecipientIcon(recipient.type)}
                          <div>
                            <p className="font-medium text-gray-900">{recipient.name}</p>
                            <p className="text-sm text-gray-600">{recipient.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Raw Data Toggle */}
          <div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="text-gray-600" size={20} />
                <div>
                  <h4 className="font-medium text-gray-900">Share Raw Data</h4>
                  <p className="text-sm text-gray-600">Include detailed data for deep dive analysis</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareRawData}
                  onChange={(e) => setShareRawData(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {selectedCategories.length} categories, {selectedRecipients.length} recipients selected
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              disabled={selectedCategories.length === 0 || selectedRecipients.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Share Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;