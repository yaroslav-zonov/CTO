/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.tpl",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        text: '#212121',
        accent: '#fc5621',
        details: 'rgba(33, 33, 33, 0.1)',
        background: '#ffffff',
        'inverted-text': '#ffffff',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: '#030213',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: '#ececf0',
          foreground: '#717182',
        },
        'accent-bg': 'var(--accent-bg)',
        destructive: {
          DEFAULT: '#d4183d',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        'input-background': '#f3f3f5',
        'switch-background': '#cbced4',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'Inter Fallback', 'sans-serif'],
        mono: ['Geist Mono', 'Geist Mono Fallback', 'monospace'],
      },
      maxWidth: {
        'content': '1312px',
      },
    },
  },
  plugins: [],
}
