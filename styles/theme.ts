export const colors = {
  // Colors
  primary: "#FFBB00",
  // primary: "#EAB845",
  white: "#FFFFFF",
  liteGrey: "#F9F9F9",
  blue: "#0082df",
  red: "#ff3f00",

  // Text
  liteText: "#DDDDDD",
  text: "#8A8A8A",
  // darkText: "#3D4B50",
  darkText: "#5c6e75",

  // Backgrounds
  darkBackground: "#1E1F20",

  // Border
  border: "#EDEDED",

  // Status
  success: "#2AD955",
  error: "#FF6D26",
};

export const fonts = {
  // base:
  //   '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
  base: '"Ubuntu Mono", Monaco, monospace',
  mono: '"Ubuntu Mono", Monaco, monospace',
  title: "RoadRage, sans-serif",
};

export const sizes: { [key: string]: number } = {
  xlarge: 1280,
  large: 1024,
  medium: 768,
  small: 568,
};

export interface StyledTheme {
  colors: { [key in keyof typeof colors]: string };
  fonts: { [key in keyof typeof fonts]: string };
  sizes: { [key in keyof typeof sizes]: number };
}

const theme: StyledTheme = {
  colors,
  fonts,
  sizes,
};

export default theme;
