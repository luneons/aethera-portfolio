/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          900: '#050505',
          800: '#0a0a0a',
          700: '#111111',
          600: '#1a1a1a',
        },
        crimson: '#dc143c',
        blood: '#8b0000',
        maroon: '#6b0f1a',
        neon: '#00d4ff',
        electric: '#00d4ff',
        violet: '#dc143c',
        cyan: '#00d4ff',
        steel: '#3a3f47',
        metallic: '#6b7280',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Poppins', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(220,20,60,0.4)',
        'glow-violet': '0 0 24px rgba(220,20,60,0.5)',
        'glow-cyan': '0 0 24px rgba(0,212,255,0.35)',
        'glow-crimson': '0 0 30px rgba(220,20,60,0.6)',
        mission: '0 0 40px rgba(220,20,60,0.3), inset 0 0 30px rgba(0,0,0,0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slash: {
          '0%': { transform: 'translateX(-100%) rotate(-45deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%) rotate(-45deg)', opacity: '0' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        gradient: 'gradient 6s ease infinite',
        slash: 'slash 2s ease-in-out infinite',
        'scan-line': 'scan-line 3s linear infinite',
        flicker: 'flicker 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
