/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.88)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.85) translateY(8px)" },
          "65%": { transform: "scale(1.04) translateY(-2px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.12" },
          "50%": { opacity: "0.30" },
        },
        heroOrb: {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.15" },
          "50%": { transform: "translateY(-18px) scale(1.08)", opacity: "0.28" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.08)" },
          "70%": { transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.6)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        flipIn: {
          "0%": { opacity: "0", transform: "rotateX(-90deg)" },
          "100%": { opacity: "1", transform: "rotateX(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        countUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        drawLine: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0px transparent" },
          "50%": { boxShadow: "0 0 20px rgba(var(--primary), 0.35)" },
        },
        swing: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.45s cubic-bezier(0.16,1,0.3,1) both",
        slideDown: "slideDown 0.55s cubic-bezier(0.16,1,0.3,1) both",
        slideUp: "slideUp 0.55s cubic-bezier(0.16,1,0.3,1) both",
        slideRight: "slideRight 0.55s cubic-bezier(0.16,1,0.3,1) both",
        scaleIn: "scaleIn 0.45s cubic-bezier(0.16,1,0.3,1) both",
        popIn: "popIn 0.55s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 5s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        heroOrb: "heroOrb 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        slideLeft: "slideLeft 0.55s cubic-bezier(0.16,1,0.3,1) both",
        bounceIn: "bounceIn 0.6s cubic-bezier(0.16,1,0.3,1) both",
        wiggle: "wiggle 0.6s ease-in-out",
        zoomIn: "zoomIn 0.4s cubic-bezier(0.16,1,0.3,1) both",
        flipIn: "flipIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
        gradientShift: "gradientShift 4s ease infinite",
        countUp: "countUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
        glow: "glow 2.5s ease-in-out infinite",
        swing: "swing 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
