import React from 'react';
import { Target, Plus, Trash2, MessageSquare, Users } from 'lucide-react';
import { StepProps, ChannelAllocation } from '../types';

const SALES_STRATEGIES = [
  'Cold Calling',
  'Email Outreach',
  'Social Selling (LinkedIn)',
  'Trade Shows & Events',
  'Content Marketing',
  'Channel Partners',
  'Referrals',
  'Direct Mail',
  'Webinars',
  'Cold Email Sequences'
];

const StrategiesActivities: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleStrategyToggle = (strategy: string) => {
    const isSelected = formData.salesStrategies.includes(strategy);
    if (isSelected) {
      updateFormData({
        salesStrategies: formData.salesStrategies.filter(s => s !== strategy)
      });
    } else {
      updateFormData({
        salesStrategies: [...formData.salesStrategies, strategy]
      });
    }
  };

  const addChannelAllocation = () => {
    const newAllocation: ChannelAllocation = {
      id: Date.now().toString(),
      channel: '',
      percentage: 0
    };
    updateFormData({
      channelAllocation: [...formData.channelAllocation, newAllocation]
    });
  };

  const updateChannelAllocation = (id: string, updates: Partial<ChannelAllocation>) => {
    const updatedAllocations = formData.channelAllocation.map(allocation =>
      allocation.id === id ? { ...allocation, ...updates } : allocation
    );
    updateFormData({ channelAllocation: updatedAllocations });
  };

  const removeChannelAllocation = (id: string) => {
    const filteredAllocations = formData.channelAllocation.filter(allocation => allocation.id !== id);
    updateFormData({ channelAllocation: filteredAllocations });
  };

  const totalPercentage = formData.channelAllocation.reduce((sum, allocation) => sum + allocation.percentage, 0);

  return (
    <div className="space-y-8">
      {/* Sales Strategies */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Sales Strategies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SALES_STRATEGIES.map((strategy) => {
            const isSelected = formData.salesStrategies.includes(strategy);
            return (
              <label
                key={strategy}
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors text-sm ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleStrategyToggle(strategy)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2">{strategy}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Choose the sales tactics your team will use
        </p>
      </div>

      {/* Channel Allocation */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Channel Allocation
          </h3>
          <button
            type="button"
            onClick={addChannelAllocation}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Channel
          </button>
        </div>

        <div className="space-y-4">
          {formData.channelAllocation.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-md border-2 border-dashed border-gray-300">
              <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No channel allocations yet</p>
              <p className="text-xs text-gray-400">Define how effort will be distributed across channels</p>
            </div>
          ) : (
            <>
              {formData.channelAllocation.map((allocation) => (
                <div key={allocation.id} className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md border">
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Channel
                    </label>
                    <select
                      value={allocation.channel}
                      onChange={(e) => updateChannelAllocation(allocation.id, { channel: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select channel...</option>
                      {SALES_STRATEGIES.map((strategy) => (
                        <option key={strategy} value={strategy}>{strategy}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <div className="flex-grow">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Percentage (%)
                      </label>
                      <input
                        type="number"
                        value={allocation.percentage || ''}
                        onChange={(e) => updateChannelAllocation(allocation.id, { percentage: Number(e.target.value) })}
                        min="0"
                        max="100"
                        className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeChannelAllocation(allocation.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
                      title="Remove channel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              {totalPercentage !== 100 && formData.channelAllocation.length > 0 && (
                <div className={`p-3 rounded-md border text-sm ${
                  totalPercentage > 100 
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                }`}>
                  <p>
                    Total allocation: {totalPercentage}% 
                    {totalPercentage > 100 
                      ? ' (exceeds 100%)' 
                      : ` (${100 - totalPercentage}% remaining)`
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Specify volume (% or count) for each sales channel
        </p>
      </div>

      {/* Key Messages & Value Proposition */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Key Messages & Value Proposition
        </h3>
        <textarea
          rows={4}
          value={formData.keyMessages}
          onChange={(e) => updateFormData({ keyMessages: e.target.value })}
          placeholder="Define your core messaging and value proposition:&#10;• What unique value do you provide?&#10;• Key benefits and differentiators&#10;• Compelling reasons to buy&#10;• Messaging for different buyer personas&#10;&#10;Example: 'We help sales teams increase revenue by 30% through AI-powered insights and automated coaching, reducing time spent on manual reporting by 80% while improving forecast accuracy.'"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          Record the plan's messaging and differentiators for consistent execution
        </p>
      </div>

      {/* Competitors & Differentiation */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Competitors & Differentiation
        </h3>
        <textarea
          rows={4}
          value={formData.competitors}
          onChange={(e) => updateFormData({ competitors: e.target.value })}
          placeholder="List key competitors and how you differentiate:&#10;• Main competitors in your space&#10;• Their strengths and weaknesses&#10;• Your unique advantages&#10;• Competitive positioning&#10;• Objection handling strategies&#10;&#10;Example: 'Primary competitors: Salesforce, HubSpot. We differentiate through superior AI accuracy (40% better forecasting), faster implementation (2 weeks vs 3 months), and 50% lower total cost of ownership.'"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          Note key competitors and how your value proposition stands out
        </p>
      </div>
    </div>
  );
};

export default StrategiesActivities;