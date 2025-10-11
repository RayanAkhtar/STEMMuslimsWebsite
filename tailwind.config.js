module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'stemm-blue': 'var(--stemm-blue)',
        'stemm-lighter-blue': 'var(--stemm-lighter-blue)',
        'stemm-darker-blue': 'var(--stemm-darker-blue)',
        'isoc-gold': 'var(--isoc-gold)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
    },
  },
  plugins: [],
}