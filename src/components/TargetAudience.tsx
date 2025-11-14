import React from 'react';
import { Building, Users, MapPin, User } from 'lucide-react';
import { StepProps } from '../types';

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Real Estate',
  'Professional Services',
  'Non-profit',
  'Government'
];

const REGIONS = [
  'North America',
  'South America',
  'Europe',
  'Asia Pacific',
  'Middle East',
  'Africa',
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'Australia'
];

const TargetAudience: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleIndustryToggle = (industry: string) => {
    const isSelected = formData.industries.includes(industry);
    if (isSelected) {
      updateFormData({
        industries: formData.industries.filter(i => i !== industry)
      });
    } else {
      updateFormData({
        industries: [...formData.industries, industry]
      });
    }
  };

  const handleRegionToggle = (region: string) => {
    const isSelected = formData.regions.includes(region);
    if (isSelected) {
      updateFormData({
        regions: formData.regions.filter(r => r !== region)
      });
    } else {
      updateFormData({
        regions: [...formData.regions, region]
      });
    }
  };

  const handleCompanySizeChange = (field: 'min' | 'max', value: number) => {
    updateFormData({
      companySize: {
        ...formData.companySize,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Industry/Market Segment */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-600" />
          Industry / Market Segment
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {INDUSTRIES.map((industry) => {
            const isSelected = formData.industries.includes(industry);
            return (
              <label
                key={industry}
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors text-sm ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleIndustryToggle(industry)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2">{industry}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Choose industries or niches you're targeting
        </p>
      </div>

      {/* Company Size */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Company Size (Number of Employees)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Size
            </label>
            <input
              type="number"
              value={formData.companySize.min}
              onChange={(e) => handleCompanySizeChange('min', Number(e.target.value))}
              min="0"
              placeholder="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Size
            </label>
            <input
              type="number"
              value={formData.companySize.max}
              onChange={(e) => handleCompanySizeChange('max', Number(e.target.value))}
              min="0"
              placeholder="1000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Define the headcount range for target companies
        </p>
      </div>

      {/* Region */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Geographic Regions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {REGIONS.map((region) => {
            const isSelected = formData.regions.includes(region);
            return (
              <label
                key={region}
                className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors text-sm ${
                  isSelected
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleRegionToggle(region)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-2">{region}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Specify geographic focus areas for your sales efforts
        </p>
      </div>

      {/* Buyer Persona */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Buyer Persona & Pain Points
        </h3>
        <textarea
          rows={6}
          value={formData.buyerPersona}
          onChange={(e) => updateFormData({ buyerPersona: e.target.value })}
          placeholder="Describe your target buyer persona including:&#10;• Role/Title (e.g., CTO, VP of Sales, Operations Manager)&#10;• Key challenges they face&#10;• Decision-making authority&#10;• Typical goals and objectives&#10;• Pain points your solution addresses&#10;• Preferred communication channels&#10;&#10;Example: 'VP of Sales at mid-size SaaS companies (100-500 employees) struggling with pipeline visibility and rep performance. Needs better forecasting accuracy and wants to reduce sales cycle length. Values data-driven insights and ROI measurement.'"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500">
          Capture role, challenges, and attributes of your target persona to help tailor strategies
        </p>
      </div>
    </div>
  );
};

export default TargetAudience;