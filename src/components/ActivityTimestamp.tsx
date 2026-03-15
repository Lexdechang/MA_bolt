import React from 'react';
import { Clock, Calendar, ChevronDown } from 'lucide-react';

interface ActivityTimestampProps {
  timeRange: string;
  lastUpdated: string;
  showDatePicker?: boolean;
  selectedDateRange?: { start: Date; end: Date };
  onDateRangeChange?: (range: { start: Date; end: Date }) => void;
}

// Activity timestamp component with optional date picker
const ActivityTimestamp: React.FC<ActivityTimestampProps> = ({ 
  timeRange, 
  lastUpdated, 
  showDatePicker = false,
  selectedDateRange,
  onDateRangeChange 
}) => {
  const [isPickerOpen, setIsPickerOpen] = React.useState(false);
  const [tempStartDate, setTempStartDate] = React.useState('');
  const [tempEndDate, setTempEndDate] = React.useState('');

  // Calculate date constraints
  const today = new Date();
  const maxStartDate = new Date();
  maxStartDate.setDate(today.getDate() - 28);
  
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDateRange = (range: { start: Date; end: Date }) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      year: range.start.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    };
    
    const startStr = range.start.toLocaleDateString('en-US', options);
    const endStr = range.end.toLocaleDateString('en-US', options);
    
    return `${startStr} - ${endStr}`;
  };

  const handleApplyDateRange = () => {
    if (tempStartDate && tempEndDate && onDateRangeChange) {
      const start = new Date(tempStartDate);
      const end = new Date(tempEndDate);
      
      // Validate date range
      if (start <= end && start >= maxStartDate && end <= today) {
        onDateRangeChange({ start, end });
        setIsPickerOpen(false);
      }
    }
  };

  const handleCancel = () => {
    setIsPickerOpen(false);
    // Reset temp values
    if (selectedDateRange) {
      setTempStartDate(formatDateForInput(selectedDateRange.start));
      setTempEndDate(formatDateForInput(selectedDateRange.end));
    }
  };

  // Initialize temp dates when picker opens
  React.useEffect(() => {
    if (isPickerOpen && selectedDateRange) {
      setTempStartDate(formatDateForInput(selectedDateRange.start));
      setTempEndDate(formatDateForInput(selectedDateRange.end));
    }
  }, [isPickerOpen, selectedDateRange]);

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 relative">
      {showDatePicker ? (
        <div className="relative">
          <button
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-900">
              {selectedDateRange ? formatDateRange(selectedDateRange) : 'Select date range'}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* Date Picker Dropdown */}
          {isPickerOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 min-w-[320px]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={tempStartDate}
                    onChange={(e) => setTempStartDate(e.target.value)}
                    min={formatDateForInput(maxStartDate)}
                    max={formatDateForInput(today)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={tempEndDate}
                    onChange={(e) => setTempEndDate(e.target.value)}
                    min={tempStartDate || formatDateForInput(maxStartDate)}
                    max={formatDateForInput(today)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="text-xs text-gray-500">
                  You can select up to 28 days of historical data
                </div>
                
                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={handleCancel}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyDateRange}
                    disabled={!tempStartDate || !tempEndDate}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h2 className="text-lg font-semibold text-gray-900">Activity</h2>
      )}
      
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Clock size={14} />
        <span>updated {lastUpdated}</span>
      </div>
    </div>
  );
};

export default ActivityTimestamp;