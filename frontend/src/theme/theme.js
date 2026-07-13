import { createTheme } from "@mui/material/styles";

export function getTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#c084fc" : "#aa3bff",
      },
      background: {
        default: mode === "dark" ? "#16171d" : "#fff",
      },
      text: {
        primary: mode === "dark" ? "#f3f4f6" : "#08060d",
        secondary: mode === "dark" ? "#9ca3af" : "#6b6375",
      },
    },
    typography: {
      fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
      fontSize: 18,
      h1: {
        fontSize: "56px",
        fontWeight: 500,
        letterSpacing: "-1.68px",
        margin: "32px 0",
        "@media (max-width:1024px)": {
          fontSize: "36px",
          margin: "20px 0",
        },
      },
      h2: {
        fontSize: "24px",
        fontWeight: 500,
        lineHeight: "118%",
        letterSpacing: "-0.24px",
        margin: "0 0 8px",
        "@media (max-width:1024px)": {
          fontSize: "20px",
        },
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            letterSpacing: "0.18px",
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          },
          "#root": {
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          },
          code: {
            fontFamily: "ui-monospace, Consolas, monospace",
            fontSize: "15px",
            lineHeight: "135%",
            padding: "4px 8px",
            background: mode === "dark" ? "#1f2028" : "#f4f3ec",
            color: mode === "dark" ? "#f3f4f6" : "#08060d",
            display: "inline-flex",
            borderRadius: "4px",
          },
        },
      },
    },
  });
}
