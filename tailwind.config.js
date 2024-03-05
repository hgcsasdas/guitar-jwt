/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#9ca3af",

          secondary: "#d1d5db",

          accent: "#0369a1",

          neutral: "#374151",

          "base-100": "#dbeafe",

          info: "#bfdbfe",

          success: "#4ade80",

          warning: "#f97316",

          error: "#dc2626",
        },
      },
    ],
  },
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
