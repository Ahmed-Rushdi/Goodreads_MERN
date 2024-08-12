/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "tea-green": "#CCD5AE",
        beige: "#E9EDC9",
        "corn-silk": "#FEFAE0",
        "papaya-whip": "#FAEDCD",
        buff: "#D4A373",
      },
    },
  },
  plugins: [],
};
