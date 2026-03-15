import React from 'react';
import { FileText, Calendar, Users, MoreHorizontal } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'document' | 'calendar' | 'team' | 'other';
  lastModified?: string;
  owner?: string;
}

interface AssetsListProps {
  title: string;
  assets: Asset[];
  onAssetClick?: (assetId: string) => void;
}

// Assets list component for displaying related documents and resources
const AssetsList: React.FC<AssetsListProps> = ({
  title,
  assets,
  onAssetClick
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText size={16} className="text-blue-600" />;
      case 'calendar':
        return <Calendar size={16} className="text-green-600" />;
      case 'team':
        return <Users size={16} className="text-purple-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-3">
          {assets.map((asset) => (
            <div 
              key={asset.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
              onClick={() => onAssetClick?.(asset.id)}
            >
              <div className="flex-shrink-0">
                {getIcon(asset.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{asset.name}</p>
                {asset.lastModified && (
                  <p className="text-xs text-gray-500">Modified {asset.lastModified}</p>
                )}
              </div>
              
              <button className="p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal size={14} className="text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssetsList;