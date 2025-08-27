/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/app/styles/global.css"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E6FAF7",
          100: "#D7F6F3",
          200: "#B3EEE9",
          300: "#7FE1D9",
          400: "#44CCC2",
          500: "#28B2AA",
          600: "#249695",
          700: "#24797A",
          800: "#256365",
          900: "#235256",
          950: "#12373A",
        },
        neutral: {
          0: "#FFFFFF",
          50: "#F6F7F9",
          100: "#EBEED3",
          200: "#D4DAE3",
          300: "#AEBACB",
          400: "#8195AF",
          500: "#627795",
          600: "#4D5F7C",
          700: "#3F4D65",
          800: "#364153",
          900: "#313949",
          950: "#212630",
        },
        feedback: {
          danger: {
            200: "#FFC9C9",
            400: "#FF6467",
            500: "#FB2C36",
          },
          warning: {
            200: "#FFF085",
            300: "#FFDF20",
            400: "#FDC700",
          },
        },
      },
      fontFamily: {
        "inter-regular": "Inter_400Regular",
        "inter-medium": "Inter_500Medium",
        "inter-semi-bold": "Inter_600SemiBold",
        "inter-bold": "Inter_700Bold",
        "inter-extra-bold": "Inter_800ExtraBold",
 
        "nunito-regular": "Nunito_400Regular",
        "nunito-medium": "Nunito_500Medium",
        "nunito-semi-bold": "Nunito_600SemiBold", 
        "nunito-bold": "Nunito_700Bold",
      },
    },
  },
  plugins: [],
};

