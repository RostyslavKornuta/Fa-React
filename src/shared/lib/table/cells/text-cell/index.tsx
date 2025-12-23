import { Typography } from "@mui/material";

interface CustomTableTextCellProps {
  value: any;
  refactor?: (value: any) => string;
}

export const CustomTableTextCell = ({
  value,
  refactor,
}: CustomTableTextCellProps) => {
  return (
    <Typography sx={{ fontSize: "12px", lineHeight: "16px", color: "#171F33" }}>
      {refactor ? refactor(value) : value}
    </Typography>
  );
};
