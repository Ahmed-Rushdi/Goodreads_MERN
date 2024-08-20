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
        "white-blue": "#fbebe1;",
        "light-cream": "#F5F3E0",
        "olive-green": "#6B705C",
        "active-nav": "#55664d",
        "hover-nav": "#7f8a5c",
        buff: "#D4A373",
      },
    },
  },
  plugins: [],
};
