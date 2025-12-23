import { Box } from "@mui/material";

export const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      height: "calc(100vh - 92px)",
      margin: "-64px 20px 0",
      position: "relative",
      borderRadius: "16px",
      background: "#FFFFFF",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </Box>
);
