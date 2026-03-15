import React, { useState } from 'react';
import { 
  Sidebar, 
  Header, 
  ActivityTimestamp,
  TabNavigation,
  QuickAccess,
  SearchFilter,
  CallListItem,
  DiagnosticScanner,
  PerformanceScore,
  MetricsGrid,
  OptimizationPanel,
  MetricDetailModal,
  FollowUpsList,
  CallDetailsPage,
  CopilotPanel,
  MembersList
} from '../components';
import AlertCard from '../components/AlertCard';
import ThresholdExpansion from '../components/ThresholdExpansion';
import { Voicemail, Phone, Calendar, TrendingUp, RefreshCw, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Active Alerts page for monitoring critical metrics and alerts
const ActiveAlerts: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('activity');
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('urgent');
  const [isThresholdExpanded, setIsThresholdExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Diagnostics state
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showOptimization, setShowOptimization] = useState(false);
  
  // Follow-ups state
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [showCopilot, setShowCopilot] = useState(false);
  const [showMembers, setShowMembers] = useState(false);

  // Tab configuration
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

  // Mock call data for the left panel
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

  // Mock alert data
  const alertsData = {
    voicemails: {
      count: 23,
      severity: 'critical' as const,
      trend: { direction: 'up' as const, percentage: 15, period: 'last hour' },
      items: [
        {
          id: '1',
          title: 'Patient callback - John Smith',
          description: 'Urgent medication refill request, left voicemail 2 hours ago',
          timestamp: '2 hours ago',
          priority: 'high' as const,
          status: 'unresolved' as const,
          type: 'voicemail' as const
        },
        {
          id: '2',
          title: 'Insurance inquiry - Sarah Johnson',
          description: 'Questions about coverage for upcoming procedure',
          timestamp: '3 hours ago',
          priority: 'medium' as const,
          status: 'unresolved' as const,
          type: 'voicemail' as const
        },
        {
          id: '3',
          title: 'Appointment rescheduling - Mike Davis',
          description: 'Needs to reschedule due to emergency',
          timestamp: '4 hours ago',
          priority: 'high' as const,
          status: 'unresolved' as const,
          type: 'voicemail' as const
        }
      ]
    },
    followups: {
      count: 8,
      severity: 'warning' as const,
      trend: { direction: 'stable' as const, percentage: 0, period: 'last hour' },
      items: [
        {
          id: '4',
          title: 'Lab results discussion - Emma Wilson',
          description: 'Follow-up required for abnormal test results',
          timestamp: '1 hour ago',
          priority: 'high' as const,
          status: 'in-progress' as const,
          type: 'followup' as const
        },
        {
          id: '5',
          title: 'Treatment plan review - Robert Brown',
          description: 'Patient has questions about new medication',
          timestamp: '2 hours ago',
          priority: 'medium' as const,
          status: 'unresolved' as const,
          type: 'followup' as const
        }
      ]
    },
    appointments: {
      count: 12,
      severity: 'info' as const,
      trend: { direction: 'up' as const, percentage: 8, period: 'last hour' },
      items: [
        {
          id: '6',
          title: 'New patient consultation - Lisa Anderson',
          description: 'First-time visit scheduled for next week',
          timestamp: '30 minutes ago',
          priority: 'medium' as const,
          status: 'resolved' as const,
          type: 'appointment' as const
        },
        {
          id: '7',
          title: 'Follow-up appointment - David Miller',
          description: 'Post-surgery check-up scheduled',
          timestamp: '1 hour ago',
          priority: 'low' as const,
          status: 'resolved' as const,
          type: 'appointment' as const
        }
      ]
    },
    thresholds: {
      count: 2,
      severity: 'critical' as const,
      trend: { direction: 'up' as const, percentage: 25, period: 'last hour' },
      items: [
        {
          id: '8',
          title: 'Average wait time exceeded',
          description: 'Current wait time: 45 minutes (threshold: 30 minutes)',
          timestamp: '15 minutes ago',
          priority: 'high' as const,
          status: 'unresolved' as const,
          type: 'threshold' as const
        },
        {
          id: '9',
          title: 'Call abandonment rate high',
          description: 'Current rate: 12% (threshold: 8%)',
          timestamp: '30 minutes ago',
          priority: 'high' as const,
          status: 'unresolved' as const,
          type: 'threshold' as const
        }
      ]
    }
  };

  // Mock optimization opportunities
  const optimizationOpportunities = [
    {
      id: 'hallucination',
      title: 'Hallucination Detection',
      description: 'Agent occasionally provides incorrect information or goes off-topic',
      impact: 'high' as const,
      actionText: 'Report to Microsoft',
      category: 'Safety'
    },
    {
      id: 'knowledge-gap',
      title: 'Knowledge Gap',
      description: 'See unanswered themes and update knowledge base',
      impact: 'medium' as const,
      actionText: 'Open Knowledge Report',
      category: 'Knowledge'
    },
    {
      id: 'rejection-rate',
      title: 'Rejection Rate',
      description: 'View unfulfilled task list and connect with more tools',
      impact: 'medium' as const,
      actionText: 'Open Rejection Report',
      category: 'Performance'
    }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleAlertClick = (alertType: string) => {
    if (alertType === 'thresholds') {
      setIsThresholdExpanded(!isThresholdExpanded);
    }
    // Other alert types are no longer clickable
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScanResults(null);
  };

  const handleScanComplete = (results: any) => {
    setIsScanning(false);
    setScanResults(results);
    setShowOptimization(true);
  };

  const handleMetricClick = (metricId: string) => {
    setSelectedMetric(metricId);
  };

  const handleOptimizationAction = (opportunityId: string) => {
    // Handle optimization actions
    console.log('Taking action for:', opportunityId);
  };

  const handleFollowUpsClick = () => {
    setShowFollowUps(true);
  };

  const handleCallSelect = (call: any) => {
    setSelectedCall(call);
    setShowCopilot(true);
  };

  const handleBackToFollowUps = () => {
    setSelectedCall(null);
    setShowCopilot(false);
  };

  const handleBackToMain = () => {
    setShowFollowUps(false);
    setSelectedCall(null);
    setShowCopilot(false);
    setShowMembers(false);
    setShowMembers(false);
  };

  const handleMembersClick = () => {
    setShowMembers(true);
  };

  const getPerformanceStatus = (score: number) => {
    if (score >= 80) return 'good';
    if (score >= 60) return 'needs-attention';
    return 'critical';
  };

  // Mock threshold metrics data
  const thresholdMetrics = [
    {
      id: '1',
      name: 'Average wait time',
      currentValue: 5.5,
      threshold: 5,
      unit: ' min',
      severity: 'critical' as const,
      description: 'Callers are waiting longer to get transferred than acceptable limits',
      trend: {
        direction: 'up' as const,
        percentage: 25,
        period: 'last hour'
      }
    },
    {
      id: '2',
      name: 'Call abandonment rate',
      currentValue: 12,
      threshold: 8,
      unit: '%',
      severity: 'critical' as const,
      description: 'Percentage of callers hanging up in the middle of a conversation',
      trend: {
        direction: 'up' as const,
        percentage: 15,
        period: 'last hour'
      }
    }
  ];

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar activeItem={activeTab} onItemClick={setActiveTab} />
      
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
              <h3 className="text-sm font-medium text-gray-900 mb-3">Manage attendant</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => {
                      setShowFollowUps(false);
                      setShowMembers(false);
                    }}
                    className="text-sm text-gray-700 hover:text-indigo-600 hover:underline transition-colors"
                  >
                    Voicemail
                  </button>
                  <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">5</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                <button 
                  onClick={handleFollowUpsClick}
                  className="text-sm text-gray-700 hover:text-indigo-600 hover:underline transition-colors"
                >
                  Follow-ups
                </button>
                  <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">8</span>
                  </div>
                </div>
                <button 
                  onClick={handleMembersClick}
                  onClick={handleMembersClick}
                  className="text-sm text-gray-700 hover:text-indigo-600 hover:underline transition-colors"
                >
                  Member
                </button>
              </div>
            </div>
            
            {showFollowUps ? (
              <FollowUpsList
                onCallSelect={handleCallSelect}
                onBack={handleBackToMain}
              />
            ) : showMembers ? (
              <MembersList
                onBack={handleBackToMain}
              />
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Main Content */}
          <div className={`flex-1 overflow-y-auto ${showCopilot ? 'flex' : ''}`}>
            {selectedCall ? (
              <div className="flex-1">
                <CallDetailsPage
                  call={selectedCall}
                  onBack={handleBackToFollowUps}
                />
              </div>
            ) : (
              <div className="flex-1">
            {/* Diagnostics Section */}
            <div className="bg-white border-b border-gray-200">
              <div className="flex">
                {/* Main Diagnostics Area */}
                <div className="flex-1">
                  <div className="p-6 space-y-6">
                    {!scanResults ? (
                      <DiagnosticScanner
                        onScanComplete={handleScanComplete}
                        isScanning={isScanning}
                        onStartScan={handleStartScan}
                      />
                    ) : (
                      <>
                        <PerformanceScore
                          score={scanResults.overallScore}
                          status={getPerformanceStatus(scanResults.overallScore)}
                          subtitle="Your agent has several areas requiring optimization"
                        />
                        
                        <MetricsGrid
                          metrics={scanResults.metrics}
                          onMetricClick={handleMetricClick}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Right Panel - Optimization Opportunities */}
                {showOptimization && scanResults && (
                  <div className="w-80 border-l border-gray-200">
                    <OptimizationPanel
                      opportunities={optimizationOpportunities}
                      onActionClick={handleOptimizationAction}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Activity Section */}
            <div className="bg-gray-50">
              <ActivityTimestamp 
                timeRange="Real-time monitoring"
                lastUpdated="30s ago"
              />
              
              <div className="p-6 space-y-6">
                {/* First Row: Voicemails, Follow-ups, Appointments */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AlertCard
                    title="Unresolved Voicemails"
                    count={alertsData.voicemails.count}
                    severity={alertsData.voicemails.severity}
                    trend={alertsData.voicemails.trend}
                    icon={<Voicemail size={20} />}
                    className="cursor-default"
                  />
                  
                  <AlertCard
                    title="Calls Requiring Follow-ups"
                    count={alertsData.followups.count}
                    severity={alertsData.followups.severity}
                    trend={alertsData.followups.trend}
                    icon={<Phone size={20} />}
                    className="cursor-default"
                  />
                  
                  <AlertCard
                    title="Appointments Booked"
                    count={alertsData.appointments.count}
                    severity={alertsData.appointments.severity}
                    trend={alertsData.appointments.trend}
                    icon={<Calendar size={20} />}
                    className="cursor-default"
                  />
                </div>

                {/* Second Row: Threshold Alerts (Clickable) */}
                <AlertCard
                  title="Trend Alerts"
                  count={alertsData.thresholds.count}
                  severity={alertsData.thresholds.severity}
                  trend={alertsData.thresholds.trend}
                  icon={<TrendingUp size={20} />}
                  onClick={() => handleAlertClick('thresholds')}
                  className="w-full"
                />

                {/* Threshold Expansion */}
                <ThresholdExpansion
                  isExpanded={isThresholdExpanded}
                  metrics={thresholdMetrics}
                />
              </div>
            </div>
          </div>
            )}
            
            {/* Copilot Panel */}
            {showCopilot && (
              <CopilotPanel
                isOpen={showCopilot}
                onClose={() => setShowCopilot(false)}
              />
            )}
          </div>
        </div>
        
        {/* Metric Detail Modal */}
        {selectedMetric && scanResults && (
          <MetricDetailModal
            isOpen={!!selectedMetric}
            onClose={() => setSelectedMetric(null)}
            metricId={selectedMetric}
            metricData={scanResults.metrics[selectedMetric]}
          />
        )}
      </div>
    </div>
  );
};

export default ActiveAlerts;