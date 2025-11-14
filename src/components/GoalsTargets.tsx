import React from 'react';
import { DollarSign, Target, TrendingUp, Users, Clock, Percent } from 'lucide-react';
import { StepProps } from '../types';

const GoalsTargets: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  const handleFieldChange = (field: string, value: number) => {
    updateFormData({ [field]: value });
  };

  const FieldGroup: React.FC<{
    title: string;
    icon: React.ReactNode;
    color: string;
    children: React.ReactNode;
  }> = ({ title, icon, color, children }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
      <div className={`px-6 py-4 ${color} border-b border-gray-200/50`}>
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          {title}
        </h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children}
        </div>
      </div>
    </div>
  );

  const InputField: React.FC<{
    label: string;
    field: string;
    unit?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    step?: number;
  }> = ({ label, field, unit, placeholder, min = 0, max, step = 0.1 }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={formData[field as keyof typeof formData] || ''}
          onChange={(e) => handleFieldChange(field, Number(e.target.value))}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/70"
        />
        {unit && (
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
            {unit}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Revenue Goal */}
      <div>
        <label htmlFor="revenueGoal" className="block text-sm font-semibold text-gray-800 mb-3">
          Revenue Goal *
        </label>
        <div className="relative group">
          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-green-500 transition-colors" />
          <input
            type="number"
            id="revenueGoal"
            value={formData.revenueGoal || ''}
            onChange={(e) => updateFormData({ revenueGoal: Number(e.target.value) })}
            placeholder="1000000"
            min="0"
            className={`w-full pl-14 pr-4 py-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-lg font-semibold ${
              errors.revenueGoal ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.revenueGoal && (
          <p className="mt-1 text-sm text-red-600">{errors.revenueGoal}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          Total revenue target - drives how you plan sales strategy
        </p>
      </div>

      {/* Pipeline & Coverage Metrics */}
      <FieldGroup
        title="Pipeline & Coverage Metrics"
        icon={<Target className="w-5 h-5 text-white" />}
        color="bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <InputField
          label="Pipeline Coverage Target (×)"
          field="pipelineCoverageTarget"
          unit="×"
          placeholder="3.0"
          step={0.1}
        />
        <InputField
          label="ICP Mix Target (%)"
          field="icpMixTarget"
          unit="%"
          placeholder="80"
          max={100}
        />
        <InputField
          label="Next-Step Coverage (%)"
          field="nextStepCoverage"
          unit="%"
          placeholder="90"
          max={100}
        />
        <InputField
          label="Monthly Pipeline Creation Target (× quota)"
          field="monthlyPipelineCreationTarget"
          unit="×"
          placeholder="1.2"
          step={0.1}
        />
      </FieldGroup>

      {/* Conversion Rates */}
      <FieldGroup
        title="Conversion Rates"
        icon={<TrendingUp className="w-5 h-5 text-white" />}
        color="bg-gradient-to-r from-green-50 to-emerald-50"
      >
        <InputField
          label="Lead → Meeting Held (%)"
          field="leadToMeetingHeld"
          unit="%"
          placeholder="25"
          max={100}
        />
        <InputField
          label="Meeting → SQO (%)"
          field="meetingToSQO"
          unit="%"
          placeholder="40"
          max={100}
        />
        <InputField
          label="SQO → Proposal (%)"
          field="sqoToProposal"
          unit="%"
          placeholder="60"
          max={100}
        />
        <InputField
          label="Proposal → Commit (%)"
          field="proposalToCommit"
          unit="%"
          placeholder="70"
          max={100}
        />
        <InputField
          label="Commit → Won (%)"
          field="commitToWon"
          unit="%"
          placeholder="85"
          max={100}
        />
        <InputField
          label="Overall Win Rate (%)"
          field="overallWinRate"
          unit="%"
          placeholder="20"
          max={100}
        />
      </FieldGroup>

      {/* Sales Process Metrics */}
      <FieldGroup
        title="Sales Process Metrics"
        icon={<Clock className="w-5 h-5 text-white" />}
        color="bg-gradient-to-r from-purple-50 to-pink-50"
      >
        <InputField
          label="Sales Cycle Target (days)"
          field="salesCycleTarget"
          unit="days"
          placeholder="90"
          step={1}
        />
        <InputField
          label="Multithreading (contacts/opportunity in Commit)"
          field="multithreading"
          placeholder="3"
          step={1}
        />
        <InputField
          label="Meetings Held Rate Target (%)"
          field="meetingsHeldRateTarget"
          unit="%"
          placeholder="85"
          max={100}
        />
        <InputField
          label="Forecast Accuracy Threshold (±%)"
          field="forecastAccuracyThreshold"
          unit="±%"
          placeholder="10"
          max={100}
        />
      </FieldGroup>

      {/* Risk Management */}
      <FieldGroup
        title="Risk Management"
        icon={<Users className="w-5 h-5 text-white" />}
        color="bg-gradient-to-r from-orange-50 to-red-50"
      >
        <InputField
          label="Close-Date Change Rate Max"
          field="closeDateChangeRateMax"
          placeholder="0.2"
          step={0.1}
        />
        <InputField
          label="Slippage Max (% of commit pushed)"
          field="slippageMax"
          unit="%"
          placeholder="15"
          max={100}
        />
        <InputField
          label="No-Decision Max (% of SQOs)"
          field="noDecisionMax"
          unit="%"
          placeholder="20"
          max={100}
        />
        <InputField
          label="At-Risk Logo Max (%) (if applicable)"
          field="atRiskLogoMax"
          unit="%"
          placeholder="5"
          max={100}
        />
      </FieldGroup>

      {/* Commercial Terms */}
      <FieldGroup
        title="Commercial Terms"
        icon={<Percent className="w-5 h-5 text-white" />}
        color="bg-gradient-to-r from-teal-50 to-cyan-50"
      >
        <InputField
          label="Median Discount Ceiling (%)"
          field="medianDiscountCeiling"
          unit="%"
          placeholder="15"
          max={100}
        />
        <InputField
          label="Non-standard Terms Max (%)"
          field="nonStandardTermsMax"
          unit="%"
          placeholder="10"
          max={100}
        />
        <InputField
          label="Expansion as % of New ARR (%) (if applicable)"
          field="expansionAsPercentOfNewARR"
          unit="%"
          placeholder="30"
          max={100}
        />
        <InputField
          label="Renewal Win Rate (%) (if applicable)"
          field="renewalWinRate"
          unit="%"
          placeholder="95"
          max={100}
        />
      </FieldGroup>
    </div>
  );
};

export default GoalsTargets;