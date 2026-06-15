import React from 'react';

const observations = [
  { id: 1, name: 'Orion Nebula', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop' },
  { id: 2, name: 'Andromeda Galaxy', img: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=400&auto=format&fit=crop' },
  { id: 3, name: 'Jupiter & Moons', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=400&auto=format&fit=crop' },
  { id: 4, name: 'Pleiades Cluster', img: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=400&auto=format&fit=crop' },
  { id: 5, name: 'Saturn Rings', img: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop' },
  { id: 6, name: 'Milky Way Core', img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=400&auto=format&fit=crop' },
];

const ObservationGallery = ({ onObservationClick }) => {
  return (
    <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-white tracking-wide">My Observations</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {observations.map((obs) => (
          <div key={obs.id} onClick={onObservationClick} className="relative group rounded-lg overflow-hidden border border-slate-800 shadow-md aspect-square cursor-pointer">
            <img 
              src={obs.img} 
              alt={obs.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity"></div>
            
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-sm font-semibold text-white drop-shadow-md">
                {obs.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObservationGallery;
