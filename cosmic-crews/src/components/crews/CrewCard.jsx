import { Users, MapPin } from 'lucide-react';

const CrewCard = ({ 
  title = "Deep Sky Navigators",
  memberCount = 42,
  description = "A group of passionate amateur astronomers exploring deep sky objects.",
  image = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop",
  buttonText = "Request to Join",
  buttonVariant = "solid",
  location = "Global / Online",
  onClick
}) => {
  const getButtonStyles = () => {
    if (buttonVariant === 'solid') {
      return "bg-purple-600 hover:bg-purple-700 text-white border border-transparent";
    }
    if (buttonVariant === 'outline') {
      return "bg-transparent hover:bg-[#1A2240] text-purple-400 border border-purple-500";
    }
    return "bg-purple-600 hover:bg-purple-700 text-white border border-transparent";
  };

  return (
    <div className="bg-[#0F1428] border border-slate-800 rounded-xl overflow-hidden flex flex-col">
      <img 
        src={image} 
        alt={title} 
        className="h-32 w-full object-cover" 
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        
        <div className="flex items-center gap-4 mt-1">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm">{memberCount} Members</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-500" />
            <span className="text-slate-400 text-sm">{location}</span>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm mt-2 line-clamp-2 flex-grow">
          {description}
        </p>

        <button 
          onClick={onClick}
          className={`mt-4 w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${getButtonStyles()}`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CrewCard;
