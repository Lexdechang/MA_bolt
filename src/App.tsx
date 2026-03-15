import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import QuickAccess from './components/QuickAccess';
import SearchFilter from './components/SearchFilter';
import CallListItem from './components/CallListItem';
import ActivityTimestamp from './components/ActivityTimestamp';
import MetricCard from './components/MetricCard';
import DonutChart from './components/DonutChart';
import BarChart from './components/BarChart';
import { BarChart3, Users } from 'lucide-react';
import AgentActivity from './pages/AgentActivity';
import ActiveAlerts from './pages/ActiveAlerts';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

// Main App Content Component
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('urgent');

  // Map routes to sidebar items
  const getActiveTabFromRoute = (pathname: string) => {
    switch (pathname) {
      case '/activity':
        return 'activity';
      case '/queues':
        return 'queues';
      case '/agents':
        return 'teams';
      case '/chat':
        return 'chat';
      case '/calendar':
        return 'calendar';
      case '/calls':
        return 'calls';
      case '/files':
        return 'files';
      case '/apps':
        return 'apps';
      default:
        return 'activity';
    }
  };

  const handleSidebarNavigation = (item: string) => {
    switch (item) {
      case 'activity':
        navigate('/activity');
        break;
      case 'queues':
        navigate('/queues');
        break;
      case 'teams':
        navigate('/agents');
        break;
      case 'chat':
        navigate('/chat');
        break;
      case 'calendar':
        navigate('/calendar');
        break;
      case 'calls':
        navigate('/calls');
        break;
      case 'files':
        navigate('/files');
        break;
      case 'apps':
        navigate('/apps');
        break;
      case 'more':
        // Handle more menu
        break;
      default:
        navigate('/activity');
    }
  };

  const tabs = [
    { id: 'queues', label: 'Queues' },
    { id: 'woodland1', label: 'Woodland bank queue 1' },
    { id: 'woodland-aa1', label: 'Woodland bank AA 1', active: true }
  ];

  const filterTabs = [
    { id: 'urgent', label: 'Urgent' },
    { id: 'unassigned', label: 'Unassigned' },
    { id: 'mailbox-a', label: 'Mailbox A' }
  ];

  const quickAccessItems = [
    { 
      id: 'overview', 
      label: 'Woodland bank AA 1 overview', 
      icon: <BarChart3 className="text-indigo-600" size={16} /> 
    }
  ];

  const mockCalls = [
    {
      phoneNumber: '+1 (465) 551-4615',
      status: 'unresolved' as const,
      timestamp: '12:30 p.m.',
      duration: '1hr 30m',
      mailbox: 'mailbox A'
    },
    {
      phoneNumber: '+1 (465) 551-4615',
      status: 'unresolved' as const,
      timestamp: '12:30 p.m.',
      duration: '1hr 30m',
      mailbox: 'mailbox A'
    },
    {
      phoneNumber: '+1 (465) 551-4615',
      status: 'unresolved' as const,
      timestamp: '12:30 p.m.',
      duration: '1hr 30m',
      mailbox: 'mailbox B'
    },
    {
      phoneNumber: '+1 (465) 551-4615',
      status: 'in-progress' as const,
      timestamp: '12:30 p.m.',
      duration: '1hr 30m',
      mailbox: 'mailbox A'
    },
    {
      phoneNumber: '+1 (263) 952-6921',
      caller: 'Mikhail Kotov',
      status: 'in-progress' as const,
      timestamp: '12:30 p.m.',
      duration: '1hr 30m',
      mailbox: 'mailbox B'
    }
  ];

  const donutData = {
    total: 25,
    segments: [
      { label: 'External', value: 15, color: '#374151' },
      { label: 'Internal', value: 10, color: '#6366f1' }
    ]
  };

  const barChartData = [
    { label: '1', value: 30, color: 'bg-indigo-500' },
    { label: '2', value: 40, color: 'bg-indigo-500' },
    { label: '3', value: 35, color: 'bg-indigo-500' },
    { label: '#', value: 42, color: 'bg-indigo-500' },
    { label: 'Others', value: 38, color: 'bg-indigo-500' }
  ];

  const QueueManagement = () => (
    <div className="h-screen flex bg-gray-50">
      <Sidebar 
        activeItem={getActiveTabFromRoute(location.pathname)} 
        onItemClick={handleSidebarNavigation} 
      />
      
      <div className="flex-1 flex flex-col">
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />
        
        <TabNavigation 
          tabs={tabs} 
          activeTab="woodland-aa1"
          onTabChange={() => {}}
        />
        
        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <QuickAccess 
              title="Quick access"
              items={quickAccessItems}
            />
            
            <div className="p-4 bg-white border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Manage auto attendant</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-700">Voicemail</span>
                  <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                </div>
                <span className="text-sm text-gray-700">Follow-ups</span>
                <span className="text-sm text-gray-500">Member</span>
              </div>
            </div>
            
            <SearchFilter
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              tabs={filterTabs}
              activeTab={activeFilter}
              onTabChange={setActiveFilter}
            />
            
            <div className="flex-1 overflow-y-auto">
              {mockCalls.map((call, index) => (
                <CallListItem
                  key={index}
                  phoneNumber={call.phoneNumber}
                  caller={call.caller}
                  status={call.status}
                  timestamp={call.timestamp}
                  duration={call.duration}
                  mailbox={call.mailbox}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <ActivityTimestamp 
              timeRange="Last 12 hours"
              lastUpdated="3m ago"
            />
            
            <div className="p-6 space-y-6">
              {/* Top Row Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  title="Total call volume"
                  value="25"
                  breakdown={[
                    { label: 'External', value: '15', color: 'bg-gray-700' },
                    { label: 'Internal', value: '10', color: 'bg-indigo-500' }
                  ]}
                />
                <MetricCard
                  title="Ongoing calls"
                  value="65"
                />
                <MetricCard
                  title="Abandoned calls"
                  value="2"
                />
              </div>

              {/* Second Row Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                  title="Average time in auto attendant"
                  value="15s"
                />
                <MetricCard
                  title="Average caller action count"
                  value="1"
                />
                <MetricCard
                  title="Total system-initiated disconnects"
                  value="30"
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Total callers</h3>
                  <DonutChart
                    total={donutData.total}
                    segments={donutData.segments}
                  />
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <BarChart
                    title="Key options selected"
                    data={barChartData}
                    maxValue={50}
                  />
                </div>
              </div>

              {/* Bottom placeholders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Call resolution destination</h3>
                  <div className="text-gray-400 text-center py-8">Chart placeholder</div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-600 mb-4">Appointments completion</h3>
                  <div className="text-gray-400 text-center py-8">Chart placeholder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Placeholder components for other routes
  const PlaceholderPage = ({ title }: { title: string }) => (
    <div className="h-screen flex bg-gray-50">
      <Sidebar 
        activeItem={getActiveTabFromRoute(location.pathname)} 
        onItemClick={handleSidebarNavigation} 
      />
      <div className="flex-1 flex flex-col">
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">This section is coming soon.</p>
            <button
              onClick={() => navigate('/activity')}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Go to Active Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/activity" replace />} />
      <Route path="/activity" element={<ActiveAlerts />} />
      <Route path="/queues" element={<QueueManagement />} />
      <Route path="/agents" element={<AgentActivity />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
      <Route path="/chat" element={<PlaceholderPage title="Chat" />} />
      <Route path="/calendar" element={<PlaceholderPage title="Calendar" />} />
      <Route path="/calls" element={<PlaceholderPage title="Calls" />} />
      <Route path="/files" element={<PlaceholderPage title="Files" />} />
      <Route path="/apps" element={<PlaceholderPage title="Apps" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;