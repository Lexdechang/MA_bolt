import React from 'react';
import { TrendingUp, Edit, MoreHorizontal, X } from 'lucide-react';

interface ObjectiveHeaderProps {
  title: string;
  owner: string;
  ownerAvatar?: string;
  status: string;
  description: string;
  onEdit?: () => void;
  onClose?: () => void;
  showMoreInfo?: boolean;
  onToggleInfo?: () => void;
}

// Objective header component for roadmap evaluation interface
const ObjectiveHeader: React.FC<ObjectiveHeaderProps> = ({
  title,
  owner,
  ownerAvatar,
  status,
  description,
  onEdit,
  onClose,
  showMoreInfo = false,
  onToggleInfo
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-indigo-600" size={16} />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {onEdit && (
            <button 
              onClick={onEdit}
              className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Edit
            </button>
          )}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-md text-sm">
            <span>{status}</span>
            <button className="text-yellow-600 hover:text-yellow-800">
              <MoreHorizontal size={14} />
            </button>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm text-gray-600">Owned by</span>
          <div className="flex items-center space-x-2">
            {ownerAvatar ? (
              <img src={ownerAvatar} alt={owner} className="w-5 h-5 rounded-full" />
            ) : (
              <div className="w-5 h-5 bg-gray-300 rounded-full" />
            )}
            <span className="text-sm font-medium text-gray-900">{owner}</span>
          </div>
          <span className="text-sm text-orange-600 font-medium">⚠️ Needs attention</span>
        </div>
        
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
        
        {onToggleInfo && (
          <button 
            onClick={onToggleInfo}
            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {showMoreInfo ? 'Show less' : 'Show more'} →
          </button>
        )}
      </div>
    </div>
  );
};

export default ObjectiveHeader;