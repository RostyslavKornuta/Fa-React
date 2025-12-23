import { Box } from "@mui/material";
import type { ContentStatus } from "../../../../models/content";

interface CustomTableStatusCellProps {
  status: ContentStatus;
}

export const CustomTableStatusCell = ({
  status,
}: CustomTableStatusCellProps) => {
  return (
    <Box
      className={`${status}`}
      sx={{
        padding: "3px",
        maxWidth: "16px",
        maxHeight: "16px",
        border: "1px solid #8E93A8",
        borderRadius: "100%",
        "&.PENDING": {
          borderColor: "#E59B20",
        },
        "&.ACTIVE": {
          borderColor: "#287D3C",
        },
      }}
    >
      <Box
        className={`${status}`}
        sx={{
          width: "8px",
          height: "8px",
          backgroundColor: "#8E93A8",
          borderRadius: "inherit",
          "&.PENDING": {
            backgroundColor: "#E59B20",
          },
          "&.ACTIVE": {
            backgroundColor: "#287D3C",
          },
        }}
      ></Box>
    </Box>
  );
};
