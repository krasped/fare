import { MenuItem, TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";
// CUSTOM DEFINED HOOK

// CUSTOM COMPONENTS
import { FlexBetween } from "@/components/flexbox";
// CUSTOM ICON COMPONENTS

import { Statuses } from "./index";

// ==========================================================================================
type SearchAreaProps = {
  // value?: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChangeFilter: (key: string, value: string) => void;
  filter: { status: string; search: string; platform: string; createdBy: string };
};
// ==========================================================================================

const SearchArea = (props: SearchAreaProps) => {

  const filters = {
    status: [
      { id: 1, name: "All Statuses", value: "" },
      { id: 2, name: "Paid", value: Statuses.Paid },
      { id: 3, name: "Overdue", value: Statuses.Overdue },
      { id: 4, name: "Unpaid", value: Statuses.Unpaid },
    ],
  }
  
  const {handleChangeFilter, filter } = props;

  return (
    <FlexBetween gap={1} my={3}>
      {/* SEARCH BOX */}
      <TextField
        fullWidth
        value={filter.search}
        onChange={(e) => handleChangeFilter("search", e.target.value)}
        placeholder="Search invoices..."
        InputProps={{ startAdornment: <Search /> }}
        sx={{ maxWidth: 400, width: "100%" }}
      />

      <TextField
        select
        fullWidth
        label="Select status"
        value={filter.status}
        onChange={(e) => handleChangeFilter("status", e.target.value)}
      >
        {filters.status.map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </FlexBetween>
  );
};

export default SearchArea;
