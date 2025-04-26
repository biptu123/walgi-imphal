/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["Helvetica-Regular"],
        "helvetica-bold": ["Helvetica-Bold"],
        "helvetica-extraBold": ["Helvetica-ExtraBold"],
        "helvetica-light": ["Helvetica-Light"],
        "helvetica-medium": ["Helvetica-Medium"],
        "helvetica-thin": ["Helvetica-Thin"],
        "helvetica-extLt": ["Helvetica-ExtLt"],
      },
    },
  },
  plugins: [],
};
