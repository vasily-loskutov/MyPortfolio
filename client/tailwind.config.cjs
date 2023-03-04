/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "header-font": ["Poppins", "sans-serif"],
      "header-regular": ["Poppins Regular", "sans-serif"],
      "DM-sans": ["DM Sans", "sans-serif"],
      "DM-sans-medium": ["DM Sans Medium", "sans-serif"],
      "DM-sans-bold": ["DM Sans Bold", "sans-serif"],
    },

    extend: {
      boxShadow: {
        castom: " 0px 5px 35px rgba(0, 0, 0, 0.25);",
      },
      colors: {
        accentBlack: "#171718",
        violet: "#5C62EC",
        violetHover: "#5C73EC",
        dividerColor: "#26292D",
      },
      flex: {
        2: "1 0 auto",
      },
      height: {
        1: "3px",
      },
      width: {
        630: "630px",
        35.5: "35.5rem",
      },
    },
  },
  plugins: [],
};
