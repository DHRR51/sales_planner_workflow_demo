import React from 'react';
import { Edit3, Calendar, Users, Target, MapPin, MessageSquare, Database, Bell, Check } from 'lucide-react';
import { StepProps } from '../types';

const MOCK_USERS = [
  { id: '1', name: 'Sarah Chen', role: 'Sales Director' },
  { id: '2', name: 'Mike Johnson', role: 'VP Sales' },
  { id: '3', name: 'Lisa Rodriguez', role: 'Regional Manager' },
  { id: '4', name: 'David Park', role: 'Sales Manager' }
];

const MOCK_TEAM_MEMBERS = [
  { id: '1', name: 'Alex Thompson', email: 'alex@company.com' },
  { id: '2', name: 'Jordan Lee', email: 'jordan@company.com' },
  { id: '3', name: 'Sam Wilson', email: 'sam@company.com' },
  { id: '4', name: 'Casey Brown', email: 'casey@company.com' },
  { id: '5', name: 'Taylor Davis', email: 'taylor@company.com' },
  { id: '6', name: 'Morgan Smith', email: 'morgan@company.com' }
];

interface ReviewConfirmProps extends StepProps {
  onEdit: (stepIndex: number) => void;
}

const ReviewConfirm: React.FC<ReviewConfirmProps> = ({ formData, onEdit }) => {
  const formatDate = (dateString: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'Not set';
  };

  const getPlanOwnerName = (ownerId: string) => {
    const owner = MOCK_USERS.find(user => user.id === ownerId);
    return owner ? `${owner.name} - ${owner.role}` : 'Not selected';
  };

  const getParticipantNames = (participantIds: string[]) => {
    return participantIds.map(id => {
      const member = MOCK_TEAM_MEMBERS.find(m => m.id === id);
      return member ? member.name : 'Unknown';
    });
  };

  const ReviewSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    stepIndex: number;
    children: React.ReactNode;
  }> = ({ title, icon, stepIndex, children }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <button
          onClick={() => onEdit(stepIndex)}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 border border-blue-200 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Edit3 className="w-3 h-3" />
          Edit
        </button>
      </div>
      <div className="px-6 py-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Sales Plan</h2>
        <p className="text-gray-600">
          Please review all settings below. You can edit any section by clicking the Edit button.
        </p>
      </div>

      {/* Plan Overview */}
      <ReviewSection 
        title="Plan Overview" 
        icon={<Calendar className="w-5 h-5 text-blue-600" />} 
        stepIndex={0}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Plan Name:</span>
            <div className="text-gray-900">{formData.planName || 'Not set'}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Plan Owner:</span>
            <div className="text-gray-900">{getPlanOwnerName(formData.planOwner)}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Start Date:</span>
            <div className="text-gray-900">{formatDate(formData.startDate)}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">End Date:</span>
            <div className="text-gray-900">{formatDate(formData.endDate)}</div>
          </div>
          <div>
            <span className="font-medium text-gray-700">Scope:</span>
            <div className="text-gray-900 capitalize">{formData.scope}</div>
          </div>
        </div>
        {formData.planDescription && (
          <div className="mt-4">
            <span className="font-medium text-gray-700">Description:</span>
            <div className="text-gray-900 mt-1">{formData.planDescription}</div>
          </div>
        )}
      </ReviewSection>

      {/* Goals & Targets */}
      <ReviewSection 
        title="Goals & Targets" 
        icon={<Target className="w-5 h-5 text-green-600" />} 
        stepIndex={1}
      >
        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-700">Revenue Goal:</span>
            <div className="text-xl font-bold text-green-600">
              ${formData.revenueGoal.toLocaleString()}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Pipeline Coverage Target:</span>
              <div className="text-gray-900">{formData.pipelineCoverageTarget}×</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">ICP Mix Target:</span>
              <div className="text-gray-900">{formData.icpMixTarget}%</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Overall Win Rate:</span>
              <div className="text-gray-900">{formData.overallWinRate}%</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Sales Cycle Target:</span>
              <div className="text-gray-900">{formData.salesCycleTarget} days</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Forecast Accuracy Threshold:</span>
              <div className="text-gray-900">±{formData.forecastAccuracyThreshold}%</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Meetings Held Rate Target:</span>
              <div className="text-gray-900">{formData.meetingsHeldRateTarget}%</div>
            </div>
          </div>
        </div>
      </ReviewSection>

      {/* Team Structure */}
      <ReviewSection 
        title="Reps & Teams" 
        icon={<Users className="w-5 h-5 text-purple-600" />} 
        stepIndex={2}
      >
        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-700">Selected Teams:</span>
            <div className="mt-2">
              {formData.selectedTeams.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.selectedTeams.map((teamId) => {
                    const AVAILABLE_TEAMS = [
                      { id: 'sales-east', name: 'Sales Team - East Coast' },
                      { id: 'sales-west', name: 'Sales Team - West Coast' },
                      { id: 'sales-emea', name: 'Sales Team - EMEA' },
                      { id: 'enterprise', name: 'Enterprise Sales' },
                      { id: 'smb', name: 'SMB Sales' },
                      { id: 'inside-sales', name: 'Inside Sales' },
                      { id: 'field-sales', name: 'Field Sales' },
                      { id: 'channel-partners', name: 'Channel Partners' }
                    ];
                    const team = AVAILABLE_TEAMS.find(t => t.id === teamId);
                    return (
                      <span key={teamId} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {team?.name || teamId}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <span className="text-gray-500">No teams selected</span>
              )}
            </div>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Team Members:</span>
            <div className="mt-2">
              {formData.participants.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {getParticipantNames(formData.participants).map((name, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {name}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No team members selected</span>
              )}
            </div>
          </div>
          
          {Object.keys(formData.roles).length > 0 && (
            <div>
              <span className="font-medium text-gray-700">Role Assignments:</span>
              <div className="mt-2 space-y-1">
                {Object.entries(formData.roles).map(([memberId, role]) => {
                  const member = MOCK_TEAM_MEMBERS.find(m => m.id === memberId);
                  return (
                    <div key={memberId} className="flex justify-between text-sm">
                      <span>{member?.name}</span>
                      <span className="text-gray-600">{role}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </ReviewSection>

      {/* Target Audience */}
      <ReviewSection 
        title="Target Audience & Segmentation" 
        icon={<MapPin className="w-5 h-5 text-orange-600" />} 
        stepIndex={3}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-gray-700">Industries:</span>
            <div className="mt-1">
              {formData.industries.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {formData.industries.map((industry) => (
                    <span key={industry} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                      {industry}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">Not specified</span>
              )}
            </div>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Company Size:</span>
            <div className="text-gray-900">
              {formData.companySize.min} - {formData.companySize.max} employees
            </div>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Regions:</span>
            <div className="mt-1">
              {formData.regions.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {formData.regions.map((region) => (
                    <span key={region} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      {region}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">Not specified</span>
              )}
            </div>
          </div>
        </div>
        
        {formData.buyerPersona && (
          <div className="mt-4">
            <span className="font-medium text-gray-700">Buyer Persona:</span>
            <div className="text-gray-900 mt-1 p-3 bg-gray-50 rounded text-sm">
              {formData.buyerPersona}
            </div>
          </div>
        )}
      </ReviewSection>

      {/* Strategies & Activities */}
      <ReviewSection 
        title="Channels & Strategies" 
        icon={<MessageSquare className="w-5 h-5 text-teal-600" />} 
        stepIndex={4}
      >
        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-700">Sales Strategies:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.salesStrategies.map((strategy) => (
                <span key={strategy} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                  {strategy}
                </span>
              ))}
            </div>
          </div>
          
          {formData.channelAllocation.length > 0 && (
            <div>
              <span className="font-medium text-gray-700">Channel Allocation:</span>
              <div className="mt-2 space-y-1">
                {formData.channelAllocation.map((allocation) => (
                  <div key={allocation.id} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                    <span>{allocation.channel}</span>
                    <span className="font-medium">{allocation.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ReviewSection>

      {/* Data Sources */}
      <ReviewSection 
        title="Drift Detection Settings" 
        icon={<Database className="w-5 h-5 text-indigo-600" />} 
        stepIndex={5}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Data Sources:</span>
            <div className="mt-1">
              {Object.keys(formData.crmIntegration).filter(key => formData.crmIntegration[key]).length > 0 ? (
                Object.keys(formData.crmIntegration)
                  .filter(key => formData.crmIntegration[key])
                  .join(', ')
              ) : (
                <span className="text-gray-500">None selected</span>
              )}
            </div>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Activity Monitoring:</span>
            <div className="mt-1">
              {Object.keys(formData.communicationData).filter(key => formData.communicationData[key]).length > 0 ? (
                Object.keys(formData.communicationData)
                  .filter(key => formData.communicationData[key])
                  .join(', ')
              ) : (
                <span className="text-gray-500">None selected</span>
              )}
            </div>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Learning Tracking:</span>
            <div className="mt-1">{formData.lmsIntegration ? 'Enabled' : 'Disabled'}</div>
          </div>
          
          <div>
            <span className="font-medium text-gray-700">Detection Frequency:</span>
            <div className="mt-1">Every {formData.dataRefreshFrequency} hour(s)</div>
          </div>
        </div>
      </ReviewSection>

    </div>
  );
};

export default ReviewConfirm;