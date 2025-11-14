import React from 'react';
import { Calendar, Users, User } from 'lucide-react';
import { StepProps } from '../types';

const MOCK_USERS = [
  { id: '1', name: 'Sarah Chen', role: 'Sales Director' },
  { id: '2', name: 'Mike Johnson', role: 'VP Sales' },
  { id: '3', name: 'Lisa Rodriguez', role: 'Regional Manager' },
  { id: '4', name: 'David Park', role: 'Sales Manager' }
];

const PlanOverview: React.FC<StepProps> = ({ formData, updateFormData, errors }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Plan Name */}
        <div>
          <label htmlFor="planName" className="block text-sm font-semibold text-gray-800 mb-3">
            Plan Name *
          </label>
          <input
            type="text"
            id="planName"
            value={formData.planName}
            onChange={(e) => updateFormData({ planName: e.target.value })}
            placeholder="Q1 2024 Enterprise Sales Plan"
            className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
              errors.planName ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.planName && (
            <p className="mt-1 text-sm text-red-600">{errors.planName}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Short name to identify the plan
          </p>
        </div>

        {/* Plan Owner */}
        <div>
          <label htmlFor="planOwner" className="block text-sm font-semibold text-gray-800 mb-3">
            Plan Owner *
          </label>
          <select
            id="planOwner"
            value={formData.planOwner}
            onChange={(e) => updateFormData({ planOwner: e.target.value })}
            className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
              errors.planOwner ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select plan owner...</option>
            {MOCK_USERS.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.role}
              </option>
            ))}
          </select>
          {errors.planOwner && (
            <p className="mt-1 text-sm text-red-600">{errors.planOwner}</p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            Ensures accountability for plan execution
          </p>
        </div>
      </div>

      {/* Plan Description */}
      <div>
        <label htmlFor="planDescription" className="block text-sm font-semibold text-gray-800 mb-3">
          Plan Description / Mission
        </label>
        <textarea
          id="planDescription"
          rows={4}
          value={formData.planDescription}
          onChange={(e) => updateFormData({ planDescription: e.target.value })}
          placeholder="Describe the plan's purpose and how it supports the company mission. A sales plan should outline how you'll hit revenue targets and who you'll target..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
        />
        <p className="mt-1 text-sm text-gray-500">
          Describe how this plan supports your company mission and revenue targets
        </p>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <label htmlFor="startDate" className="block text-sm font-semibold text-gray-800 mb-3">
            Start Date *
          </label>
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => updateFormData({ startDate: e.target.value })}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                errors.startDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-semibold text-gray-800 mb-3">
            End Date *
          </label>
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => updateFormData({ endDate: e.target.value })}
              className={`w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                errors.endDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Scope */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-4">
          Scope
        </label>
        <div className="flex gap-8">
          <label className="flex items-center group cursor-pointer">
            <input
              type="radio"
              name="scope"
              value="team"
              checked={formData.scope === 'team'}
              onChange={(e) => updateFormData({ scope: e.target.value as 'team' | 'individual' })}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <div className="ml-3 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 group-hover:bg-blue-50">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Team</span>
            </div>
          </label>
          <label className="flex items-center group cursor-pointer">
            <input
              type="radio"
              name="scope"
              value="individual"
              checked={formData.scope === 'individual'}
              onChange={(e) => updateFormData({ scope: e.target.value as 'team' | 'individual' })}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
            />
            <div className="ml-3 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 group-hover:bg-blue-50">
              <User className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Individual</span>
            </div>
          </label>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Determines whether the plan applies to a team or a single rep
        </p>
      </div>
    </div>
  );
};

export default PlanOverview;