module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // For Dark Mode
        darkBgColor: "#192428",
        darkPrimaryFgColor: "#2299ff",
        darkSecondaryFgColor: "#dce0df",
        darkElevationColor: "#2d383c",
        darkSpecificIconsColor: "#d0d0d0",
        darkTextFieldInnerColor: "#313131",
        darkPostTextStyleColor: "#e4e6eb",

        // For Light Mode
        lightBgColor: "#f3f3f3",
        lightPrimaryFgColor: "#2299ff",
        lightSecondaryFgColor: "#595959",
        lightElevationColor: "#ffffff",
        lightSpecificIconsColor: "#606060",
        lightTextFieldInnerColor: "#DCE0DF",
        lightPostTextStyleColor: "#000000",
      },

      screens: {
        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",

        "2xl": "2550px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
