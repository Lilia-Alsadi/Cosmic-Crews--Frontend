import React from "react";

const BortleSlider = ({ value, onChange }) => {
  const activeValue = value || 3;
  const totalNodes = 9;

  return (
    <div className="flex flex-col gap-1.5 col-span-2 mt-2">
      <label className="text-sm text-slate-400">Location Bortle Class</label>

      <div className="relative mt-4 mb-6 px-2">
        <div className="absolute top-1/2 left-2 right-2 -translate-y-1/2 h-1 bg-slate-700 rounded-full"></div>

        <div
          className="absolute top-1/2 left-2 -translate-y-1/2 h-1 bg-purple-500 rounded-full transition-all duration-300"
          style={{
            width: `calc(${(activeValue - 1) / (totalNodes - 1)} * 100%)`,
          }}
        ></div>

        <div className="relative flex justify-between items-center w-full">
          {Array.from({ length: totalNodes }).map((_, index) => {
            const val = index + 1;
            const isActive = val === activeValue;
            const isFilled = val <= activeValue;

            return (
              <div key={val} className="flex flex-col items-center relative cursor-pointer" onClick={() => onChange(val)}>
                <div className={`rounded-full transition-all duration-300 z-10 ${isActive ? "w-4 h-4 bg-purple-400 shadow-[0_0_10px_#c084fc]" : isFilled ? "w-3 h-3 bg-purple-500" : "w-3 h-3 bg-slate-600"}`}></div>

                <span className={`absolute top-5 text-xs font-medium transition-colors ${isActive ? "text-purple-300" : "text-slate-500"}`}>{val}</span>

                {val === 1 && <span className="absolute top-9 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Dark</span>}
                {val === 9 && <span className="absolute top-9 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">City</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BortleSlider;
