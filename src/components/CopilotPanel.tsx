import React, { useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';

interface CopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Copilot panel component for AI assistance
const CopilotPanel: React.FC<CopilotPanelProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'assistant' as const,
      content: 'What can I help with?',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: '2',
      type: 'assistant' as const,
      content: 'Ask me about call insights, customer patterns, or get help with follow-up actions.',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'assistant' as const,
        content: 'I can help you analyze this call and suggest the best follow-up actions. Based on the call details, I recommend prioritizing the callback since this is a VIP customer with an investment inquiry.',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">C</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Copilot</h3>
            <div className="flex items-center space-x-1 text-xs text-orange-600">
              <span>⚠️</span>
              <span>AI generated content may be incorrect</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.type === 'user' ? 'text-indigo-200' : 'text-gray-500'
                }`}
              >
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message Copilot"
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 rounded-full transition-colors"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopilotPanel;