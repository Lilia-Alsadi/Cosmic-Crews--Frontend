/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          'navy':        '#0a0e1a',
          'navy-mid':    '#0d1426',
          'navy-deep':   '#060a14',
          'indigo':      '#1e1b4b',
          'indigo-mid':  '#312e81',
          'purple':      '#7c3aed',
          'purple-light':'#a855f7',
          'purple-glow': '#c084fc',
          'neon-blue':   '#38bdf8',
          'neon-pink':   '#f472b6',
          'neon-cyan':   '#22d3ee',
          'star-white':  '#f0f4ff',
          'star-muted':  '#94a3b8',
          'star-dim':    '#475569',
        },
      },

      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },

      backgroundImage: {
        'cosmic-radial':    'radial-gradient(ellipse at center, #1e1b4b 0%, #0a0e1a 70%)',
        'hero-gradient':    'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.3) 0%, transparent 60%), linear-gradient(180deg, #0d1426 0%, #0a0e1a 100%)',
        'card-glass':       'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'neon-blue-glow':   'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
        'neon-purple-glow': 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)',
        'aurora':           'linear-gradient(135deg, rgba(124,58,237,0.4) 0%, rgba(56,189,248,0.2) 50%, rgba(244,114,182,0.3) 100%)',
      },

      boxShadow: {
        'neon-blue':   '0 0 20px rgba(56, 189, 248, 0.4), 0 0 60px rgba(56, 189, 248, 0.15)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.15)',
        'neon-pink':   '0 0 20px rgba(244, 114, 182, 0.4), 0 0 60px rgba(244, 114, 182, 0.15)',
        'glass':       '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card':        '0 4px 24px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover':  '0 8px 40px rgba(124, 58, 237, 0.3), 0 1px 0 rgba(255,255,255,0.1)',
        'inner-glow':  'inset 0 0 30px rgba(124, 58, 237, 0.1)',
      },

      borderRadius: {
        'xl2': '1.25rem',
        'xl3': '1.5rem',
      },

      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(168,85,247,0.4), 0 0 30px rgba(168,85,247,0.1)' },
          '50%':      { boxShadow: '0 0 25px rgba(168,85,247,0.8), 0 0 60px rgba(168,85,247,0.3)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':      { opacity: '0.3', transform: 'scale(0.7)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'shoot': {
          '0%':   { transform: 'translateX(-100px) translateY(0) scaleX(0)', opacity: '0' },
          '10%':  { opacity: '1' },
          '100%': { transform: 'translateX(300px) translateY(80px) scaleX(1)', opacity: '0' },
        },
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'nebula-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%':      { transform: 'translate(-20px, 15px) scale(0.98)' },
        },
        'gradient-shift': {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },

      animation: {
        'glow-pulse':    'glow-pulse 2.5s ease-in-out infinite',
        'twinkle':       'twinkle 3s ease-in-out infinite',
        'twinkle-slow':  'twinkle 5s ease-in-out infinite',
        'twinkle-fast':  'twinkle 1.5s ease-in-out infinite',
        'float':         'float 4s ease-in-out infinite',
        'float-slow':    'float 7s ease-in-out infinite',
        'spin-slow':     'spin-slow 20s linear infinite',
        'shoot':         'shoot 2s ease-in-out forwards',
        'fade-in-up':    'fade-in-up 0.7s ease-out forwards',
        'fade-in':       'fade-in 0.5s ease-out forwards',
        'nebula-drift':  'nebula-drift 12s ease-in-out infinite',
        'gradient-shift':'gradient-shift 6s ease infinite',
      },

      backdropBlur: {
        xs: '2px',
      },

      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
