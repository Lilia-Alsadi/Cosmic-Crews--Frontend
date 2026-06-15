import React from 'react';

const crews = [
  { id: 1, name: 'Deep Sky Navigators', role: 'Telescope Master', roleColor: 'pink', img: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=100&auto=format&fit=crop' },
  { id: 2, name: 'Lunar Observers', role: 'Observer', roleColor: 'blue', img: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=100&auto=format&fit=crop' },
  { id: 3, name: 'Astrophotography Hub', role: 'Editor', roleColor: 'purple', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=100&auto=format&fit=crop' },
];

const ProfileCrewsWidget = () => {
  return (
    <div className="col-span-1 flex flex-col gap-4">
      <h3 className="text-lg font-bold text-white tracking-wide">My Crews</h3>
      
      <div className="flex flex-col gap-3">
        {crews.map((crew) => (
          <div key={crew.id} className="flex items-center gap-4 bg-[#0F1428] border border-slate-800 p-4 rounded-xl shadow-md hover:border-slate-700 transition-colors cursor-pointer group">
            
            <img 
              src={crew.img} 
              alt={crew.name} 
              className="w-10 h-10 rounded-full object-cover border border-slate-700 group-hover:border-slate-500 transition-colors"
            />
            
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm font-bold text-slate-200">
                {crew.name}
              </span>
              
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                crew.roleColor === 'pink' ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' :
                crew.roleColor === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {crew.role}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCrewsWidget;
