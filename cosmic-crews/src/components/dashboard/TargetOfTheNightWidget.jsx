import React, { useState, useEffect } from 'react';
import { Camera, Loader2 } from 'lucide-react';

const TargetOfTheNightWidget = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApod() {
      try {
        const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        const data = await response.json();
        
        setApodData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching APOD data:", error);
        setLoading(false);
      }
    }

    fetchApod();
  }, []);

  if (loading || !apodData) {
    return (
      <div className="bg-[#070a14]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-center items-center h-full min-h-[250px]">
        <Loader2 className="animate-spin text-purple-500" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-[#070a14]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2">
        <Camera size={18} className="text-purple-400" />
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
          Cosmic Picture of the Day
        </h3>
      </div>

      <div className="w-full flex-1 min-h-[160px] rounded-xl overflow-hidden relative border border-white/5">
        {apodData.media_type === 'video' ? (
          <iframe
            src={apodData.url}
            title={apodData.title}
            className="w-full h-full object-cover"
            allowFullScreen
          />
        ) : (
          <img 
            src={apodData.url} 
            alt={apodData.title} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a14]/90 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
          <h4 className="text-lg font-bold text-white leading-tight drop-shadow-md">
            {apodData.title}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TargetOfTheNightWidget;
