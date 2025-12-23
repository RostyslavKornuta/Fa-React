import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  title?: string;
  description?: string;
}

export const Loader = ({
  title = "Loading",
  description = "This may take a few moments",
}: LoaderProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#FFFFFFE5",
        borderRadius: "16px",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          padding: "48px 64px",
          width: "max-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#F1F2F4",
          borderRadius: "16px",
        }}
      >
        <CircularProgress />
        <Typography
          sx={{
            margin: "16px 0 8px",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "136%",
            textAlign: "center",
            color: "#171F33",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "center",
            color: "#8E93A8",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};
