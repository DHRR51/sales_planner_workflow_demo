import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Edit3 } from 'lucide-react';
import PlanOverview from './components/PlanOverview';
import GoalsTargets from './components/GoalsTargets';
import TeamStructure from './components/TeamStructure';
import TargetAudience from './components/TargetAudience';
import StrategiesActivities from './components/StrategiesActivities';
import DataSources from './components/DataSources';
import ReviewConfirm from './components/ReviewConfirm';
import ProgressIndicator from './components/ProgressIndicator';
import { FormData, ValidationErrors } from './types';

const STEPS = [
  'Plan Overview',
  'Goals & Targets',
  'Reps & Teams',
  'Target Audience & Segmentation',
  'Channels & Strategies',
  'Drift Detection Settings',
  'Review & Confirm'
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    planName: '',
    planDescription: '',
    startDate: '',
    endDate: '',
    planOwner: '',
    scope: 'team',
    revenueGoal: 0,
    pipelineCoverageTarget: 0,
    icpMixTarget: 0,
    leadToMeetingHeld: 0,
    meetingToSQO: 0,
    sqoToProposal: 0,
    proposalToCommit: 0,
    commitToWon: 0,
    overallWinRate: 0,
    salesCycleTarget: 0,
    multithreading: 0,
    forecastAccuracyThreshold: 0,
    nextStepCoverage: 0,
    closeDateChangeRateMax: 0,
    slippageMax: 0,
    noDecisionMax: 0,
    meetingsHeldRateTarget: 0,
    monthlyPipelineCreationTarget: 0,
    medianDiscountCeiling: 0,
    nonStandardTermsMax: 0,
    expansionAsPercentOfNewARR: 0,
    renewalWinRate: 0,
    atRiskLogoMax: 0,
    participants: [],
    selectedTeams: [],
    roles: {},
    quotas: {},
    updateFrequency: '',
    customUpdateDate: '',
    industries: [],
    companySize: { min: 0, max: 1000 },
    regions: [],
    buyerPersona: '',
    salesStrategies: [],
    channelAllocation: [],
    keyMessages: '',
    competitors: '',
    crmIntegration: {},
    communicationData: {},
    lmsIntegration: false,
    dataRefreshFrequency: 24,
    driftThreshold: 10,
    alertChannels: [],
    metricsToDisplay: [],
    aiCoachingEnabled: true
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    switch (currentStep) {
      case 0: // Plan Overview
        if (!formData.planName.trim()) {
          newErrors.planName = 'Plan name is required';
        }
        if (!formData.startDate) {
          newErrors.startDate = 'Start date is required';
        }
        if (!formData.endDate) {
          newErrors.endDate = 'End date is required';
        }
        if (!formData.planOwner) {
          newErrors.planOwner = 'Plan owner is required';
        }
        break;
      case 1: // Goals & Targets
        if (!formData.revenueGoal || formData.revenueGoal <= 0) {
          newErrors.revenueGoal = 'Revenue goal must be greater than 0';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep() && currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All progress will be lost.')) {
      window.location.reload();
    }
  };

  const handleCreatePlan = () => {
    console.log('Creating plan with data:', formData);
    alert('Sales plan created successfully! (This would normally save to backend)');
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      errors
    };

    switch (currentStep) {
      case 0:
        return <PlanOverview {...stepProps} />;
      case 1:
        return <GoalsTargets {...stepProps} />;
      case 2:
        return <TeamStructure {...stepProps} />;
      case 3:
        return <TargetAudience {...stepProps} />;
      case 4:
        return <StrategiesActivities {...stepProps} />;
      case 5:
        return <DataSources {...stepProps} />;
      case 6:
        return <ReviewConfirm {...stepProps} onEdit={setCurrentStep} />;
      default:
        return <PlanOverview {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create New Sales Plan
          </h1>
          <p className="text-gray-600 mt-1">Build a comprehensive sales strategy with AI-powered insights</p>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <ProgressIndicator 
          steps={STEPS} 
          currentStep={currentStep} 
          onStepClick={handleStepClick}
        />
        
        <div className="mt-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            <div className="p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{currentStep + 1}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                {STEPS[currentStep]}
                </h2>
              </div>
              
              {renderCurrentStep()}
            </div>
            
            <div className="px-10 py-8 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-200/50 flex justify-between items-center">
              <div>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
                >
                  Cancel
                </button>
              </div>
              
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 inline-flex items-center gap-2 shadow-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                
                {currentStep < STEPS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCreatePlan}
                    className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 border border-transparent rounded-xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Check className="w-4 h-4" />
                    Create Plan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;