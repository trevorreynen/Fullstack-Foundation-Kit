/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}', // Scan all TSX/TS files
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // 🧼 disables Tailwind's global resets (so SCSS can stay in control)
  },
  plugins: [],
}
