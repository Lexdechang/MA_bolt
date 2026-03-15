import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Phone, 
  Clock, 
  User, 
  MessageSquare, 
  FileText, 
  ExternalLink,
  Edit,
  X,
  Check,
  Pencil
} from 'lucide-react';

interface CallDetailsPageProps {
  call: any;
  onBack: () => void;
}

// Call details page component matching the provided design
const CallDetailsPage: React.FC<CallDetailsPageProps> = ({ call, onBack }) => {
  const [notes, setNotes] = useState('');
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [tagValue, setTagValue] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTagColor = (tag: string) => {
    if (tag.includes('VIP')) return 'bg-orange-100 text-orange-800';
    if (tag.includes('Callback')) return 'bg-orange-100 text-orange-800';
    if (tag.includes('Knowledge')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-700';
  };

  const isEditableTag = (tag: string) => {
    return tag.includes('Knowledge gap');
  };

  const handleTagEdit = (tag: string) => {
    setEditingTag(tag);
    setTagValue(tag);
  };

  const handleTagSave = () => {
    // Save logic here
    setEditingTag(null);
    setTagValue('');
  };

  const handleTagCancel = () => {
    setEditingTag(null);
    setTagValue('');
  };
  const suggestedActions = [
    {
      icon: <Phone size={16} />,
      text: 'Call back now',
      primary: true
    },
    {
      icon: <User size={16} />,
      text: 'Assign to team member',
      primary: false
    },
    {
      icon: <MessageSquare size={16} />,
      text: 'Send SMS update',
      primary: false
    }
  ];

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <Star size={16} className="text-red-500 fill-current" />
              <h1 className="text-xl font-semibold text-gray-900">{call.callerName}</h1>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <span>{call.phoneNumber}</span>
          <span>Sentiment: {call.sentiment}</span>
          <span>Duration: {call.duration}</span>
        </div>

        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(call.priority)}`}>
          {call.priority.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Tags */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Tags</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">
              Edit
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {call.tags.map((tag: string, index: number) => (
              <div key={index} className="relative">
                {editingTag === tag ? (
                  <div className="inline-flex items-center space-x-1 px-3 py-1 text-sm rounded-full bg-blue-50 border-2 border-blue-300">
                    <input
                      type="text"
                      value={tagValue}
                      onChange={(e) => setTagValue(e.target.value)}
                      className="bg-transparent border-none outline-none text-blue-800 placeholder-blue-400 min-w-0 flex-1"
                      autoFocus
                    />
                    <button
                      onClick={handleTagSave}
                      className="p-1 hover:bg-blue-200 rounded-full"
                    >
                      <Check size={12} className="text-green-600" />
                    </button>
                    <button
                      onClick={handleTagCancel}
                      className="p-1 hover:bg-blue-200 rounded-full"
                    >
                      <X size={12} className="text-red-600" />
                    </button>
                  </div>
                ) : (
                  <span
                    className={`inline-flex items-center px-3 py-1 text-sm rounded-full ${getTagColor(tag)} ${
                      isEditableTag(tag) 
                        ? 'cursor-pointer hover:shadow-md transition-all duration-200 border-2 border-dashed border-blue-300 relative' 
                        : ''
                    }`}
                    onClick={() => isEditableTag(tag) && handleTagEdit(tag)}
                  >
                    {tag.includes('VIP') && '👑 '}
                    {tag.includes('Callback') && '📞 '}
                    {tag.includes('Knowledge') && '🔍 '}
                    {tag}
                    {isEditableTag(tag) && (
                      <Pencil size={12} className="ml-1 text-blue-600 opacity-70" />
                    )}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call Summary */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Call Summary</h3>
          <p className="text-gray-700 leading-relaxed">{call.summary}</p>
        </div>

        {/* Suggested Follow-ups */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Suggested follow-ups</h3>
          <div className="space-y-3">
            {suggestedActions.map((action, index) => (
              <button
                key={index}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  action.primary
                    ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  action.primary ? 'bg-indigo-600 text-white' : 'bg-gray-600 text-white'
                }`}>
                  {action.icon}
                </div>
                <span className="font-medium text-gray-900">{action.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FileText size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">View full transcript</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              <ExternalLink size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Log to CRM</span>
            </button>
          </div>
        </div>

        {/* Notes & Tags */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Notes & Tags</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this call..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default CallDetailsPage;