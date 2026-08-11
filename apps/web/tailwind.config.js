/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Archival Modern palette ──────────────────────────────────────────
        'forest-green': '#18362F',
        'deep-green':   '#10211D',
        'gold':         '#DAB15C',
        'ivory':        '#F6F0E6',
        'sand':         '#B8A891',
        'dark-neutral': '#0B1311',
        'text-primary': '#111111',
        'text-secondary': '#4A4A4A',
        'success':      '#2E7D32',
        'warning':      '#F9A825',
        'error':        '#C62828',

        // ── Phase 6 spec tokens ────────────────────────────────────────────
        'cream':        '#FDFBF7',
        'ochre':        '#966F33',
        'vyom-green':   '#0F4C3A',

        // ── VYOM brand tokens (legacy — kept for backward compat) ────────────
        brand: {
          50:  '#f0f4ff',
          100: '#dce6ff',
          500: '#3b5bdb',
          600: '#2f4cc4',
          700: '#2340a8',
          900: '#132260',
        },

        // ── CSS variable-based semantic tokens ───────────────────────────────
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },

      // ── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        display: ['Playfair Display Variable', 'Georgia', 'serif'],
        body:    ['Inter Variable', 'system-ui', 'sans-serif'],
        sans:    ['Inter Variable', 'system-ui', 'sans-serif'],
        serif:   ['Playfair Display Variable', 'Georgia', 'serif'],
      },

      fontSize: {
        // Archival Modern type scale
        'display':     ['4.5rem', { lineHeight: '5rem',   fontWeight: '700' }],
        'hero':        ['3.5rem', { lineHeight: '4rem',   fontWeight: '700' }],
        'section':     ['2.5rem', { lineHeight: '3rem',   fontWeight: '600' }],
        'sub-heading': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        // body, caption, metadata — base Tailwind covers body (1rem/1.5rem)
        'caption':     ['0.875rem', { lineHeight: '1.25rem' }],
        'metadata':    ['0.75rem',  { lineHeight: '1rem' }],
      },

      // ── Border radius ───────────────────────────────────────────────────────
      borderRadius: {
        lg: '0.625rem',
        md: '0.5rem',
        sm: '0.375rem',
      },

      // ── Box shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        'card':     '0 4px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.15)',
        'gold-focus': '0 0 0 3px rgba(218,177,92,0.45)',
      },

      // ── Key-frame animations ─────────────────────────────────────────────────
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0'  },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 1500ms linear infinite',
        'fade-up': 'fadeUp 600ms ease-out forwards',
        'fade-in': 'fadeIn 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
