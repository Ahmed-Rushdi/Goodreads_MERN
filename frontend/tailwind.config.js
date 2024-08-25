/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "tea-green": "#CCD5AE",
        beige: "#E9EDC9",
        creamy: "#FEFAE0",
        "papaya-whip": "#FAEDCD",
        "white-blue": "#fbebe1;",
        "corn-silk": "#fffdf2;",
        "light-cream": "#F5F3E0",
        "olive-green": "#6B705C",
        "active-nav": "#55664d",
        "hover-nav": "#7f8a5c",
        buff: "#D4A373",
        "light-beige": "#ddd0c8",
        "light-brown": "#e9e7dd",
        Narvik: "#EAE7DD",
        "dark-grey": "#323232",
        "warm-neutral": "#F0EBE3",
      },
    },
  },
  plugins: [],
};
