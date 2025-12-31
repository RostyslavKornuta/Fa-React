import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface PageTabsProps {
  children: ReactNode;
}

export const PageTabs = ({ children }: PageTabsProps) => {
  return (
    <Box
      sx={{
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        borderBottom: "1px solid #F1F2F4",
      }}
    >
      {children}
    </Box>
  );
};
