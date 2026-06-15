import React from 'react';
import { Calendar } from 'lucide-react';

const CosmicEventsWidget = () => {
  const events = [
    {
      id: 1,
      date: 'Oct 21',
      title: 'Orionids (peak)',
      color: 'text-purple-400'
    },
    {
      id: 2,
      date: 'Oct 28',
      title: 'ISS Flyover (Amman, 19:42)',
      color: 'text-blue-400'
    },
    {
      id: 3,
      date: 'Nov 1',
      title: 'Lunar Eclipse',
      color: 'text-pink-400'
    }
  ];

  return (
    <div className="bg-[#070a14]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl w-full h-full">
      <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
        <Calendar size={20} className="text-purple-400" />
        Upcoming Cosmic Events
      </h3>

      <ul className="flex flex-col gap-4">
        {events.map((event) => (
          <li key={event.id} className="flex items-start gap-4 group cursor-pointer">
            <div className="flex flex-col items-center justify-center min-w-[50px] bg-white/5 rounded-lg py-2 border border-white/5 group-hover:border-white/20 transition-colors">
              <span className={`text-xs font-bold uppercase tracking-wider ${event.color}`}>
                {event.date.split(' ')[0]}
              </span>
              <span className="text-sm font-black text-white">
                {event.date.split(' ')[1]}
              </span>
            </div>
            
            <div className="flex-1 pt-1">
              <p className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors">
                {event.title}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CosmicEventsWidget;
