import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8F9FA",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 8px",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "16px",
          border: "none",
          flex: 1,
        },
        head: {
          padding: "6px 8px",
          color: "#8E93A8",
        },
        body: {
          color: "#171F33",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          "&:hover": {
            backgroundColor: "#eef6f2 !important",
          },
          "&:nth-of-type(even)": {
            backgroundColor: "#F8F9FA",
          },
          "&:first-of-type": {
            backgroundColor: "transparent",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          boxSizing: "border-box",
        },
      },
      variants: [
        {
          props: { color: "primary", variant: "contained" },
          style: {},
        },
      ],
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#6FB295",
        },
      },
    },
  },
});
