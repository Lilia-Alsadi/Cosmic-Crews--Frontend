import React, { useState, useEffect } from "react";
import { Cloud, Droplets, Moon, Loader2 } from "lucide-react";

const getMoonPhase = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const c = (e) => Math.floor(e);
  const jd = c(365.25 * year) + c(30.6001 * (month + 1)) + day + 1720994.5;
  const daysSinceNew = jd - 2451549.5;
  const newMoons = daysSinceNew / 29.53;
  const phase = (newMoons - Math.floor(newMoons)) * 29.53;

  if (phase < 1 || phase > 28.5) return { name: "New Moon", illum: 0 };
  if (phase < 7) return { name: "Waxing Crescent", illum: Math.round((phase / 7) * 50) };
  if (phase < 8.5) return { name: "First Quarter", illum: 50 };
  if (phase < 14)
    return {
      name: "Waxing Gibbous",
      illum: Math.round(50 + ((phase - 7) / 7) * 50),
    };
  if (phase < 15.5) return { name: "Full Moon", illum: 100 };
  if (phase < 22)
    return {
      name: "Waning Gibbous",
      illum: Math.round(100 - ((phase - 15) / 7) * 50),
    };
  if (phase < 23.5) return { name: "Last Quarter", illum: 50 };
  return {
    name: "Waning Crescent",
    illum: Math.round(50 - ((phase - 22) / 7) * 50),
  };
};

const StargazingIndexWidget = ({ setGlobalIndex }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkyConditions() {
      console.log("before fetchSkyConditions");

      try {
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=31.9522&longitude=35.9284&current=cloud_cover,relative_humidity_2m");
        const data = await response.json();

        console.log("API Data Received:", data);

        const clouds = data.current.cloud_cover;
        const humidity = data.current.relative_humidity_2m;

        const calculatedIndex = Math.max(0, Math.round(100 - clouds * 0.8 - humidity * 0.2));

        setWeatherData({
          clouds,
          humidity,
          index: calculatedIndex,
          moon: getMoonPhase(),
        });

        if (setGlobalIndex) {
          setGlobalIndex(calculatedIndex);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching celestial data:", error);
        setLoading(false);
      }
    }

    fetchSkyConditions();
    console.log("after fetchSkyConditions");
  }, [setGlobalIndex]);

  if (loading || !weatherData) {
    return (
      <div className="flex justify-center items-center h-48 rounded-2xl bg-[#070a14]/60 border border-white/10">
        <Loader2 className="animate-spin text-purple-500" size={32} />
      </div>
    );
  }

  const { index, clouds, humidity, moon } = weatherData;

  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (index / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#070a14]/60 backdrop-blur-xl border border-white/10 p-6 shadow-2xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <h2 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-2">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Stargazing Index</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-purple-900/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="60" cy="60" r={radius} fill="transparent" stroke="url(#purple-glow)" strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-1000 ease-out" />
              <defs>
                <linearGradient id="purple-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-white tracking-tighter drop-shadow-md">{index}</span>
              <span className="text-xs text-purple-300 font-medium uppercase tracking-widest mt-1">/ 100</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded-full w-fit mb-2 ${index >= 70 ? "text-green-300 bg-green-900/30 border-green-500/30" : "text-amber-300 bg-amber-900/30 border-amber-500/30"}`}>{index >= 70 ? "Excellent Conditions" : "Marginal Conditions"}</span>
            <p className="text-sm text-gray-400 max-w-[180px]">{index >= 70 ? "Atmospheric stability is high. Optimal viewing for deep-sky objects." : "Atmospheric interference detected. Expect lower visibility."}</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="bg-[#0B1021]/80 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
            <Cloud className={`${clouds > 50 ? "text-slate-400" : "text-blue-400"} mb-1`} size={24} />
            <span className="text-sm text-gray-400 font-medium">Cloud Cover</span>
            <span className="text-lg font-bold text-white">{clouds}%</span>
          </div>

          <div className="bg-[#0B1021]/80 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
            <Droplets className="text-cyan-400 mb-1" size={24} />
            <span className="text-sm text-gray-400 font-medium">Humidity</span>
            <span className="text-lg font-bold text-white">{humidity}%</span>
          </div>

          <div className="bg-[#0B1021]/80 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 transition-transform hover:scale-105">
            <Moon className="text-purple-400 mb-1" size={24} />
            <span className="text-sm text-gray-400 font-medium">Moon Phase</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-white leading-tight text-center">{moon.name}</span>
              <span className="text-xs text-purple-300">({moon.illum}% Illum)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StargazingIndexWidget;
