import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  type SxProps,
} from "@mui/material";
import { EmptyState } from "../empty-state";

interface CustomTableProps<D> {
  data: D[];
  columns: CustomTableColumn<D>[];
}

export interface CustomTableColumn<D> {
  title: string;
  key: string;
  styles?: SxProps;
  render?: (row: D) => React.ReactNode;
}

export const CustomTable = <D,>({ data, columns }: CustomTableProps<D>) => {
  return (
    <>
      {data.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column: CustomTableColumn<D>) => (
                  <TableCell key={column.key} sx={column.styles}>
                    {column.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: D, index: number) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:hover": { backgroundColor: "#eef6f2 !important" },
                    "&:nth-of-type(even)": { backgroundColor: "#F8F9FA" },
                  }}
                >
                  {columns.map((column: CustomTableColumn<D>) => (
                    <TableCell key={column.key} sx={column.styles}>
                      {column.render ? column.render(row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <TablePagination
            labelDisplayedRows={() => "1"}
            rowsPerPageOptions={[]}
          /> */}
        </TableContainer>
      ) : (
        <EmptyState />
      )}
    </>
  );
};
