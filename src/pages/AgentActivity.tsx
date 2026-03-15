import React, { useState } from 'react';
import { 
  Sidebar, 
  Header, 
  ObjectiveHeader, 
  AgentCard, 
  ChatInterface, 
  SummaryCard, 
  ActivityTimeline, 
  TeamPanel,
  AssetsList 
} from '../components';

// Agent Activity page demonstrating the new components
const AgentActivity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('activity');
  const [searchValue, setSearchValue] = useState('');

  const timelineItems = [
    {
      id: '1',
      type: 'warning' as const,
      title: 'Roadmap Alignment Agent detected an issue with two top-priority features',
      description: 'Roadmap Alignment Agent has detected an issue with two top-priority features: one is designed to meet new EMEA compliance regulations, while the other would violate them.',
      timestamp: '2h ago',
      priority: 'high' as const,
      tags: ['Compliance', 'EMEA']
    },
    {
      id: '2',
      type: 'success' as const,
      title: 'Approved revenue estimations',
      description: 'Carole Poland approved the pricing revenue estimations. She clarified the current assumptions used in the revenue model and committed to...',
      timestamp: '4h ago',
      tags: ['Revenue Estimations']
    },
    {
      id: '3',
      type: 'action' as const,
      title: 'Sent revenue estimations to Erik',
      description: 'Revenue Estimation Agent reached out to Erik Fuller for review of latest revenue estimations',
      timestamp: '6h ago',
      tags: ['Revenue Estimations']
    },
    {
      id: '4',
      type: 'warning' as const,
      title: 'Scanned salesforce and DealLost',
      description: 'Customer Research Agent scanned Salesforce and DealLost.xlsx for relevant opportunity feedback',
      timestamp: '8h ago',
      tags: ['Deal Lost', 'Opportunity research']
    },
    {
      id: '5',
      type: 'info' as const,
      title: 'Scanned customer support tickets',
      description: 'Customer Research Agent scanned customer support tickets for relevant customer feedback',
      timestamp: '1d ago'
    }
  ];

  const teamMembers = [
    {
      id: '1',
      name: 'Roadmap Alignment Agent',
      role: 'Agent',
      status: 'active' as const,
      workspace: 'Agentspace'
    },
    {
      id: '2',
      name: 'Revenue Estimation Agent',
      role: 'Agent',
      status: 'active' as const,
      workspace: 'Agentspace'
    },
    {
      id: '3',
      name: 'Customer Research Agent',
      role: 'Agent',
      status: 'active' as const,
      workspace: 'Azure AI Foundry'
    }
  ];

  const assets = [
    {
      id: '1',
      name: '2025 Product Team Assignment',
      type: 'document' as const,
      lastModified: '2 days ago'
    }
  ];

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar activeItem={activeTab} onItemClick={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />
        
        <ObjectiveHeader
          title="Evaluate Roadmap"
          owner="Carole Poland"
          status="In Progress"
          description="Continuously evaluates the product roadmap against real-time customer behaviour, competitive shifts, and revenue potential."
        />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                <span>🤖 Copilot</span>
                <span className="text-orange-600">⚠️ AI generated content may be incorrect</span>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">
                Compliance PM Agent is the Product Owner for Regulatory Compliance and Will is the Product Owner for User Engagement.
              </p>
            </div>

            <AgentCard
              name="Compliance PM Agent"
              role="Product Manager"
              status="active"
              statusMessage="Accessing group resources"
            />

            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Managed by</span>
                <button className="text-sm text-indigo-600">→</button>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Sarah Perez</p>
                  <p className="text-xs text-gray-500">Group Product Manager</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Will Little</p>
                  <p className="text-xs text-gray-500">Senior Product Manager</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <ChatInterface placeholder="Message Copilot" />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              <SummaryCard
                title="Summary"
                description="Roadmap Alignment Agent has detected an issue with two top-priority features: one is designed to meet new EMEA compliance regulations, while the other would violate them."
                type="warning"
                actionText="Show more →"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ActivityTimeline items={timelineItems} />
                
                <div className="space-y-6">
                  <TeamPanel
                    title="Team"
                    description="You have 2 people and 5 agents on your team all focused on evaluating your roadmap"
                    members={teamMembers}
                    totalCount={5}
                  />
                  
                  <AssetsList
                    title="Latest assets"
                    assets={assets}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentActivity;