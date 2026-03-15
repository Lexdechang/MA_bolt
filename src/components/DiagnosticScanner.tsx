import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

interface ScanStage {
  id: string;
  name: string;
  description: string;
  duration: number;
  status: 'pending' | 'scanning' | 'complete' | 'error';
}

interface DiagnosticScannerProps {
  onScanComplete: (results: any) => void;
  isScanning: boolean;
  onStartScan: () => void;
}

// Progressive diagnostic scanner component with realistic scanning stages
const DiagnosticScanner: React.FC<DiagnosticScannerProps> = ({
  onScanComplete,
  isScanning,
  onStartScan
}) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const scanStages: ScanStage[] = [
    {
      id: 'connection',
      name: 'Connection Health',
      description: 'Checking network connectivity and response times',
      duration: 2000,
      status: 'pending'
    },
    {
      id: 'voice-quality',
      name: 'Voice Quality Analysis',
      description: 'Analyzing audio clarity and speech recognition',
      duration: 3000,
      status: 'pending'
    },
    {
      id: 'task-performance',
      name: 'Task Performance',
      description: 'Evaluating task completion rates and accuracy',
      duration: 2500,
      status: 'pending'
    },
    {
      id: 'user-satisfaction',
      name: 'User Satisfaction',
      description: 'Analyzing user feedback and interaction patterns',
      duration: 2000,
      status: 'pending'
    },
    {
      id: 'cost-efficiency',
      name: 'Cost Efficiency',
      description: 'Calculating operational costs and resource usage',
      duration: 1500,
      status: 'pending'
    },
    {
      id: 'brand-alignment',
      name: 'Brand Alignment',
      description: 'Checking tone consistency and brand guidelines',
      duration: 2000,
      status: 'pending'
    }
  ];

  const [stages, setStages] = useState(scanStages);

  useEffect(() => {
    if (!isScanning) {
      setCurrentStage(0);
      setProgress(0);
      setStages(scanStages.map(stage => ({ ...stage, status: 'pending' })));
      return;
    }

    let stageIndex = 0;
    let progressInterval: NodeJS.Timeout;

    const runStage = () => {
      if (stageIndex >= stages.length) {
        // Scan complete
        setTimeout(() => {
          onScanComplete({
            overallScore: 70,
            metrics: generateMockResults()
          });
        }, 500);
        return;
      }

      // Update current stage to scanning
      setStages(prev => prev.map((stage, index) => ({
        ...stage,
        status: index === stageIndex ? 'scanning' : index < stageIndex ? 'complete' : 'pending'
      })));

      setCurrentStage(stageIndex);

      // Simulate progress for current stage
      let stageProgress = 0;
      const stageDuration = stages[stageIndex].duration;
      const progressStep = 100 / (stageDuration / 50);

      progressInterval = setInterval(() => {
        stageProgress += progressStep;
        const overallProgress = ((stageIndex * 100) + stageProgress) / stages.length;
        setProgress(Math.min(overallProgress, 100));

        if (stageProgress >= 100) {
          clearInterval(progressInterval);
          
          // Mark stage as complete
          setStages(prev => prev.map((stage, index) => ({
            ...stage,
            status: index === stageIndex ? 'complete' : stage.status
          })));

          stageIndex++;
          setTimeout(runStage, 300);
        }
      }, 50);
    };

    runStage();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isScanning]);

  const generateMockResults = () => {
    return {
      reliability: { score: 85, status: 'good', trend: 'stable' },
      voiceQuality: { score: 92, status: 'good', trend: 'up' },
      taskSuccess: { score: 91, status: 'good', trend: 'up' },
      satisfaction: { score: 75, status: 'good', trend: 'up' },
      cost: { score: 82, status: 'good', trend: 'stable' },
      brand: { score: 88, status: 'good', trend: 'up' },
      escalation: { score: 78, status: 'good', trend: 'stable' },
      hallucination: { score: 35, status: 'critical', trend: 'down' },
      knowledge: { score: 62, status: 'needs-attention', trend: 'stable' },
      rejection: { score: 71, status: 'needs-attention', trend: 'up' }
    };
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'scanning':
        return <Loader2 className="animate-spin text-blue-500" size={16} />;
      case 'complete':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'error':
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  if (!isScanning) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Mainline Attendant Performance Diagnostics
          </h2>
          <p className="text-gray-600">
            Real-time performance monitoring and optimization
          </p>
        </div>
        
        <button
          onClick={onStartScan}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition-colors"
        >
          <Play size={16} />
          <span>Run Full Performance Check</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Running Diagnostics...
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {Math.round(progress)}% complete
        </p>
      </div>

      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div 
            key={stage.id}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              stage.status === 'scanning' ? 'bg-blue-50 border border-blue-200' :
              stage.status === 'complete' ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            {getStageIcon(stage.status)}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{stage.name}</h4>
              <p className="text-sm text-gray-600">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticScanner;