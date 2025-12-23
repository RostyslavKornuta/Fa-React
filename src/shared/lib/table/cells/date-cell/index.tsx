import { format as formatDateFns, parseISO } from "date-fns";

interface CustomTableDateCellProps {
  value: string;
  formatType?: string;
}

export const CustomTableDateCell = ({
  value,
  formatType,
}: CustomTableDateCellProps) => {
  const formatDate = () => {
    const parsedDate = parseISO(value);

    return formatDateFns(parsedDate, formatType || "MM/dd/yyyy HH:mm");
  };

  return <>{formatDate()}</>;
};
