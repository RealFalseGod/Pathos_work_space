/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins-Regular', 'sans-serif'],
        'Poppins-bold': ['Poppins-Bold', 'sans-serif'],
        'Poppins-black': ['Poppins-Black', 'sans-serif'],
        'Poppins-blackItalic': ['Poppins-BlackItalic', 'sans-serif'],
        'Poppins-boldItalic': ['Poppins-BoldItalic', 'sans-serif'],
        'Poppins-extraBold': ['Poppins-ExtraBold', 'sans-serif'],
        'Poppins-extraBoldItalic': ['Poppins-ExtraBoldItalic', 'sans-serif'],
        'Poppins-extraLight': ['Poppins-ExtraLight', 'sans-serif'],
        'Poppins-extraLightItalic': ['Poppins-ExtraLightItalic', 'sans-serif'],
        'Poppins-italic': ['Poppins-Italic', 'sans-serif'],
        'Poppins-light': ['Poppins-Light', 'sans-serif'],
        'Poppins-lightItalic': ['Poppins-LightItalic', 'sans-serif'],
        'Poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'Poppins-mediumItalic': ['Poppins-MediumItalic', 'sans-serif'],
        'Poppins-semiBold': ['Poppins-SemiBold', 'sans-serif'],
        'Poppins-semiBoldItalic': ['Poppins-SemiBoldItalic', 'sans-serif'],
        'Poppins-thin': ['Poppins-Thin', 'sans-serif'],
        'Poppins-thinItalic': ['Poppins-ThinItalic', 'sans-serif'],
      }
    },
  },
  plugins: [],
}