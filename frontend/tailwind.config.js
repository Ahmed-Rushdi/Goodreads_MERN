/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'tea-green': '#ccd5ae',
        'beige': '#e9edc9',
        'corn-silk': '#fefae0',
        'papaya-whip': '#faedcd',
        'buff': '#d4a373',
      },
    }
  },
  plugins: [],
};