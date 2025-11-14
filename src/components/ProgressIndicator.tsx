import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  steps, 
  currentStep, 
  onStepClick 
}) => {
  return (
    <div className="mb-12 relative">
      {/* Gradient overlays for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none opacity-0 md:opacity-100"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none opacity-0 md:opacity-100"></div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-4 min-w-max px-4 md:px-0">
        {steps.map((step, index) => (
          <div
            key={index} 
            className="flex items-center group flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => onStepClick(index)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 transform hover:scale-105 flex-shrink-0 cursor-pointer ${
                  index < currentStep
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl'
                    : index === currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-500 text-white shadow-lg ring-4 ring-blue-200 hover:from-blue-600 hover:to-indigo-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700'
                }`}
                title={`Go to ${step}`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </button>
              <div className="flex flex-col min-w-0">
                <span className={`text-sm font-semibold transition-colors duration-300 whitespace-nowrap ${
                  index <= currentStep ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  {step}
                </span>
                <span className={`text-xs transition-colors duration-300 ${
                  index === currentStep ? 'text-blue-600' : index < currentStep ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {index < currentStep ? 'Completed' : index === currentStep ? 'Current' : 'Pending'}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex items-center mx-4">
                <div 
                  className={`w-8 h-0.5 rounded-full transition-all duration-500 ${
                    index < currentStep ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
                  }`} 
                />
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
      
      {/* Mobile scroll hint */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          <span>Swipe to navigate • Tap to jump to step</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;