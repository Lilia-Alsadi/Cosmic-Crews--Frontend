const CosmicIllustration = () => (
  <div className="relative flex items-center justify-center w-full min-h-[350px]">
    <div className="absolute w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[320px] relative z-10 animate-float-slow" aria-label="Crescent moon and telescope illustration" role="img">
      <defs>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="scopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="40" r="1.5" fill="#c084fc" opacity="0.6" />
      <circle cx="170" cy="50" r="1" fill="#818cf8" opacity="0.5" />
      <circle cx="160" cy="130" r="1.5" fill="#f472b6" opacity="0.6" />
      <circle cx="45" cy="120" r="1" fill="#fff" opacity="0.4" />
      <ellipse cx="100" cy="160" rx="60" ry="18" fill="#1e1b4b" opacity="0.6" stroke="#4f46e5" strokeWidth="1" />
      <ellipse cx="100" cy="156" rx="45" ry="10" fill="#0f172a" />
      <path d="M 70 35 A 40 40 0 1 0 115 80 A 32 32 0 1 1 70 35 Z" fill="url(#moonGrad)" filter="url(#softGlow)" />
      <g transform="rotate(-25 105 110)">
        <line x1="100" y1="110" x2="75" y2="155" stroke="#4338ca" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="110" x2="125" y2="155" stroke="#4338ca" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="110" x2="100" y2="158" stroke="#312e81" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="100" cy="110" r="4" fill="#6366f1" />
        <rect x="98" y="102" width="4" height="10" rx="1" fill="#4f46e5" />

        <rect x="70" y="94" width="60" height="10" rx="5" fill="url(#scopeGrad)" />
        <rect x="80" y="87" width="20" height="4" rx="1" fill="#312e81" />
        <line x1="90" y1="91" x2="90" y2="94" stroke="#312e81" strokeWidth="1.5" />
        <rect x="65" y="97" width="6" height="4" fill="#312e81" />
        <rect x="128" y="93" width="3" height="12" rx="1" fill="#818cf8" />
      </g>
    </svg>
  </div>
);

const HeroSection = () => (
  <section id="hero" className="relative overflow-hidden py-24" aria-labelledby="hero-heading">
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(124,58,237,0.18),transparent_65%)]" />

    <div className="section-container relative z-10">
      <div className="grid items-center gap-16 grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 id="hero-heading" className="font-display font-bold text-5xl leading-tight tracking-tight text-white">
            Your Cozy Hub
            <br />
            Under the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Night Sky.</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed max-w-md">Keep a personal stargazing journal, check sky conditions, and connect with other observers. Built simply for people who love looking up.</p>

          <div>
            <a href="/register" id="hero-cta-btn" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 transition-all duration-300 group">
              Start Exploring
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
        <CosmicIllustration />
      </div>
    </div>
  </section>
);

export default HeroSection;
