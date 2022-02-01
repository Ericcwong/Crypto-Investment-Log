module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Background blur for modal
        "nav-bg": "#96ACBB",
        "assets-bg": "#A5BDCE",
        "main-bg": "#8AA1B1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
