import { createTheme } from "@mui/material/styles";
import components from "./overrides";

const lightPalette = {
  mode: "light" as const,
  background: {
    default: "#FAF9F6",
    paper: "#FFFDF7",
  },
  primary: {
    main: "#FFD600",
    contrastText: "#222222",
  },
  secondary: {
    main: "#757575",
  },
  text: {
    primary: "#222222",
    secondary: "#757575",
    disabled: "#BDBDBD",
  },
  divider: "#F5E7B2",
};

const typography = {
  fontFamily: [
    "-apple-system",
    "system-ui",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ].join(","),
  h1: {
    fontWeight: 700,
    fontSize: "2.1rem",
    letterSpacing: "-0.5px",
    lineHeight: 1.1,
  },
  h2: {
    fontWeight: 600,
    fontSize: "1.7rem",
    lineHeight: 1.15,
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: 1.2,
  },
  h4: {
    fontWeight: 500,
    fontSize: "1.1rem",
    lineHeight: 1.25,
  },
  h5: {
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.3,
  },
  h6: {
    fontWeight: 500,
    fontSize: "0.95rem",
    lineHeight: 1.35,
  },
  body1: {
    fontSize: "0.98rem",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: "0.92rem",
    color: lightPalette.text.secondary,
    lineHeight: 1.5,
  },
  button: {
    textTransform: "none" as const,
    fontWeight: 500,
    fontSize: "0.98rem",
    letterSpacing: 0,
  },
};

const shape = {
  borderRadius: 18,
};

const shadows: [
  "none",
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
] = [
  "none",
  "0px 2px 12px 0px rgba(60,60,67,0.08)",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
];

export default function getTheme() {
  return createTheme({
    palette: lightPalette,
    typography,
    shape,
    components,
    shadows,
  });
}
