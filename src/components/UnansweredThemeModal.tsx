import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';

interface ThemeQuery {
  id: string;
  company: string;
  query: string;
  timestamp: string;
}

interface UnansweredThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  queries: ThemeQuery[];
}

// Modal for displaying unanswered theme queries with knowledge base update
const UnansweredThemeModal: React.FC<UnansweredThemeModalProps> = ({
  isOpen,
  onClose,
  theme,
  queries
}) => {
  const [showKnowledgeUpdate, setShowKnowledgeUpdate] = useState(false);
  const [knowledgeContent, setKnowledgeContent] = useState('');

  if (!isOpen) return null;

  const getPrePopulatedContent = (theme: string) => {
    switch (theme) {
      case 'International Wire Transfers':
        return `Based on recent call patterns, customers frequently ask about international wire transfers. Here's what the agent should know:

1. Common scenarios:
   - Business wire transfers ($50,000+ to Germany, UK, Japan)
   - Personal remittances to Mexico, Philippines, India
   - Urgent same-day transfers to London office
   - Tracking delayed transfers and status updates

2. Step-by-step resolution:
   - Verify customer identity and account standing
   - Confirm beneficiary details and SWIFT codes
   - Explain fees: $25-45 domestic, $45-65 international
   - Processing times: 1-3 business days international
   - Daily limits: $100,000 for business, $25,000 personal

3. Required documentation:
   - Purpose of transfer (business invoice, personal support)
   - Beneficiary bank details and address
   - Compliance forms for transfers over $10,000

4. When to escalate:
   - Transfers over $100,000
   - Suspicious activity patterns
   - Compliance red flags
   - Technical system errors

5. Common issues and solutions:
   - Incorrect SWIFT codes: Verify with beneficiary bank
   - Delayed transfers: Check correspondent bank relationships
   - Currency conversion: Explain exchange rates and timing
   - Rejected transfers: Review compliance requirements`;
      
      case 'Complex Investment Products':
        return `Investment product inquiries require specialized knowledge:

1. Common questions:
   - Structured products and derivatives
   - Alternative investments (REITs, commodities)
   - Tax implications of investment strategies
   - Portfolio rebalancing and asset allocation

2. Agent response guidelines:
   - Acknowledge the complexity of the inquiry
   - Gather basic information about investment goals
   - Schedule consultation with investment advisor
   - Provide general educational resources

3. Escalation triggers:
   - Specific product recommendations requested
   - Tax advice needed
   - Portfolio analysis required
   - Regulatory compliance questions`;

      default:
        return `Based on recent call patterns, customers frequently ask about ${theme.toLowerCase()}. Here's what the agent should know:

1. Common scenarios and questions
2. Step-by-step resolution process
3. Required documentation or information
4. When to escalate to specialists
5. Compliance considerations`;
    }
  };

  const handleUpdateKnowledgeBase = () => {
    setShowKnowledgeUpdate(true);
    setKnowledgeContent(getPrePopulatedContent(theme));
  };

  const handleSaveKnowledge = () => {
    // Here you would typically save to the knowledge base
    console.log('Saving knowledge base update:', {
      theme,
      content: knowledgeContent
    });
    setShowKnowledgeUpdate(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{theme}</h2>
            <div className="flex items-center space-x-2 mt-2 text-gray-300">
              <span>Dashboard</span>
              <span>&gt;</span>
              <span>Unanswered Themes</span>
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
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {!showKnowledgeUpdate ? (
            <div className="space-y-6">
              {/* Update Knowledge Base Button */}
              <button
                onClick={handleUpdateKnowledgeBase}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FileText size={16} />
                <span>Update Knowledge Base</span>
              </button>

              {/* Queries List */}
              <div className="space-y-4">
                {queries.map((query) => (
                  <div key={query.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {query.company}
                      </h3>
                      <span className="text-gray-500 text-sm">
                        {query.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {query.query}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Knowledge Base Update Form */
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Update Knowledge Base</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme Category
                </label>
                <input
                  type="text"
                  value={theme}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Knowledge Article Title
                </label>
                <input
                  type="text"
                  value={`How to handle ${theme.toLowerCase()}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Knowledge Content
                </label>
                <textarea
                  value={knowledgeContent}
                  onChange={(e) => setKnowledgeContent(e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowKnowledgeUpdate(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveKnowledge}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Knowledge Base
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnansweredThemeModal;