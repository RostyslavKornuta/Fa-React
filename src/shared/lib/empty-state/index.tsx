import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const EmptyState = () => {
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
        <SearchIcon color="primary" sx={{ width: "32px", height: "32px" }} />
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
          No Results
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            lineHeight: "172%",
            color: "#8E93A8",
            textAlign: "center",
          }}
        >
          Looks like there are no entries here. Adjust your filters or try
          searching something else.
        </Typography>
      </Box>
    </Box>
  );
};
