import React from 'react';
import { X, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from 'lucide-react';
import BarChart from './BarChart';
import DonutChart from './DonutChart';

interface MetricDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  metricId: string;
  metricData: any;
}

// Deep dive modal for detailed metric analysis
const MetricDetailModal: React.FC<MetricDetailModalProps> = ({
  isOpen,
  onClose,
  metricId,
  metricData
}) => {
  if (!isOpen) return null;

  const getMetricTitle = (metricId: string) => {
    const titles: Record<string, string> = {
      taskSuccess: 'Task Success Rate',
      brand: 'Brand Alignment',
      escalation: 'Escalation Rate',
      hallucination: 'Hallucination Detection',
      knowledge: 'Knowledge Gap',
      rejection: 'Rejection Rate'
    };
    return titles[metricId] || metricId;
  };

  const getMetricDescription = (metricId: string) => {
    const descriptions: Record<string, string> = {
      taskSuccess: 'Measures how effectively the agent completes assigned tasks and resolves user queries.',
      brand: 'Evaluates consistency with brand voice, tone, and messaging guidelines.',
      escalation: 'Tracks the frequency of conversations that require human intervention.',
      hallucination: 'Monitors instances where the agent provides incorrect or fabricated information.',
      knowledge: 'Identifies areas where the agent lacks sufficient information to provide accurate responses.',
      rejection: 'Measures how often the agent declines to handle user requests.'
    };
    return descriptions[metricId] || 'Detailed analysis of this performance metric.';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-500" />;
      case 'stable':
        return <Minus size={16} className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'needs-attention':
        return <AlertTriangle size={20} className="text-orange-600" />;
      case 'critical':
        return <AlertTriangle size={20} className="text-red-600" />;
      default:
        return <Minus size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'needs-attention':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Mock data for different metrics
  const getChartData = (metricId: string) => {
    switch (metricId) {
      case 'tool-utilization-rate':
        return {
          type: 'tool-usage',
          data: {
            used: [
              {
                name: 'Call transfer',
                description: 'Successfully transferring calls to appropriate departments',
                usage: 100,
                totalCalls: 247,
                successRate: 94,
                avgResponseTime: '1.2s',
                status: 'active'
              }
            ],
            unused: [
              {
                name: 'Answer service questions',
                description: 'Knowledge base not configured for service inquiries',
                usage: 0,
                potentialImpact: 'High',
                reason: 'Knowledge base missing',
                status: 'inactive'
              },
              {
                name: 'Schedule an appointment',
                description: 'Calendar integration not enabled',
                usage: 0,
                potentialImpact: 'High',
                reason: 'Calendar system not connected',
                status: 'inactive'
              },
              {
                name: 'Leave a voicemail',
                description: 'Voicemail system not connected',
                usage: 0,
                potentialImpact: 'Medium',
                reason: 'Voicemail integration missing',
                status: 'inactive'
              }
            ]
          }
        };
      case 'taskSuccess':
        return {
          type: 'bar',
          data: [
            { label: 'Mon', value: 72, color: 'bg-orange-500' },
            { label: 'Tue', value: 68, color: 'bg-red-500' },
            { label: 'Wed', value: 65, color: 'bg-red-500' },
            { label: 'Thu', value: 70, color: 'bg-orange-500' },
            { label: 'Fri', value: 68, color: 'bg-red-500' },
            { label: 'Sat', value: 75, color: 'bg-orange-500' },
            { label: 'Sun', value: 69, color: 'bg-red-500' }
          ]
        };
      case 'brand':
        return {
          type: 'donut',
          data: {
            total: 100,
            segments: [
              { label: 'On Brand', value: 45, color: '#10B981' },
              { label: 'Off Brand', value: 55, color: '#EF4444' }
            ]
          }
        };
      case 'hallucination':
        return {
          type: 'queries',
          data: [
            {
              id: '1',
              query: "What's the weather like in Paris today?",
              callId: 'CALL-2024-001',
              timestamp: '2024-01-27 14:32:15',
              severity: 'high'
            },
            {
              id: '2', 
              query: "Can you help me book a flight to Tokyo?",
              callId: 'CALL-2024-002',
              timestamp: '2024-01-27 13:45:22',
              severity: 'high'
            },
            {
              id: '3',
              query: "What's the capital of Australia?",
              callId: 'CALL-2024-003', 
              timestamp: '2024-01-27 12:18:45',
              severity: 'medium'
            },
            {
              id: '4',
              query: "How do I reset my password for Netflix?",
              callId: 'CALL-2024-004',
              timestamp: '2024-01-27 11:55:33',
              severity: 'high'
            },
            {
              id: '5',
              query: "What time does the stock market close?",
              callId: 'CALL-2024-005',
              timestamp: '2024-01-27 10:22:18',
              severity: 'medium'
            }
          ]
        };
      default:
        return {
          type: 'unfulfilled-tasks',
          data: [
            { 
              task: 'Send an SMS reminder of appointment',
              count: 47,
              color: 'bg-red-500'
            },
            { 
              task: 'Update my billing address',
              count: 31,
              color: 'bg-orange-500'
            },
            { 
              task: 'Check my account balance',
              count: 28,
              color: 'bg-yellow-500'
            },
            { 
              task: 'Download invoice from last month',
              count: 22,
              color: 'bg-blue-500'
            },
            { 
              task: 'Change appointment to video call',
              count: 19,
              color: 'bg-purple-500'
            }
          ]
        };
    }
  };

  const getKnowledgeGapData = () => {
    return {
      type: 'unanswered-themes',
      data: [
        {
          theme: 'API Integration Issues',
          count: 23,
          description: 'calls unresolved',
          color: 'bg-red-500'
        },
        {
          theme: 'Enterprise Licensing',
          count: 18,
          description: 'calls unresolved',
          color: 'bg-orange-500'
        },
        {
          theme: 'GDPR Compliance',
          count: 15,
          description: 'calls unresolved',
          color: 'bg-yellow-500'
        },
        {
          theme: 'Data Migration',
          count: 12,
          description: 'calls unresolved',
          color: 'bg-blue-500'
        },
        {
          theme: 'Custom Development',
          count: 9,
          description: 'calls unresolved',
          color: 'bg-purple-500'
        }
      ]
    }
  };

  const getRecommendations = (metricId: string) => {
    const recommendations: Record<string, string[]> = {
      taskSuccess: [
        'Review and update intent understanding models',
        'Expand training data for common user scenarios',
        'Implement better tool integration for complex tasks',
        'Add fallback mechanisms for unclear requests'
      ],
      brand: [
        'Update response templates to match brand voice',
        'Implement tone consistency checks',
        'Train on brand-specific vocabulary and phrases',
        'Add brand guideline validation rules'
      ],
      hallucination: [
        'Report the problem to Microsoft',
        'Expand knowledge base with verified information'
      ],
      knowledge: [
        'Update knowledge base in Settings'
      ],
      rejection: [
        'Add Copilot Actions to support these tasks',
        'Share insights with Microsoft'
      ]
    };
    return recommendations[metricId] || ['Review and optimize this metric'];
  };

  const chartData = getChartData(metricId);
  const knowledgeGapData = metricId === 'knowledge' ? getKnowledgeGapData() : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getStatusIcon(metricData.status)}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {getMetricTitle(metricId)}
              </h2>
              <p className="text-sm text-gray-600">
                {getMetricDescription(metricId)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Status */}
          <div className={`border rounded-lg p-4 ${getStatusColor(metricData.status)}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {metricData.score}
                </div>
                <div className="text-sm font-medium text-gray-700">
                  Current Score
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getTrendIcon(metricData.trend)}
                <span className="text-sm text-gray-600">
                  {metricData.trend === 'up' ? 'Improving' : 
                   metricData.trend === 'down' ? 'Declining' : 'Stable'}
                </span>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {metricId === 'hallucination' ? 'Problematic Queries' : 
               metricId === 'knowledge' ? 'Top 5 Unanswered Themes' :
               metricId === 'rejection' ? 'Unfulfilled Task Analysis' : 'Performance Trend'}
            </h3>
            {metricId === 'knowledge' && knowledgeGapData ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Knowledge areas where your agent couldn't provide adequate answers:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {knowledgeGapData.data.map((theme: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {theme.count}
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {theme.theme}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {theme.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : chartData.type === 'unfulfilled-tasks' ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Top requests your agent couldn't fulfill:
                </p>
                <div className="space-y-3">
                  {chartData.data.map((item: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{item.task}</h4>
                        <span className="text-lg font-bold text-gray-900">{item.count}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Requested {item.count} times this month
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${(item.count / 47) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : chartData.type === 'queries' ? (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b border-gray-200 pb-2">
                  <span>Query</span>
                  <span>Call ID</span>
                  <span>Timestamp</span>
                  <span>Severity</span>
                </div>
                {chartData.data.map((item: any) => (
                  <div key={item.id} className="grid grid-cols-4 gap-4 text-sm py-3 border-b border-gray-100 hover:bg-white rounded-md px-2">
                    <span className="text-gray-900 font-medium">{item.query}</span>
                    <button className="text-blue-600 hover:text-blue-800 underline text-left">
                      {item.callId}
                    </button>
                    <span className="text-gray-600">{item.timestamp}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.severity === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                ))}
              </div>
            ) : chartData.type === 'tool-usage' ? (
              <div className="space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">1</div>
                    <div className="text-sm text-green-700">Tools Active</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-red-700">Tools Unused</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">38%</div>
                    <div className="text-sm text-blue-700">Utilization Rate</div>
                  </div>
                </div>

                {/* Used Tools Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h4 className="text-lg font-semibold text-gray-900">Active Tools (1)</h4>
                  </div>
                  
                  {chartData.data.used.map((tool: any, index: number) => (
                    <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h5 className="font-semibold text-gray-900 text-lg">{tool.name}</h5>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              ACTIVE
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-green-600">{tool.usage}%</div>
                          <div className="text-xs text-gray-500">Usage Rate</div>
                        </div>
                      </div>
                      
                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4 bg-white rounded-lg p-4 border border-green-100">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{tool.totalCalls}</div>
                          <div className="text-xs text-gray-600">Total Invocations</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{tool.successRate}%</div>
                          <div className="text-xs text-gray-600">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{tool.avgResponseTime}</div>
                          <div className="text-xs text-gray-600">Avg Response Time</div>
                        </div>
                      </div>
                      
                      {/* Usage Visualization */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Tool Utilization</span>
                          <span>{tool.usage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full bg-green-500 transition-all duration-500"
                            style={{ width: `${tool.usage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Unused Tools Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h4 className="text-lg font-semibold text-gray-900">Inactive Tools (3)</h4>
                    <span className="text-sm text-gray-500">- Opportunities for improvement</span>
                  </div>
                
                  <div className="space-y-4">
                    {chartData.data.unused.map((tool: any, index: number) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h5 className="font-semibold text-gray-900 text-lg">{tool.name}</h5>
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                                INACTIVE
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                tool.potentialImpact === 'High' 
                                  ? 'bg-orange-100 text-orange-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {tool.potentialImpact} Impact
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
                            <p className="text-sm text-red-600 font-medium">
                              <span className="font-semibold">Issue:</span> {tool.reason}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold text-red-600">{tool.usage}%</div>
                            <div className="text-xs text-gray-500">Usage Rate</div>
                          </div>
                        </div>
                        
                        {/* Usage Visualization */}
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Tool Utilization</span>
                            <span>{tool.usage}% (Needs Activation)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="h-3 rounded-full bg-red-500 transition-all duration-500"
                              style={{ width: `${tool.usage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : chartData.type === 'bar' ? (
              <BarChart
                data={chartData.data}
                maxValue={100}
                height={200}
              />
            ) : (
              <div className="flex justify-center">
                <DonutChart
                  total={chartData.data.total}
                  segments={chartData.data.segments}
                  size={160}
                />
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              {metricId === 'tool-utilization-rate' ? (
                <>
                  {/* Primary Recommendation */}
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Customize greetings to introduce what the agent can do</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        Update your agent's greeting to inform callers about available services and capabilities. This will help customers understand what the agent can help with and increase tool utilization.
                      </p>
                      <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-sm text-gray-600 mb-2"><strong>Example greeting:</strong></p>
                        <p className="text-sm text-gray-700 italic">
                          "Hello! I'm your virtual assistant. I can help you with account questions, schedule appointments, transfer you to the right department, or take a message if needed. How can I assist you today?"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Additional Recommendations */}
                  <div className="flex items-start space-x-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Configure knowledge base for service questions</h4>
                      <p className="text-sm text-gray-700">
                        Set up your knowledge base to enable the "Answer service questions" tool. This will allow the agent to provide immediate answers to common inquiries.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Enable appointment scheduling integration</h4>
                      <p className="text-sm text-gray-700">
                        Connect your calendar system to allow the agent to schedule appointments directly, reducing manual work and improving customer experience.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Set up voicemail integration</h4>
                      <p className="text-sm text-gray-700">
                        Configure voicemail capabilities to capture messages when agents are unavailable, ensuring no customer inquiry is missed.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                getRecommendations(metricId).map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{recommendation}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {metricId === 'tool-utilization-rate' && (
              <span>💡 Tip: Start with customizing greetings for immediate impact</span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            {metricId === 'tool-utilization-rate' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Customize Greetings
              </button>
            )}
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricDetailModal;