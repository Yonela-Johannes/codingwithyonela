export const colorTokens = {
    grey: {
      0: "#FFFFFF",
      10: "#F6F6F6",
      50: "#F0F0F0",
      100: "#E0E0E0",
      200: "#C2C2C2",
      300: "#A3A3A3",
      400: "#858585",
      500: "#666666",
      600: "#4D4D4D",
      700: "#333333",
      800: "#1A1A1A",
      900: "#0A0A0A",
      1000: "#000000",
    },
    red: {
      400: "#ffbaba",
      500: "#ff7b7b",
      600: "#ff5252",
      700: "#ff0000",
      800: "#a70000",
    },
  };
  
  export const themeSetting = (mode) => {
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
          ? {
              // palette values for dark mode
              background: {
                default: colorTokens.grey[900],
                over: colorTokens.grey[700],
                icon: colorTokens.red[500],
              },
              typography: {
                title: colorTokens.grey[0],
                subtitle: colorTokens.grey[200],
                paragraph: colorTokens.grey[100],
              },
              icon: colorTokens.grey[100],
              logo: {
                normal: colorTokens.red[600],
                hover: colorTokens.red[800],
              },
            }
          : {
              // palette values for light mode
              background: {
                default: colorTokens.grey[50],
                over: colorTokens.grey[0],
                icon: colorTokens.red[400],
              },
              typography: {
                title: colorTokens.grey[800],
                subtitle: colorTokens.grey[500],
                paragraph: colorTokens.grey[700],
              },
              icon: colorTokens.grey[600],
              border: colorTokens.grey[200],
              logo: {
                normal: colorTokens.red[600],
                hover: colorTokens.red[800],
              },
            }),
      },
    };
  };