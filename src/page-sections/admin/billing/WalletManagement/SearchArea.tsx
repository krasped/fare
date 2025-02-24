import { TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { FlexBetween } from "@/components/flexbox";

// ==========================================================================================
type SearchAreaProps = {
  handleChangeFilter: (key: string, value: string) => void;
  filter: { status: string; search: string; platform: string; createdBy: string };
};
// ==========================================================================================

const SearchArea = (props: SearchAreaProps) => {
  const { handleChangeFilter, filter } = props;

  return (
    <FlexBetween gap={1} my={3}>
      <TextField
        fullWidth
        value={filter.search}
        onChange={(e) => handleChangeFilter("search", e.target.value)}
        placeholder="Search by agent name..."
        InputProps={{ startAdornment: <Search /> }}
        sx={{ maxWidth: 400, width: "100%" }}
      />
    </FlexBetween>
  );
};

export default SearchArea;
