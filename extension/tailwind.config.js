const {
  iconsPlugin,
  getIconCollections,
} = require("@egoist/tailwindcss-icons");

module.exports = {
  content: ["./dist/**/*.js"],

  theme: {
    extend: {},
  },

  variants: {
    extend: {},
  },

  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all icon collections you have installed
      collections: getIconCollections(["mdi", "logos", "flat-color-icons"]),
    }),
  ],
};
