module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  purge: [],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Background blur for modal
        "background-blur": "rgba(10, 30, 66, 0.4)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
