const HeartIcon   = (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const CommentIcon = (p) => <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;

const CARDS = [
  {
    id:        "card-astro-nova",
    image:     "/img-nebula.png",
    imageAlt:  "Deep space nebula",
    avatar:    { initials: "AN", bg: "linear-gradient(135deg,#7c3aed,#a855f7)" },
    username:  "AstroNova",
    timeAgo:   "2h ago",
    quote:     "Finally caught Orion's Belt clearly — Bortle 4, surprisingly steady seeing tonight.",
    hearts:    24,
    comments:  5,
  },
  {
    id:        "card-stargazer-99",
    image:     "/img-milkyway.png",
    imageAlt:  "Milky Way galaxy",
    avatar:    { initials: "S9", bg: "linear-gradient(135deg,#0891b2,#22d3ee)" },
    username:  "Stargazer_99",
    timeAgo:   "5h ago",
    quote:     "Got M31 despite the haze. Waited like two hours but totally worth it.",
    hearts:    47,
    comments:  12,
  },
  {
    id:        "card-lunar-lens",
    image:     "/img-moon.png",
    imageAlt:  "Crescent moon",
    avatar:    { initials: "LL", bg: "linear-gradient(135deg,#059669,#34d399)" },
    username:  "LunarLens",
    timeAgo:   "8h ago",
    quote:     "That earthshine on the crescent tonight... couldn't stop staring.",
    hearts:    61,
    comments:  8,
  },
];

const ObservationCard = ({ id, image, imageAlt, avatar, username, timeAgo, quote, hearts, comments }) => (
  <article
    id={id}
    className="flex flex-col rounded-2xl overflow-hidden bg-slate-900/40 border border-white/5 hover:border-purple-500/20 shadow-lg hover:-translate-y-1 transition-all duration-300 group"
  >
    <div className="relative aspect-[16/10] overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      <span className="absolute top-3 right-3 text-[11px] text-slate-300 bg-slate-950/60 backdrop-blur-md px-2 py-0.5 rounded-full">
        {timeAgo}
      </span>
    </div>

    <div className="relative flex flex-col px-5 pb-5 pt-8 bg-slate-950/80 border-t border-white/5 flex-grow justify-between">
      <div className="absolute -top-5 left-5 flex items-center gap-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: avatar.bg, boxShadow: "0 0 0 2px #0a0e1a" }}
          aria-label={`${username}'s avatar`}
        >
          {avatar.initials}
        </div>
        <span className="text-sm font-semibold text-white">{username}</span>
      </div>

      <p className="italic text-sm text-slate-400 leading-relaxed min-h-[50px] mt-1">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center gap-4 pt-3 mt-4 border-t border-white/5 text-xs text-slate-500">
        <button
          id={`${id}-heart`}
          className="flex items-center gap-1.5 hover:text-pink-400 transition-colors duration-200"
          aria-label={`${hearts} likes`}
        >
          <HeartIcon className="w-3.5 h-3.5" />
          {hearts}
        </button>
        <button
          id={`${id}-comment`}
          className="flex items-center gap-1.5 hover:text-sky-400 transition-colors duration-200"
          aria-label={`${comments} comments`}
        >
          <CommentIcon className="w-3.5 h-3.5" />
          {comments}
        </button>
      </div>
    </div>
  </article>
);

const ObservatoryFeedPreview = () => (
  <section id="observatory-feed" className="relative py-24" aria-label="Observatory Feed">
    <div className="section-container">

      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white mb-2">
            What crews are seeing right now
          </h2>
          <p className="text-slate-400">Fresh logs from people out there tonight.</p>
        </div>
        <a
          href="#logs"
          id="feed-view-all"
          className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center gap-1.5 group"
        >
          View all logs
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="grid gap-6 grid-cols-3">
        {CARDS.map((card) => <ObservationCard key={card.id} {...card} />)}
      </div>

    </div>
  </section>
);

export default ObservatoryFeedPreview;

