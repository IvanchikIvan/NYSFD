export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '768px',
        'md': '1024px',
        'lg': '1280px',
        'xl': '1536px',
      }
    }
  },
  plugins: []
};
