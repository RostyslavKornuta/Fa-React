import { Box, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = ({
  title = "No Results",
  description = "Looks like there are no entries here. Adjust your filters or try searching something else.",
  icon = <SearchIcon color="primary" sx={{ width: "32px", height: "32px" }} />,
  action,
}: EmptyStateProps) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          width: "64px",
          height: "64px",
          padding: "16px",
          backgroundColor: "#E2F0EA",
          borderRadius: "100%",
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          maxWidth: "370px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            lineHeight: "28px",
            color: "#111727",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "172%",
            color: "#8E93A8",
            textAlign: "center",
          }}
        >
          {description}
        </Typography>
      </Box>
      {action ?? action}
    </Box>
  );
};
