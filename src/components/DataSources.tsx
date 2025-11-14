import React, { useState } from 'react';
import { StepProps } from '../types';
import { 
  Settings, 
  TrendingUp, 
  Activity, 
  GraduationCap, 
  Target, 
  Database,
  Bell,
  RotateCcw,
  Save,
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface MetricConfig {
  enabled: boolean;
  threshold: number;
  window: '7d' | '28d' | '84d';
}

interface DriftSettings {
  // Sales Performance
  winRate: MetricConfig;
  dealSize: MetricConfig;
  salesCycleLength: MetricConfig;
  pipelineStageMix: MetricConfig;
  
  // Activity & Engagement
  callConnectionRate: MetricConfig;
  callDuration: MetricConfig;
  emailOpenRate: MetricConfig;
  meetingHeldRate: MetricConfig;
  
  // Training & Enablement
  trainingCompletionRate: MetricConfig;
  assessmentScore: MetricConfig;
  
  // Forecast Accuracy
  forecastAccuracy: MetricConfig;
  
  // Data Quality
  missingDataRate: MetricConfig;
  integrationHealth: MetricConfig;
  
  // Notifications
  emailNotifications: boolean;
  slackNotifications: boolean;
  webhookUrl: string;
  
  // Expected Performance Values
  expectedWinRate: number;
  expectedDealSize: number;
  expectedSalesCycleLength: number;
  expectedPipelineStageMix: number;
  
  // Expected Activity & Engagement Values
  expectedCallConnectionRate: number;
  expectedCallDuration: number;
  expectedEmailOpenRate: number;
  expectedMeetingHeldRate: number;
  
  // Expected Training & Enablement Values
  expectedTrainingCompletionRate: number;
  expectedAssessmentScore: number;
  
  // Expected Forecast Accuracy Values
  expectedForecastAccuracy: number;
  
  // Expected Data Quality Values
  expectedMissingDataRate: number;
  expectedIntegrationHealth: number;
}

const defaultSettings: DriftSettings = {
  winRate: { enabled: true, threshold: 10, window: '28d' },
  dealSize: { enabled: true, threshold: 15, window: '28d' },
  salesCycleLength: { enabled: true, threshold: 10, window: '28d' },
  pipelineStageMix: { enabled: true, threshold: 10, window: '28d' },
  callConnectionRate: { enabled: true, threshold: 15, window: '7d' },
  callDuration: { enabled: true, threshold: 10, window: '7d' },
  emailOpenRate: { enabled: true, threshold: 15, window: '7d' },
  meetingHeldRate: { enabled: true, threshold: 15, window: '7d' },
  trainingCompletionRate: { enabled: true, threshold: 15, window: '28d' },
  assessmentScore: { enabled: true, threshold: 5, window: '28d' },
  forecastAccuracy: { enabled: true, threshold: 10, window: '28d' },
  missingDataRate: { enabled: true, threshold: 5, window: '7d' },
  integrationHealth: { enabled: true, threshold: 48, window: '7d' },
  emailNotifications: true,
  slackNotifications: false,
  webhookUrl: '',
  expectedWinRate: 25,
  expectedDealSize: 50000,
  expectedSalesCycleLength: 90,
  expectedPipelineStageMix: 30,
  
  // Activity & Engagement defaults
  expectedCallConnectionRate: 35,
  expectedCallDuration: 15,
  expectedEmailOpenRate: 25,
  expectedMeetingHeldRate: 80,
  
  // Training & Enablement defaults
  expectedTrainingCompletionRate: 90,
  expectedAssessmentScore: 85,
  
  // Forecast Accuracy defaults
  expectedForecastAccuracy: 85,
  
  // Data Quality defaults
  expectedMissingDataRate: 5,
  expectedIntegrationHealth: 24
};

export default function DataSources({ formData, updateFormData }: StepProps) {
  const [settings, setSettings] = useState<DriftSettings>(defaultSettings);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const updateMetric = (key: keyof DriftSettings, updates: Partial<MetricConfig>) => {
    setSettings(prev => ({
      ...prev,
      [key]: { ...prev[key] as MetricConfig, ...updates }
    }));
  };

  const updateNotification = (key: keyof DriftSettings, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const validateSettings = (): string[] => {
    const errors: string[] = [];
    
    // Check if at least one metric is enabled
    const metricsEnabled = Object.entries(settings).some(([key, value]) => 
      key !== 'emailNotifications' && key !== 'slackNotifications' && key !== 'webhookUrl' && 
      typeof value === 'object' && value.enabled
    );
    
    if (!metricsEnabled) {
      errors.push('At least one metric must be enabled');
    }
    
    // Validate webhook URL if provided
    if (settings.webhookUrl && !settings.webhookUrl.startsWith('http')) {
      errors.push('Webhook URL must start with http:// or https://');
    }
    
    return errors;
  };

  const handleSave = () => {
    const errors = validateSettings();
    setValidationErrors(errors);
    
    if (errors.length === 0) {
      // Save settings via REST API (simulated)
      console.log('Saving settings:', settings);
      alert('Settings saved successfully!');
    }
  };

  const handleRestoreDefaults = () => {
    if (confirm('Are you sure you want to restore default settings? This will overwrite your current configuration.')) {
      setSettings(defaultSettings);
      setValidationErrors([]);
    }
  };

  const getSectionStatus = (metrics: (keyof DriftSettings)[]): 'on' | 'off' => {
    return metrics.some(key => {
      const metric = settings[key];
      return typeof metric === 'object' && metric.enabled;
    }) ? 'on' : 'off';
  };

  const MetricRow = ({ 
    label, 
    metricKey, 
    tooltip, 
    isSpecial = false,
    expectedValueKey,
    expectedValueUnit = '%',
    expectedValueStep = 1
  }: { 
    label: string; 
    metricKey: keyof DriftSettings; 
    tooltip: string;
    isSpecial?: boolean;
    expectedValueKey?: keyof DriftSettings;
    expectedValueUnit?: string;
    expectedValueStep?: number;
  }) => {
    const metric = settings[metricKey] as MetricConfig;
    
    return (
      <div className="py-3 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center space-x-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={metric.enabled}
              onChange={(e) => updateMetric(metricKey, { enabled: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </label>
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {tooltip}
            </div>
          </div>
        </div>
        
        {metric.enabled && (
          <div className="mt-3 space-y-3">
            {expectedValueKey && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 w-20">Expected:</span>
                <input
                  type="number"
                  value={settings[expectedValueKey] as number || ''}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    [expectedValueKey]: Number(e.target.value)
                  }))}
                  min="0"
                  step={expectedValueStep}
                  className="w-24 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
                <span className="text-xs text-gray-500">{expectedValueUnit}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Threshold:</span>
              <input
                type="range"
                min="1"
                max="50"
                value={metric.threshold}
                onChange={(e) => updateMetric(metricKey, { threshold: parseInt(e.target.value) })}
                className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs font-medium text-gray-700 w-8">
                {isSpecial ? `${metric.threshold}h` : `${metric.threshold}%`}
              </span>
              <select
                value={metric.window}
                onChange={(e) => updateMetric(metricKey, { window: e.target.value as '7d' | '28d' | '84d' })}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">7 days</option>
                <option value="28d">28 days</option>
                <option value="84d">84 days</option>
              </select>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SectionCard = ({ 
    title, 
    icon: Icon, 
    color, 
    metrics, 
    children 
  }: { 
    title: string; 
    icon: any; 
    color: string; 
    metrics: (keyof DriftSettings)[];
    children: React.ReactNode;
  }) => {
    const status = getSectionStatus(metrics);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === 'on' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {status === 'on' ? 'On' : 'Off'}
            </span>
          </div>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <Settings className="w-8 h-8 text-blue-600" />
              <span>Drift Detection (Simple)</span>
            </h1>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Tenant:</span> DLEA Demo Account 
              <span className="ml-4 text-sm bg-gray-100 px-2 py-1 rounded">tenant_id: demo_001</span>
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={validationErrors.length > 0}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            
            <button
              onClick={handleRestoreDefaults}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restore Defaults</span>
            </button>
          </div>
        </div>
        
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <h4 className="font-medium text-red-800">Please fix the following issues:</h4>
            </div>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Sales Performance */}
        <SectionCard
          title="Sales Performance"
          icon={TrendingUp}
          color="bg-blue-600"
          metrics={['winRate', 'dealSize', 'salesCycleLength', 'pipelineStageMix']}
        >
          <MetricRow
            label="Win Rate"
            metricKey="winRate"
            tooltip="Monitors significant changes in deal closure rates"
            expectedValueKey="expectedWinRate"
            expectedValueUnit="%"
          />
          <MetricRow
            label="Deal Size (Avg)"
            metricKey="dealSize"
            tooltip="Tracks shifts in average deal values"
            expectedValueKey="expectedDealSize"
            expectedValueUnit="$"
            expectedValueStep={1000}
          />
          <MetricRow
            label="Sales Cycle Length"
            metricKey="salesCycleLength"
            tooltip="Detects changes in time from lead to close"
            expectedValueKey="expectedSalesCycleLength"
            expectedValueUnit="days"
          />
          <MetricRow
            label="Pipeline Stage Mix"
            metricKey="pipelineStageMix"
            tooltip="Monitors distribution changes across pipeline stages"
            expectedValueKey="expectedPipelineStageMix"
            expectedValueUnit="%"
          />
        </SectionCard>

        {/* Activity & Engagement */}
        <SectionCard
          title="Activity & Engagement"
          icon={Activity}
          color="bg-green-600"
          metrics={['callConnectionRate', 'callDuration', 'emailOpenRate', 'meetingHeldRate']}
        >
          <MetricRow
            label="Call Connection Rate"
            metricKey="callConnectionRate"
            tooltip="Tracks changes in successful call connections"
            expectedValueKey="expectedCallConnectionRate"
            expectedValueUnit="%"
          />
          <MetricRow
            label="Call Duration (Avg)"
            metricKey="callDuration"
            tooltip="Monitors shifts in average call length"
            expectedValueKey="expectedCallDuration"
            expectedValueUnit="min"
          />
          <MetricRow
            label="Email Open Rate"
            metricKey="emailOpenRate"
            tooltip="Detects changes in email engagement rates"
            expectedValueKey="expectedEmailOpenRate"
            expectedValueUnit="%"
          />
          <MetricRow
            label="Meeting Held Rate"
            metricKey="meetingHeldRate"
            tooltip="Tracks changes in scheduled vs. held meetings"
            expectedValueKey="expectedMeetingHeldRate"
            expectedValueUnit="%"
          />
        </SectionCard>

        {/* Training & Enablement */}
        <SectionCard
          title="Training & Enablement"
          icon={GraduationCap}
          color="bg-purple-600"
          metrics={['trainingCompletionRate', 'assessmentScore']}
        >
          <MetricRow
            label="Training Completion Rate"
            metricKey="trainingCompletionRate"
            tooltip="Monitors changes in training program completion"
            expectedValueKey="expectedTrainingCompletionRate"
            expectedValueUnit="%"
          />
          <MetricRow
            label="Assessment Score (Avg)"
            metricKey="assessmentScore"
            tooltip="Tracks shifts in average assessment performance"
            expectedValueKey="expectedAssessmentScore"
            expectedValueUnit="%"
          />
        </SectionCard>

        {/* Forecast Accuracy */}
        <SectionCard
          title="Forecast Accuracy"
          icon={Target}
          color="bg-orange-600"
          metrics={['forecastAccuracy']}
        >
          <MetricRow
            label="Forecast Accuracy"
            metricKey="forecastAccuracy"
            tooltip="Detects changes in forecast vs. actual performance"
            expectedValueKey="expectedForecastAccuracy"
            expectedValueUnit="%"
          />
        </SectionCard>

        {/* Data Quality */}
        <SectionCard
          title="Data Quality"
          icon={Database}
          color="bg-red-600"
          metrics={['missingDataRate', 'integrationHealth']}
        >
          <MetricRow
            label="Missing Data Rate"
            metricKey="missingDataRate"
            tooltip="Monitors increases in missing or incomplete data"
            expectedValueKey="expectedMissingDataRate"
            expectedValueUnit="%"
          />
          <MetricRow
            label="Integration Health"
            metricKey="integrationHealth"
            tooltip="Tracks system integration staleness (hours since last update)"
            isSpecial={true}
            expectedValueKey="expectedIntegrationHealth"
            expectedValueUnit="h"
          />
        </SectionCard>

        {/* Notifications */}
        <SectionCard
          title="Notifications"
          icon={Bell}
          color="bg-indigo-600"
          metrics={[]}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => updateNotification('emailNotifications', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Email Notifications</span>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.slackNotifications}
                  onChange={(e) => updateNotification('slackNotifications', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Slack Notifications</span>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Webhook URL (Optional)
              </label>
              <input
                type="url"
                value={settings.webhookUrl}
                onChange={(e) => updateNotification('webhookUrl', e.target.value)}
                placeholder="https://your-webhook-url.com/drift-alerts"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </SectionCard>

      </div>
    </div>
  );
}