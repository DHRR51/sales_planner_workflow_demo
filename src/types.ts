export interface FormData {
  // Plan Overview
  planName: string;
  planDescription: string;
  startDate: string;
  endDate: string;
  planOwner: string;
  scope: 'team' | 'individual';
  
  // Goals & Targets
  revenueGoal: number;
  pipelineCoverageTarget: number;
  icpMixTarget: number;
  leadToMeetingHeld: number;
  meetingToSQO: number;
  sqoToProposal: number;
  proposalToCommit: number;
  commitToWon: number;
  overallWinRate: number;
  salesCycleTarget: number;
  multithreading: number;
  forecastAccuracyThreshold: number;
  nextStepCoverage: number;
  closeDateChangeRateMax: number;
  slippageMax: number;
  noDecisionMax: number;
  meetingsHeldRateTarget: number;
  monthlyPipelineCreationTarget: number;
  medianDiscountCeiling: number;
  nonStandardTermsMax: number;
  expansionAsPercentOfNewARR: number;
  renewalWinRate: number;
  atRiskLogoMax: number;
  
  // Team Structure & Roles
  participants: string[];
  selectedTeams: string[];
  roles: Record<string, string>;
  quotas: Record<string, number>;
  updateFrequency: string;
  customUpdateDate: string;
  
  // Target Audience & Segmentation
  industries: string[];
  companySize: { min: number; max: number };
  regions: string[];
  buyerPersona: string;
  
  // Strategies & Activities
  salesStrategies: string[];
  channelAllocation: ChannelAllocation[];
  keyMessages: string;
  competitors: string;
  
  // Data Sources & Integration
  crmIntegration: Record<string, boolean>;
  communicationData: Record<string, boolean>;
  lmsIntegration: boolean;
  dataRefreshFrequency: number;
  
  // Performance & Alert Settings
  driftThreshold: number;
  alertChannels: string[];
  metricsToDisplay: string[];
  aiCoachingEnabled: boolean;
}

export interface SalesTarget {
  id: string;
  pipelineStage: string;
  quota: number;
}

export interface Milestone {
  id: string;
  date: string;
  description: string;
}

export interface ChannelAllocation {
  id: string;
  channel: string;
  percentage: number;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  errors: ValidationErrors;
}