import {
  // Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { ChangeEvent, MouseEvent } from "react";
import { visuallyHidden } from "@mui/utils";
// CUSTOM COMPONENT
import { Span } from "@/components/typography";
// CUSTOM UTILS METHOD
import { isDark } from "@/utils/constants";

// ==============================================================
interface UserTableHeadProps {
  order: "asc" | "desc";
  orderBy: string;
  rowCount: number;
  numSelected: number;
  onSelectAllRows: (event: ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (e: MouseEvent<unknown>, property: string) => void;
}
// ==============================================================

const headCells = [
  { id: "name", numeric: true, disablePadding: false, label: "Name" },
  { id: "createdBy", numeric: true, disablePadding: false, label: "Created By" },
  { id: "platform", numeric: true, disablePadding: false, label: "Platform" },
  { id: "status", numeric: true, disablePadding: false, label: "Status" },
  { id: "createdAt", numeric: true, disablePadding: false, label: "Creation Date" },
  { id: "actions", numeric: true, disablePadding: false, label: "Actions" },
];

const UserTableHead = (props: UserTableHeadProps) => {
  const {
    onSelectAllRows,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler =
    (property: string) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        backgroundColor: (theme) => (isDark(theme) ? "grey.700" : "grey.100"),
      }}
    >
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            size="small"
            color="primary"
            onChange={onSelectAllRows}
            checked={rowCount > 0 && numSelected === rowCount}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell> */}

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={createSortHandler(headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Span sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default UserTableHead;
