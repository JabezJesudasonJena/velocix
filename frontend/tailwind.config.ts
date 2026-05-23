import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-container-high": "#e6e8ea",
        "ai-purple": "#B8A4ED",
        "on-secondary-fixed": "#131b2e",
        "surface-dim": "#d8dadc",
        "on-primary": "#ffffff",
        "on-background": "#191c1e",
        "surface": "#f7f9fb",
        "outline": "#6e7b6c",
        "inverse-on-surface": "#eff1f3",
        "background": "#f7f9fb",
        "on-surface-variant": "#3e4a3d",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed": "#ffd9de",
        "error": "#ba1a1a",
        "delivery-peach": "#FFB084",
        "surface-container": "#eceef0",
        "on-secondary-container": "#5c647a",
        "surface-variant": "#e0e3e5",
        "on-secondary-fixed-variant": "#3f465c",
        "accent-yellow": "#FACC15",
        "surface-container-highest": "#e0e3e5",
        "tertiary-fixed-dim": "#ffb2bf",
        "on-surface": "#191c1e",
        "secondary": "#565e74",
        "outline-variant": "#bdcaba",
        "on-secondary": "#ffffff",
        "surface-tint": "#006e2d",
        "on-error": "#ffffff",
        "secondary-container": "#dae2fd",
        "tertiary": "#a72d51",
        "primary-container": "#00873a",
        "inverse-surface": "#2d3133",
        "on-primary-container": "#f7fff2",
        "surface-container-low": "#f2f4f6",
        "glass-stroke": "rgba(255, 255, 255, 0.4)",
        "primary-fixed": "#7ffc97",
        "on-tertiary-fixed": "#3f0016",
        "on-tertiary-fixed-variant": "#8a143c",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#fffbff",
        "on-primary-fixed-variant": "#005320",
        "inverse-primary": "#62df7d",
        "surface-bright": "#f7f9fb",
        "canvas-cream": "#FFFAF0",
        "tertiary-container": "#c74668",
        "primary-fixed-dim": "#62df7d",
        "secondary-fixed": "#dae2fd",
        "primary": "#006b2c",
        "on-primary-fixed": "#002109",
        "on-tertiary": "#ffffff",
        "error-container": "#ffdad6",
        "secondary-fixed-dim": "#bec6e0"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "margin-mobile": "16px",
        "gutter": "24px",
        "container-max": "1280px",
        "card-padding": "32px",
        "section-gap": "96px"
      },
      fontFamily: {
        "display-lg": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "display-xl": ["Inter", "sans-serif"],
        "display-xl-mobile": ["Inter", "sans-serif"],
        "title-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["56px", { lineHeight: "60px", letterSpacing: "-0.03em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "display-xl": ["72px", { lineHeight: "72px", letterSpacing: "-0.04em", fontWeight: "600" }],
        "display-xl-mobile": ["40px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "title-lg": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.1em", fontWeight: "600" }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/forms')
  ]
} satisfies Config;