/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: "Josefin Sans",
      },
      colors: {
        main: {
          red: "#dc143c",
          redHover: "#da3354",
          activate: "#da3354",
          banana: "#b5e745",
          black: "#0f1416",
        },
        secondary: {
          hover: "#78909c",
        },
      },
    },
  },
  plugins: [],
};
