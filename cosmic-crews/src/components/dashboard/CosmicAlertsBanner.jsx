import React, { useState } from 'react';
import { Bell, X, CloudRain } from 'lucide-react';

const CosmicAlertsBanner = ({ stargazingIndex }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || stargazingIndex === null) return null;

  const isGoodViewing = stargazingIndex >= 70;

  const alertConfig = isGoodViewing
    ? {
      title: "High Visibility Alert!",
      desc: `The Stargazing Index is at ${stargazingIndex} tonight. Optimal atmospheric stability for deep-sky observation.`,
      colors: "from-amber-500 via-pink-500 to-amber-500",
      icon: <Bell className="text-amber-400 animate-bounce" size={24} />,
      textColor: "text-amber-400"
    }
    : {
      title: "Poor Viewing Conditions",
      desc: `The Stargazing Index has dropped to ${stargazingIndex} due to heavy cloud cover or humidity. Stick to planetary viewing or gear maintenance.`,
      colors: "from-blue-500 via-slate-500 to-blue-500",
      icon: <CloudRain className="text-blue-400" size={24} />,
      textColor: "text-blue-400"
    };

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-[#0a0616] p-[1px] mb-6 shadow-lg transition-all duration-500">
      <div className={`absolute inset-0 bg-gradient-to-r ${alertConfig.colors} opacity-70 animate-pulse`} />

      <div className="relative flex items-start gap-4 rounded-xl bg-[#0B1021] p-4">
        <div className="flex-shrink-0 mt-1">
          {alertConfig.icon}
        </div>

        <div className="flex-1">
          <h3 className={`text-lg font-bold ${alertConfig.textColor}`}>
            {alertConfig.title}
          </h3>
          <p className="mt-1 text-sm text-gray-300 leading-relaxed">
            {alertConfig.desc}
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CosmicAlertsBanner;