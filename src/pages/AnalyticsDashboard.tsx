import React, { useState } from 'react';
import { 
  Sidebar, 
  Header, 
  ActivityTimestamp 
} from '../components';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Phone, 
  MessageSquare, 
  Star, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3, 
  PieChart, 
  Share, 
  Download,
  ChevronDown,
  ChevronUp,
  Info,
  ExternalLink,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnalyticsMetricCard from '../components/AnalyticsMetricCard';
import AnalyticsDonutChart from '../components/AnalyticsDonutChart';
import AnalyticsBarChart from '../components/AnalyticsBarChart';
import MetricDetailModal from '../components/MetricDetailModal';
import SentimentDetailModal from '../components/SentimentDetailModal';
import ShareModal from '../components/ShareModal';

// Analytics Dashboard page with three main sections
const AnalyticsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState<{ start: Date; end: Date }>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7); // Default to last 7 days
    return { start, end };
  });
  const [expandedSections, setExpandedSections] = useState({
    engagement: true,
    quality: true,
    insights: true
  });
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedMetricData, setSelectedMetricData] = useState<any>(null);
  const [sentimentModalOpen, setSentimentModalOpen] = useState(false);
  const [selectedSentiment, setSelectedSentiment] = useState<'positive' | 'neutral' | 'negative'>('negative');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [showKnowledgeUpdate, setShowKnowledgeUpdate] = useState(false);
  const [knowledgeContent, setKnowledgeContent] = useState('');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleDateRangeChange = (range: { start: Date; end: Date }) => {
    setSelectedDateRange(range);
    // Here you would typically refetch data for the new date range
    console.log('Date range changed:', range);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleMetricClick = (metricId: string, data: any) => {
    setSelectedMetric(metricId);
    setSelectedMetricData(data);
  };

  const handleSentimentSegmentClick = (segmentIndex: number, segment: any) => {
    // Map segment to sentiment type
    const sentimentMap: Record<string, 'positive' | 'neutral' | 'negative'> = {
      'Positive': 'positive',
      'Neutral': 'neutral',
      'Negative': 'negative'
    };
    
    const sentimentType = sentimentMap[segment.label];
    if (sentimentType) {
      setSelectedSentiment(sentimentType);
      setSentimentModalOpen(true);
    }
  };

  const handleThemeClick = (theme: string) => {
    setSelectedTheme(theme);
    setThemeModalOpen(true);
    setShowKnowledgeUpdate(false);
    
    // Pre-populate knowledge content based on theme
    if (theme === 'International Wire Transfers') {
      setKnowledgeContent(`Based on recent call patterns, customers frequently ask about international wire transfers. Here's what the agent should know:

1. Common scenarios:
   - Wire transfer fees and processing times
   - Required documentation (SWIFT codes, beneficiary details)
   - Daily and monthly transfer limits
   - Currency conversion rates and fees

2. Step-by-step resolution:
   - Verify customer identity and account standing
   - Collect all required transfer information
   - Explain fees upfront (typically $15-45 for outgoing wires)
   - Provide estimated delivery timeframes (1-5 business days)
   - Issue confirmation number and tracking details

3. Common issues and solutions:
   - Missing SWIFT codes: Direct to beneficiary bank website
   - Transfer delays: Check for compliance holds or missing info
   - Fee disputes: Explain correspondent bank charges
   - Currency restrictions: Refer to current OFAC guidelines

4. Escalation triggers:
   - Transfers over $10,000 (compliance review)
   - Sanctioned countries or entities
   - Suspicious activity patterns
   - Technical system errors

5. Required documentation:
   - Government-issued ID
   - Beneficiary bank details (name, address, SWIFT)
   - Purpose of transfer (business/personal)
   - Source of funds verification for large amounts`);
    }
  };

  const getThemeQueries = (theme: string) => {
    switch (theme) {
      case 'International Wire Transfers':
        return [
          {
            id: '1',
            company: 'Global Manufacturing Corp',
            query: 'Need to send $50,000 wire transfer to our supplier in Germany. What are the fees and how long will it take?',
            timestamp: '3:15 PM'
          },
          {
            id: '2',
            company: 'Tech Solutions Ltd',
            query: 'Our wire transfer to Japan has been delayed for 3 days. Can you help track the status?',
            timestamp: '2:28 PM'
          },
          {
            id: '3',
            company: 'Import Export Inc',
            query: 'What are the daily limits for international wire transfers? We need to send multiple payments today.',
            timestamp: '1:52 PM'
          },
          {
            id: '4',
            company: 'Maria Rodriguez',
            query: 'I need to send money to my family in Mexico. What documents do I need for a $5,000 transfer?',
            timestamp: '12:45 PM'
          },
          {
            id: '5',
            company: 'Financial Services Group',
            query: 'Urgent: Need to expedite a wire transfer to our London office. Is same-day processing available?',
            timestamp: '11:30 AM'
          }
        ];
      case 'Complex Investment Products':
        return [
          {
            id: '1',
            company: 'Retirement Planning LLC',
            query: 'Client asking about structured products and tax implications for their portfolio.',
            timestamp: '2:45 PM'
          },
          {
            id: '2',
            company: 'Wealth Management Co',
            query: 'Need information on alternative investments like REITs and commodities.',
            timestamp: '1:30 PM'
          }
        ];
      default:
        return [
          {
            id: '1',
            company: 'Sample Company',
            query: `Question related to ${theme.toLowerCase()}`,
            timestamp: '2:00 PM'
          }
        ];
    }
  };

  const handleUpdateKnowledgeBase = () => {
    setShowKnowledgeUpdate(true);
  };

  const handleKnowledgeSubmit = () => {
    // Handle knowledge base update
    console.log('Updating knowledge base with:', knowledgeContent);
    setThemeModalOpen(false);
    setShowKnowledgeUpdate(false);
  };

  const handleShareClick = () => {
    setShareModalOpen(true);
  };

  const handleKnowledgeCancel = () => {
    setShowKnowledgeUpdate(false);
  };

  // Mock analytics data
  const engagementMetrics = [
    {
      id: 'total-callers',
      title: 'Total Callers (MA)',
      value: '250',
      subtitle: 'Inbound: 125 | Outbound: 35',
      status: 'good' as const,
      trend: { direction: 'up' as const, percentage: 12 },
      hasDetails: false,
      showMiniChart: true,
      trendData: [
        { day: 'Mon', value: 220 },
        { day: 'Tue', value: 235 },
        { day: 'Wed', value: 210 },
        { day: 'Thu', value: 245 },
        { day: 'Fri', value: 250 },
        { day: 'Sat', value: 240 },
        { day: 'Sun', value: 250 }
      ]
    },
    {
      id: 'call-volume',
      title: 'Total Call Volume',
      value: '260',
      subtitle: 'Inbound: 185 | Outbound: 75',
      status: 'good' as const,
      trend: { direction: 'up' as const, percentage: 8 },
      hasDetails: false,
      showMiniChart: true,
      trendData: [
        { day: 'Mon', value: 240 },
        { day: 'Tue', value: 255 },
        { day: 'Wed', value: 230 },
        { day: 'Thu', value: 265 },
        { day: 'Fri', value: 260 },
        { day: 'Sat', value: 250 },
        { day: 'Sun', value: 260 }
      ]
    },
    {
      id: 'avg-call-duration',
      title: 'Average Call Duration',
      value: '4:32',
      subtitle: 'Within target range',
      status: 'good' as const,
      trend: { direction: 'stable' as const, percentage: 0 },
      hasDetails: false
    },
    {
      id: 'peak-hours',
      title: 'Peak Hours Activity',
      value: '10-12 PM',
      subtitle: '45% of daily volume',
      status: 'info' as const,
      hasDetails: false
    }
  ];

  const qualityMetrics = [
    {
      id: 'escalation-rate',
      title: 'Escalation Rate',
      value: '8%',
      subtitle: 'Within acceptable range',
      status: 'good' as const,
      trend: { direction: 'down' as const, percentage: 2 },
      hasDetails: false
    },
    {
      id: 'tool-utilization-rate',
      title: 'Tool Utilization Rate',
      value: '38%',
      subtitle: 'Tools actively used',
      status: 'critical' as const,
      trend: { direction: 'down' as const, percentage: 8 },
      hasDetails: true
    },
    {
      id: 'conversation-flow-quality',
      title: 'Conversation Flow Quality',
      value: '82%',
      subtitle: 'Natural conversation patterns',
      status: 'good' as const,
      trend: { direction: 'up' as const, percentage: 5 },
      hasDetails: false
    },
    {
      id: 'p50-latency',
      title: 'P50 Latency (median)',
      value: '1.2s',
      subtitle: 'Response time',
      status: 'good' as const,
      trend: { direction: 'down' as const, percentage: 8 },
      hasDetails: false
    }
  ];

  const expandedQualityMetrics = [
    {
      id: 'instruction-following',
      title: 'Instruction Following',
      value: '91%',
      subtitle: 'Adherence to guidelines',
      status: 'good' as const,
      trend: { direction: 'up' as const, percentage: 3 },
      hasDetails: false
    },
    {
      id: 'unique-tools-invoked',
      title: 'Unique Tools Invoked',
      value: '12',
      subtitle: 'Different tools used',
      status: 'info' as const,
      hasDetails: false
    },
    {
      id: 'total-tools-invocation',
      title: 'Total Tools Invocation',
      value: '247',
      subtitle: 'Total tool calls',
      status: 'info' as const,
      trend: { direction: 'up' as const, percentage: 15 },
      hasDetails: false
    },
    {
      id: 'rejection-rate',
      title: 'Rejection Rate',
      value: '5%',
      subtitle: 'Requests declined',
      status: 'warning' as const,
      trend: { direction: 'up' as const, percentage: 12 },
      hasDetails: true
    },
    {
      id: 'knowledge-assisted-engagement',
      title: 'Knowledge Assisted Engagement',
      value: '68%',
      subtitle: 'KB utilization rate',
      status: 'good' as const,
      trend: { direction: 'up' as const, percentage: 7 },
      hasDetails: false
    },
    {
      id: 'calls-resolved-by-transfer',
      title: '# of Calls Resolved by Transfer',
      value: '34',
      subtitle: 'Successful transfers',
      status: 'info' as const,
      hasDetails: false
    },
    {
      id: 'conversation-quality-score',
      title: 'Conversation Quality Score',
      value: '78%',
      subtitle: 'Below target (85%)',
      status: 'warning' as const,
      trend: { direction: 'down' as const, percentage: 5 },
      hasDetails: true
    },
    {
      id: 'hallucination-detection',
      title: 'Hallucination Detection',
      value: '3',
      subtitle: 'Detected instances today',
      status: 'warning' as const,
      trend: { direction: 'up' as const, percentage: 15 },
      hasDetails: true
    },
    {
      id: 'voice-quality',
      title: 'Voice Quality',
      value: '94%',
      subtitle: 'Audio clarity score',
      status: 'good' as const,
      trend: { direction: 'stable' as const, percentage: 0 },
      hasDetails: false
    },
    {
      id: 'agent-accuracy',
      title: 'Agent Accuracy Rate',
      value: '94%',
      subtitle: 'Information accuracy',
      status: 'good' as const,
      trend: { direction: 'stable' as const, percentage: 0 },
      hasDetails: false
    }
  ];

  const [showExpandedQuality, setShowExpandedQuality] = useState(false);

  const toggleExpandedQuality = () => {
    setShowExpandedQuality(!showExpandedQuality);
  };

  const sentimentData = {
    total: 847,
    segments: [
      { label: 'Positive', value: 424, color: '#4CAF50' },
      { label: 'Neutral', value: 279, color: '#FF9800' },
      { label: 'Negative', value: 144, color: '#f44336' }
    ]
  };

  const competitorData = {
    total: 47,
    segments: [
      { label: 'Chase Bank', value: 18, color: '#1f77b4' },
      { label: 'Bank of America', value: 12, color: '#ff7f0e' },
      { label: 'Wells Fargo', value: 10, color: '#2ca02c' },
      { label: 'Citibank', value: 7, color: '#d62728' }
    ]
  };

  const popularTopics = [
    { topic: 'Account Balance Inquiries', count: 156, description: 'balance checks and statements' },
    { topic: 'Credit Card Applications', count: 134, description: 'new card requests and approvals' },
    { topic: 'Loan Information', count: 98, description: 'mortgage and personal loans' },
    { topic: 'Investment Advice', count: 87, description: 'portfolio and retirement planning' },
    { topic: 'Mobile Banking Support', count: 76, description: 'app issues and features' }
  ];

  const complaintDrivers = [
    { driver: 'Long Wait Times', count: 89, description: 'customers waiting too long for service' },
    { driver: 'Fee Disputes', count: 67, description: 'overdraft and service fee complaints' },
    { driver: 'Card Declined Issues', count: 54, description: 'legitimate transactions being blocked' },
    { driver: 'Online Banking Problems', count: 43, description: 'login and functionality issues' },
    { driver: 'Interest Rate Concerns', count: 38, description: 'rate changes and explanations' }
  ];

  // Mock sentiment call data
  const sentimentCalls = {
    positive: [
      {
        id: '1',
        callerName: 'Sarah Johnson',
        timestamp: '3:45 PM',
        feedback: 'Excellent service! The agent was very helpful and resolved my issue quickly.'
      },
      {
        id: '2',
        callerName: 'David Miller',
        timestamp: '2:15 PM',
        feedback: 'Great experience, very professional and knowledgeable staff.'
      }
    ],
    neutral: [
      {
        id: '3',
        callerName: 'Emily Davis',
        timestamp: '4:20 PM',
        feedback: 'The service was okay, got what I needed but nothing exceptional.'
      },
      {
        id: '4',
        callerName: 'Robert Wilson',
        timestamp: '1:30 PM',
        feedback: 'Standard service, no complaints but nothing stood out.'
      }
    ],
    negative: [
      {
        id: '5',
        callerName: 'Michael Chen',
        timestamp: '2:32 PM',
        feedback: 'Very frustrated with billing issues, took too long to resolve.'
      },
      {
        id: '6',
        callerName: 'Lisa Wang',
        timestamp: '1:33 PM',
        feedback: 'Poor service quality, had to repeat myself multiple times.'
      },
      {
        id: '7',
        callerName: 'John Martinez',
        timestamp: '12:45 PM',
        feedback: "Agent couldn't understand my issue at all."
      }
    ]
  };
  const unansweredThemes = [
    { theme: 'Complex Investment Products', count: 23, color: 'bg-red-500' },
    { theme: 'Regulatory Compliance Questions', count: 18, color: 'bg-orange-500' },
    { theme: 'International Wire Transfers', count: 15, color: 'bg-yellow-500' },
    { theme: 'Business Account Setup', count: 12, color: 'bg-blue-500' },
    { theme: 'Estate Planning Services', count: 9, color: 'bg-purple-500' }
  ];

  const topUnresolvedQuestions = [
    { question: 'How to integrate with third-party APIs?', category: 'Technical', count: 23 },
    { question: 'What are the enterprise licensing options?', category: 'Licensing', count: 18 },
    { question: 'GDPR compliance requirements?', category: 'Compliance', count: 15 },
    { question: 'Data migration best practices?', category: 'Migration', count: 12 },
    { question: 'Custom development timeline?', category: 'Development', count: 9 }
  ];

  const SectionHeader: React.FC<{
    title: string;
    subtitle: string;
    isExpanded: boolean;
    onToggle: () => void;
    icon: React.ReactNode;
  }> = ({ title, subtitle, isExpanded, onToggle, icon }) => (
    <div 
      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onToggle}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Info size={16} className="text-gray-500" />
        </button>
        {isExpanded ? (
          <ChevronUp className="text-gray-500" size={20} />
        ) : (
          <ChevronDown className="text-gray-500" size={20} />
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        
        {/* Main Dashboard Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <BarChart3 className="text-blue-600" size={28} />
                  <span>Analytics Dashboard</span>
                </h1>
                <p className="text-gray-600">Real-time performance metrics and insights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleShareClick}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Share size={16} />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ActivityTimestamp
            timeRange=""
            lastUpdated="2m ago"
            showDatePicker={true}
            selectedDateRange={selectedDateRange}
            onDateRangeChange={handleDateRangeChange}
          />
          
          <div className="p-6 space-y-8">
            {/* Engagement Section */}
            <div className="space-y-4">
              <SectionHeader
                title="Engagement"
                subtitle="Call volume, duration, and interaction patterns"
                isExpanded={expandedSections.engagement}
                onToggle={() => toggleSection('engagement')}
                icon={<Users className="text-blue-600" size={20} />}
              />
              
              {expandedSections.engagement && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {engagementMetrics.map((metric) => (
                    <AnalyticsMetricCard
                      key={metric.id}
                      {...metric}
                      onClick={metric.hasDetails ? () => handleMetricClick(metric.id, metric) : undefined}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Agent Quality Section */}
            <div className="space-y-4">
              <SectionHeader
                title="Agent Quality"
                subtitle="Performance scores, accuracy, and customer satisfaction"
                isExpanded={expandedSections.quality}
                onToggle={() => toggleSection('quality')}
                icon={<Star className="text-blue-600" size={20} />}
              />
              
              {expandedSections.quality && (
                <div className="space-y-6">
                  {/* Primary Quality Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {qualityMetrics.map((metric) => (
                      <AnalyticsMetricCard
                        key={metric.id}
                        {...metric}
                        onClick={() => handleMetricClick(metric.id, metric)}
                      />
                    ))}
                  </div>

                  {/* Expand/Collapse Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={toggleExpandedQuality}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <span>{showExpandedQuality ? 'Show Less' : 'Show More Metrics'}</span>
                      {showExpandedQuality ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>

                  {/* Expanded Quality Metrics */}
                  {showExpandedQuality && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {expandedQualityMetrics.map((metric) => (
                          <AnalyticsMetricCard
                            key={metric.id}
                            {...metric}
                            onClick={metric.hasDetails ? () => handleMetricClick(metric.id, metric) : undefined}
                          />
                        ))}
                      </div>

                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Conversational Insights Section */}
            <div className="space-y-4">
              <SectionHeader
                title="Conversational Insights"
                subtitle="Sentiment analysis, knowledge gaps, and conversation patterns"
                isExpanded={expandedSections.insights}
                onToggle={() => toggleSection('insights')}
                icon={<MessageSquare className="text-blue-600" size={20} />}
              />
              
              {expandedSections.insights && (
                <div className="space-y-6">
                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sentiment Analysis Chart */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Sentiment Analysis</h3>
                      <AnalyticsDonutChart
                        total={sentimentData.total}
                        segments={sentimentData.segments}
                        onSegmentClick={handleSentimentSegmentClick}
                      />
                    </div>
                    
                    {/* Popular Topics */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h3>
                      <div className="space-y-3">
                        {popularTopics.map((topic, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-blue-200 rounded-lg bg-blue-50">
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{topic.topic}</h4>
                              <p className="text-xs text-gray-600">{topic.description}</p>
                            </div>
                            <div className="text-xl font-bold text-blue-600">
                              {topic.count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Top Complaint Drivers */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Complaint Drivers</h3>
                      <div className="space-y-3">
                        {complaintDrivers.map((complaint, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm">{complaint.driver}</h4>
                              <p className="text-xs text-gray-600">{complaint.description}</p>
                            </div>
                            <div className="text-xl font-bold text-red-600">
                              {complaint.count}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Row: Competitor Mentions and Top 5 Unanswered Themes */}
                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Competitor Mentions Chart */}
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Competitor Mentions</h3>
                        <AnalyticsDonutChart
                          total={competitorData.total}
                          segments={competitorData.segments}
                        />
                      </div>
                      
                      {/* Top Unanswered Themes */}
                      <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 Unanswered Themes</h3>
                        <div className="space-y-4">
                          {unansweredThemes.map((theme, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50 cursor-pointer hover:bg-red-100 transition-colors"
                              onClick={() => handleThemeClick(theme.theme)}
                            >
                              <div>
                                <h4 className="font-medium text-gray-900">{theme.theme}</h4>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-red-600">
                                  {theme.count}
                                </div>
                                <p className="text-sm text-gray-600">calls unresolved</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Metric Detail Modal */}
      {selectedMetric && selectedMetricData && (
        <MetricDetailModal
          isOpen={!!selectedMetric}
          onClose={() => {
            setSelectedMetric(null);
            setSelectedMetricData(null);
          }}
          metricId={selectedMetric}
          metricData={selectedMetricData}
        />
      )}
      
      {/* Sentiment Detail Modal */}
      <SentimentDetailModal
        isOpen={sentimentModalOpen}
        onClose={() => setSentimentModalOpen(false)}
        sentiment={selectedSentiment}
        calls={sentimentCalls[selectedSentiment]}
      />
      
      {/* Theme Deep Dive Modal */}
      {themeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gray-600 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{selectedTheme}</h2>
                <div className="flex items-center space-x-2 mt-2 text-gray-300">
                  <span>Dashboard</span>
                  <span>&gt;</span>
                  <span>Unanswered Themes</span>
                </div>
              </div>
              <button
                onClick={() => setThemeModalOpen(false)}
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
                  <div className="flex justify-start">
                    <button
                      onClick={handleUpdateKnowledgeBase}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <span>📚</span>
                      <span>Update Knowledge Base</span>
                    </button>
                  </div>

                  {/* Mock Queries for International Wire Transfers */}
                  <div className="space-y-4">
                    {selectedTheme === 'International Wire Transfers' && (
                      <>
                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 text-lg">Global Manufacturing Inc</h3>
                                <span className="text-gray-500 text-sm">2:45 PM</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">
                                "I need to send $50,000 to our supplier in Germany. What's the SWIFT code I need and how long will this take? Also, what are all the fees involved?"
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 text-lg">Sarah Martinez</h3>
                                <span className="text-gray-500 text-sm">1:20 PM</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">
                                "My wire transfer to Japan was supposed to arrive yesterday but my recipient says they haven't received it. Can you track where it is?"
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 text-lg">Tech Solutions Ltd</h3>
                                <span className="text-gray-500 text-sm">11:15 AM</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">
                                "What's the daily limit for international wire transfers? I need to send multiple payments to different countries this week."
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 text-lg">Maria Rodriguez</h3>
                                <span className="text-gray-500 text-sm">10:30 AM</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">
                                "I'm trying to send money to my family in Mexico. Do I need any special documentation? And what's the exchange rate you're using?"
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-b border-gray-200 pb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 text-lg">Investment Partners LLC</h3>
                                <span className="text-gray-500 text-sm">9:45 AM</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">
                                "We need to wire funds to our London office urgently. Can this be expedited and what additional fees would that involve?"
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
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
                      value={selectedTheme}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Knowledge Article Title
                    </label>
                    <input
                      type="text"
                      value={`How to handle ${selectedTheme.toLowerCase()}`}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={12}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={handleKnowledgeCancel}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleKnowledgeSubmit}
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
      )}
      
      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        selectedDateRange={selectedDateRange}
      />
    </div>
  );
};

export default AnalyticsDashboard;