import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.5rem" }], // 36px
        h2: ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        h3: ["1.5rem", { lineHeight: "2rem" }], // 24px
        h4: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
      },
      fontFamily: {
        roboto: ["Roboto Mono", "monospace"], // Add Roboto Mono as a font family
      },
      colors: {
        'popPurple': '#d0a4dc'
      },
    },
  },
  corePlugins: {
    preflight: true, // Ensure preflight is enabled
  },
  plugins: [],
} satisfies Config;
