import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Feed", href: "/#observatory-feed" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="main-navbar" className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${scrolled ? "bg-slate-950/90 border-b border-white/10 shadow-lg shadow-black/40" : "bg-slate-950/40 border-b border-transparent"}`}>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="section-container grid h-16" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
        <div className="flex items-center">
          <a href="/" id="nav-logo" className="flex items-center gap-2 group">
            <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
            </svg>
            <span className="font-display font-bold text-base text-white tracking-wide">
              Cosmic
              <span className="text-purple-400 font-light ml-0.5">Crews</span>
            </span>
          </a>
        </div>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link to="/login" id="nav-login-btn" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200">
            Login
          </Link>
          <Link to="/register" id="nav-register-btn" className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/35 transition-all duration-200">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
