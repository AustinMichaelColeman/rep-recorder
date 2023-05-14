/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        light: {
          heading: "#000000",
          label: "#000000",
          background: "#C7D2FE",
          button: {
            background: "#3B82F6",
            text: "#000000",
          },
        },
        dark: {
          heading: "#FFFFFF",
          background: "#364E7F",
          label: "#FFFFFF",
          button: {
            background: "red",
            text: "#FFFFFF",
          },
        },
      },
    },
  },
  plugins: [],
};
