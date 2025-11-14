import React from 'react';
import { Users, Calendar, DollarSign, UserCheck } from 'lucide-react';
import { StepProps } from '../types';

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

const MOCK_TEAM_MEMBERS = [
  { id: '1', name: 'Alex Thompson', email: 'alex@company.com' },
  { id: '2', name: 'Jordan Lee', email: 'jordan@company.com' },
  { id: '3', name: 'Sam Wilson', email: 'sam@company.com' },
  { id: '4', name: 'Casey Brown', email: 'casey@company.com' },
  { id: '5', name: 'Taylor Davis', email: 'taylor@company.com' },
  { id: '6', name: 'Morgan Smith', email: 'morgan@company.com' }
];

const SALES_ROLES = [
  'Sales Development Rep (SDR)',
  'Account Executive (AE)',
  'Account Manager',
  'Sales Engineer',
  'Sales Manager',
  'Regional Director'
];

const TeamStructure: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleTeamToggle = (teamId: string) => {
    const isSelected = formData.selectedTeams.includes(teamId);
    if (isSelected) {
      updateFormData({
        selectedTeams: formData.selectedTeams.filter(id => id !== teamId)
      });
    } else {
      updateFormData({
        selectedTeams: [...formData.selectedTeams, teamId]
      });
    }
  };

  const handleParticipantToggle = (memberId: string) => {
    const isSelected = formData.participants.includes(memberId);
    if (isSelected) {
      const updatedParticipants = formData.participants.filter(id => id !== memberId);
      const updatedRoles = { ...formData.roles };
      const updatedQuotas = { ...formData.quotas };
      delete updatedRoles[memberId];
      delete updatedQuotas[memberId];
      updateFormData({
        participants: updatedParticipants,
        roles: updatedRoles,
        quotas: updatedQuotas
      });
    } else {
      updateFormData({
        participants: [...formData.participants, memberId]
      });
    }
  };

  const handleRoleChange = (memberId: string, role: string) => {
    updateFormData({
      roles: {
        ...formData.roles,
        [memberId]: role
      }
    });
  };

  const handleQuotaChange = (memberId: string, quota: number) => {
    updateFormData({
      quotas: {
        ...formData.quotas,
        [memberId]: quota
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Teams Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-green-600" />
          Teams
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {AVAILABLE_TEAMS.map((team) => {
            const isSelected = formData.selectedTeams.includes(team.id);
            return (
              <label
                key={team.id}
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleTeamToggle(team.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{team.name}</div>
                </div>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Select the teams that will participate in this sales plan
        </p>
      </div>

      {/* Participants Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Team Members
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_TEAM_MEMBERS.map((member) => {
            const isSelected = formData.participants.includes(member.id);
            return (
              <label
                key={member.id}
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleParticipantToggle(member.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                  <div className="text-xs text-gray-500">{member.email}</div>
                </div>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Choose team members for this sales plan
        </p>
      </div>

      {/* Role Assignments */}
      {formData.participants.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Role Assignments & Individual Quotas
          </h3>
          <div className="space-y-4">
            {formData.participants.map((memberId) => {
              const member = MOCK_TEAM_MEMBERS.find(m => m.id === memberId);
              if (!member) return null;

              return (
                <div key={memberId} className="p-4 bg-gray-50 rounded-md border">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Team Member
                      </label>
                      <div className="text-sm text-gray-900 font-medium">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <select
                        value={formData.roles[memberId] || ''}
                        onChange={(e) => handleRoleChange(memberId, e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="">Select role...</option>
                        {SALES_ROLES.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Individual Quota (Optional)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="number"
                          value={formData.quotas[memberId] || ''}
                          onChange={(e) => handleQuotaChange(memberId, Number(e.target.value))}
                          placeholder="50000"
                          min="0"
                          className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Roles clarify responsibilities and individual quotas allow for personalized targets
          </p>
        </div>
      )}

      {/* Sales Plan Update Frequency */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Sales Plan Update Frequency
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Schedule
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={formData.updateFrequency}
                onChange={(e) => updateFormData({ updateFrequency: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select update frequency...</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="custom">Custom Schedule</option>
              </select>
            </div>
          </div>
          
          {formData.updateFrequency === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Update Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={formData.customUpdateDate}
                  onChange={(e) => updateFormData({ customUpdateDate: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          How often the sales plan should be reviewed and updated
        </p>
      </div>
    </div>
  );
};

export default TeamStructure;