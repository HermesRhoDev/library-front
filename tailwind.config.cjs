/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-waves-dark": "url('/src/assets/images/bg_waves_dark.png')",
      },
      colors: {
        primary: "#231F20",
        secondary: "#F2F4F5",
        pink: "#e46066",
      },
    },
  },
  plugins: [],
};
