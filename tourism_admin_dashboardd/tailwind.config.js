module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // blue-600
          50: "#EFF6FF", // blue-50
          100: "#DBEAFE", // blue-100
          500: "#3B82F6", // blue-500
          600: "#2563EB", // blue-600
          700: "#1D4ED8", // blue-700
          900: "#1E3A8A", // blue-900
        },
        secondary: {
          DEFAULT: "#059669", // emerald-600
          50: "#ECFDF5", // emerald-50
          100: "#D1FAE5", // emerald-100
          500: "#10B981", // emerald-500
          600: "#059669", // emerald-600
          700: "#047857", // emerald-700
        },
        accent: {
          DEFAULT: "#0891B2", // cyan-600
          50: "#ECFEFF", // cyan-50
          100: "#CFFAFE", // cyan-100
          500: "#06B6D4", // cyan-500
          600: "#0891B2", // cyan-600
          700: "#0E7490", // cyan-700
        },
        background: "#F8FAFC", // slate-50
        surface: "#FFFFFF", // white
        text: {
          primary: "#1E293B", // slate-800
          secondary: "#64748B", // slate-500
        },
        success: {
          DEFAULT: "#10B981", // emerald-500
          50: "#ECFDF5", // emerald-50
          100: "#D1FAE5", // emerald-100
        },
        warning: {
          DEFAULT: "#F59E0B", // amber-500
          50: "#FFFBEB", // amber-50
          100: "#FEF3C7", // amber-100
        },
        error: {
          DEFAULT: "#EF4444", // red-500
          50: "#FEF2F2", // red-50
          100: "#FEE2E2", // red-100
        },
        border: {
          DEFAULT: "#E2E8F0", // slate-200
          light: "#F1F5F9", // slate-100
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'tourism': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'tourism-md': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'tourism-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'modal': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '8px',
        'button': '4px',
        'input': '4px',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
      },
      transitionTimingFunction: {
        'tourism': 'ease-out',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'pulse-tourism': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'success-bounce': 'success-bounce 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: '0.4',
          },
          '50%': {
            opacity: '0.8',
          },
        },
        'success-bounce': {
          '0%': {
            transform: 'scale(0.95)',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.transition-tourism': {
          transition: 'all 200ms ease-out',
        },
        '.transition-tourism-normal': {
          transition: 'all 300ms ease-out',
        },
        '.transition-spring': {
          transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        '.micro-interaction': {
          transition: 'all 200ms ease-out',
        },
        '.micro-interaction:hover': {
          transform: 'scale(1.02)',
        },
        '.data-card': {
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          transition: 'all 200ms ease-out',
        },
        '.data-card:hover': {
          borderColor: '#0891B2',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        },
        '.sidebar-nav': {
          transition: 'width 300ms ease-out',
        },
        '.loading-pulse': {
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}