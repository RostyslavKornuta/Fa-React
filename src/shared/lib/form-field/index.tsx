import { Box, Typography, type SxProps } from "@mui/material";
import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  sx?: SxProps;
}

export const FormField = ({ label, children, sx }: FormFieldProps) => {
  return (
    <Box
      sx={
        sx
          ? { ...sx, display: "flex", gap: "5px" }
          : {
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }
      }
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
          color: "#2B334A",
          flex: 1,
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
};
