/** @type {import('tailwindcss').Config} */
module.exports = {
  // Le decimos a Tailwind en qué ficheros buscar clases CSS
  content: [
    "./App.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
  ],
  // Preset especial de NativeWind que adapta Tailwind a React Native
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
