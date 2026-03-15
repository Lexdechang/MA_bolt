import React, { useState } from 'react';
import { Send, Paperclip, Smile, MoreHorizontal } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
}

interface ChatInterfaceProps {
  messages?: ChatMessage[];
  placeholder?: string;
  onSendMessage?: (message: string) => void;
}

// Chat interface component for agent communication
const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages = [],
  placeholder = "Send a private message",
  onSendMessage
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {messages.length > 0 && (
        <div className="p-4 border-b border-gray-200 max-h-64 overflow-y-auto">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  msg.isOwn 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${
                    msg.isOwn ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={1}
            />
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip size={16} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Smile size={16} className="text-gray-600" />
            </button>
            <button 
              onClick={handleSend}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;