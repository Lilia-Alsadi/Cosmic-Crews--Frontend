import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

const CosmicAlertsBanner = ({ 
  title = "High Visibility Alert!", 
  description = "The Stargazing Index is at 88 tonight. Perfect conditions for deep-sky nebulae observation. Geminids Meteor Shower peaks at midnight!"
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#0a0616] p-[1px] mb-6 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-pink-500 to-amber-500 opacity-70 animate-pulse" />
      
      <div className="relative flex items-start gap-4 rounded-xl bg-[#0B1021] p-4">
        <div className="flex-shrink-0 mt-1">
          <Bell className="text-amber-400 animate-bounce" size={24} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-amber-400">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>

        <button 
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Dismiss alert"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CosmicAlertsBanner;
