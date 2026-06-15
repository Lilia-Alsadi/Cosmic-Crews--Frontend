import React from 'react';
import { Flag, AlertTriangle, Check, Trash2 } from 'lucide-react';

const mockFlaggedItems = [
  {
    id: 1,
    flagCount: 3,
    reason: 'Inappropriate Content',
    user: '@StarSpammer',
    thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=150&auto=format&fit=crop',
    content: 'Check out my crypto site to buy stars!!! Not a scam! Link in bio.',
  },
  {
    id: 2,
    flagCount: 5,
    reason: 'Off-topic / Spam',
    user: '@RandomBot22',
    thumbnail: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=150&auto=format&fit=crop',
    content: 'Selling cheap telescopes, dm me.',
  }
];

const FlaggedItemCard = ({ item }) => {
  return (
    <div className="bg-[#070A14] border border-red-500/30 rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        <p className="text-xs text-red-400 font-medium">
          Flagged by {item.flagCount} users for: <span className="text-slate-300 font-normal">{item.reason}</span>
        </p>
      </div>

      <div className="flex gap-3 bg-slate-900/40 p-3 rounded-md border border-slate-800">
        <img src={item.thumbnail} alt="thumbnail" className="w-16 h-16 object-cover rounded border border-slate-700" />
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-purple-400 mb-1">{item.user}</span>
          <p className="text-sm text-slate-300 line-clamp-2">{item.content}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-1">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 transition-colors text-xs font-semibold">
          <Check className="w-3.5 h-3.5" />
          Keep Log (Dismiss Flag)
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white transition-colors text-xs font-semibold shadow-[0_0_10px_rgba(220,38,38,0.3)]">
          <Trash2 className="w-3.5 h-3.5" />
          Delete Observation
        </button>
      </div>
    </div>
  );
};

const ContentModerationQueue = () => {
  return (
    <div className="bg-[#0F1428] border border-slate-800 rounded-xl p-6 flex flex-col h-full">
      
      <div className="flex items-center gap-2 mb-4">
        <Flag className="w-5 h-5 text-red-500" />
        <h2 className="text-xl font-bold text-white">Moderation Queue</h2>
      </div>

      <div className="overflow-y-auto custom-scrollbar gap-4 flex flex-col mt-4 pr-2 pb-4">
        {mockFlaggedItems.map(item => (
          <FlaggedItemCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
};

export default ContentModerationQueue;
