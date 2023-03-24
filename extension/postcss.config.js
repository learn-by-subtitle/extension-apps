const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss,
    // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  ],
};