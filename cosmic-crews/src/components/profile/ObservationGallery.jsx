import React, { useState, useEffect } from "react";
import { logService } from "../../api/logService";
import { useAuth } from "../../context/AuthContext";
import { DEFAULT_LOG_IMAGE } from "../../utils/constants";

const ObservationGallery = ({ onObservationClick }) => {
  const { user } = useAuth();
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    if (user) {
      logService.getGlobalLogs({ user_id: user.id }).then(setObservations).catch(console.error);
    }
  }, [user]);

  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-white tracking-wide">My Observations</h3>

      {observations.length === 0 ? (
        <div className="text-slate-400 py-4">No observations yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {observations.map((obs) => (
            <div key={obs.id} onClick={() => onObservationClick(obs)} className="relative group rounded-lg overflow-hidden border border-slate-800 shadow-md aspect-square cursor-pointer">
              <img src={obs.image_url || DEFAULT_LOG_IMAGE} alt={obs.title || obs.target_object} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity"></div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-sm font-semibold text-white drop-shadow-md">{obs.title || obs.target_object}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ObservationGallery;
