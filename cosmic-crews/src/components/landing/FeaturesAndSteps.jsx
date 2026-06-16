const CloudIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);
const CameraIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);
const UsersIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const UserIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const TargetIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="22" y1="12" x2="18" y2="12" />
    <line x1="6" y1="12" x2="2" y2="12" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="12" y1="22" x2="12" y2="18" />
  </svg>
);
const TelescopeIcon = (p) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2" />
    <path d="M12 8 9.5 10.5" />
    <path d="m15 4-3.5 3.5" />
    <path d="M22 2s-4 .5-7 3.5-5 7-5 7l4 4s4-2 7-5 3.5-7 3.5-7Z" />
  </svg>
);

const FEATURES = [
  {
    id: "clear-skies",
    Icon: CloudIcon,
    title: "Clear Skies Dashboard",
    text: "See tonight's sky quality, cloud cover, and the best window to head outside — all in one place.",
  },
  {
    id: "obs-logs",
    Icon: CameraIcon,
    title: "Observation Logs",
    text: "Write up what you saw, note your Bortle class, attach a photo. Simple as a journal, shareable like a feed.",
  },
  {
    id: "crews",
    Icon: UsersIcon,
    title: "Constellation Crews",
    text: "Plan a night out with your crew, share a spot, and see what everyone else is looking at.",
  },
];

const STEPS = [
  { number: 1, Icon: UserIcon, title: "Set up your profile" },
  { number: 2, Icon: TargetIcon, title: "Find your next clear night" },
  { number: 3, Icon: TelescopeIcon, title: "Log it and share with your crew" },
];

const FeatureCard = ({ id, Icon, title, text }) => (
  <div id={`feature-${id}`} className="rounded-2xl p-7 flex flex-col gap-4 bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/5 hover:border-purple-500/30 hover:bg-white/[0.04] shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/25">
      <Icon className="w-5 h-5 text-purple-400" />
    </div>

    <div className="flex flex-col gap-1.5">
      <h3 className="font-display font-semibold text-lg text-white">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
    </div>
  </div>
);

const StepItem = ({ number, Icon, title }) => (
  <div id={`step-${number}`} className="flex flex-col items-center text-center gap-3 relative z-10">
    <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-purple-500/50 bg-slate-900 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
      <Icon className="w-8 h-8 text-purple-400" />
    </div>
    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-purple-400">Step {number}</span>
    <p className="font-semibold text-sm text-white max-w-[160px] leading-snug">{title}</p>
  </div>
);

const FeaturesAndSteps = () => (
  <section id="features" className="relative py-24" aria-label="Features and How It Works">
    <div className="section-container">
      <div className="mb-12">
        <h2 className="font-display text-4xl font-bold text-white mb-3">What you get</h2>
        <p className="text-slate-400 text-lg">Everything a serious stargazer needs, without the clutter.</p>
      </div>

      <div className="grid gap-6 mb-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <FeatureCard key={f.id} {...f} />
        ))}
      </div>

      <div className="mb-20 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="text-center mb-14">
        <h2 id="how-it-works" className="font-display text-4xl font-bold text-white mb-3">
          How it works
        </h2>
        <p className="text-slate-400 text-lg">Three steps and you're out there.</p>
      </div>

      <div className="relative">
        <div className="absolute top-10 h-px left-[16.6%] right-[16.6%] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Steps to get started">
          {STEPS.map((s) => (
            <StepItem key={s.number} {...s} />
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default FeaturesAndSteps;
