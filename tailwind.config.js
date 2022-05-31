module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "380px",
      md: "420px",
      lg: "680px",
      // or maybe name them after devices for `tablet:flex-row`
      tablet: "1024px",
    },
    colors: {
      primary: "#000CFF",
      "primary-content": "#ffffff",
      secondary: "#000229",
      accent: "#EA1D24",
      "accent-content": "#ffffff",
      // info: "#ccd6f6",
      warning: "#F4C316",
      // icon: "#a8b2d0",
    },
  },
  plugins: [],
};
