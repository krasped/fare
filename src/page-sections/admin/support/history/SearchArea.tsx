import { ChangeEvent, useState } from "react";
import { Box, IconButton, MenuItem, TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";
// CUSTOM DEFINED HOOK
import useNavigate from "@/hooks/useNavigate";
import useLocation from "@/hooks/useLocation";
// CUSTOM COMPONENTS
import { FlexBetween } from "@/components/flexbox";
// CUSTOM ICON COMPONENTS
import Apps from "@/icons/Apps";
import FormatBullets from "@/icons/FormatBullets";
import { Roles } from "@/components/auth/RoleBasedGuard";

export type TicketPriority = 'High' | 'Medium' | 'Low';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Rejected';
export type TicketCategory = 'Payment Issue' | 'Technical Issue' | 'Account Access' | 'Feature Request' | 'Other';
export type ResolutionStatus = 'Resolved Successfully' | 'Escalated' | 'Cannot Reproduce' | 'Won\'t Fix';

// ==========================================================================================
type SearchAreaProps = {
  // value?: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChangeFilter: (key: string, value: string) => void;
  filter: { status: string; search: string; priority: string;};
};
// ==========================================================================================

type CurrentFilter = "status"|"priority"|''


const SearchArea = (props: SearchAreaProps) => {
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>("");
  
  const ALL_Filters: {id: number, name: string, value: CurrentFilter}[] = [
    { id: 1, name: "All", value: "" },
    { id: 2, name: "Status", value: "status" },
    { id: 3, name: "Priority", value: "priority" },
  ];
  const filters = {
    status: [
      { id: 1, name: "All", value: "" },
      { id: 2, name: "Open", value: "open" },
      { id: 3, name: "In Progress", value: "inprogress" },
      { id: 4, name: "Resolved", value: "resolved" },
      { id: 5, name: "Rejected", value: "rejected" },
    ],
    priority: [
      { id: 1, name: "All", value: "" },
      { id: 2, name: "High", value: "high" },
      { id: 3, name: "Medium", value: "medium" },
      { id: 4, name: "Low", value: "low" },
    ],
  }
  
  const { handleChangeFilter, filter } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeColor = (path: string) =>
    pathname === path ? "primary.main" : "grey.400";

  const handleSetCurrentFilter = (value: CurrentFilter) => { //need to clear other filters
    setCurrentFilter(value)
    if(value){
      switch(value){
        case "priority":
          handleChangeFilter("status", "")
          break;
        case "status":
          handleChangeFilter("priority", "")
          break;

      }
    } else{
      handleChangeFilter("priority", "")
      handleChangeFilter("status", "")
    }
  }

  return (
    <FlexBetween gap={1} my={3}>
      {/* SEARCH BOX */}
      <TextField
        fullWidth
        value={filter.search}
        onChange={(e) => handleChangeFilter("search", e.target.value)}
        placeholder="Search campaigns..."
        InputProps={{ startAdornment: <Search /> }}
        sx={{ maxWidth: 400, width: "100%" }}
      />

      <TextField
        select
        fullWidth
        label="Select filter type"
        value={currentFilter}
        onChange={(e) => handleSetCurrentFilter(e.target.value as CurrentFilter)}
      >
        {ALL_Filters.map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      {currentFilter && <TextField
        select
        fullWidth
        label={"Select " + currentFilter}
        value={filter?.[currentFilter]}
        onChange={(e) => handleChangeFilter(currentFilter, e.target.value)}
      >
        {filters?.[currentFilter].map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>}

      {/* NAVIGATION BUTTONS */}
      {/* <Box flexShrink={0} className="actions">
        <IconButton onClick={() => navigate(listRoute)}>
          <FormatBullets sx={{ color: activeColor(listRoute) }} />
        </IconButton>

        <IconButton onClick={() => navigate(gridRoute)}>
          <Apps sx={{ color: activeColor(gridRoute) }} />
        </IconButton>
      </Box> */}
    </FlexBetween>
  );
};

export default SearchArea;
