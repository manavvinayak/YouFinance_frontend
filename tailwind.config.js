/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo 600
        secondary: "#6366F1", // Indigo 500
        accent: "#818CF8", // Indigo 400
        background: "#F8FAFC", // Slate 50
        text: "#1E293B", // Slate 900
        card: "#FFFFFF",
        border: "#E2E8F0", // Slate 200
        success: "#10B981", // Green 500
        danger: "#EF4444", // Red 500
      },
      backgroundImage: {
        "hero-pattern": "url('/sample.png')",
      },
    },
  },
  plugins: [],
}
