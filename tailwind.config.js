/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "todo-item": "1fr repeat(3,auto)",
      },
      colors: {
        primary: "#3d405b",
        background: "#f4f1de",
        accent: "#e07a5f",
      },
    },
  },
  plugins: [],
};
