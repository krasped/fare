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
import { Statuses } from "./page-view";

// ==========================================================================================
type SearchAreaProps = {
  // value?: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChangeFilter: (key: string, value: string) => void;
  filter: { status: string; search: string; platform: string; createdBy: string };
};
// ==========================================================================================

type CurrentFilter = "status"|"platform"|"createdBy"|''


const SearchArea = (props: SearchAreaProps) => {
  const [currentFilter, setCurrentFilter] = useState<CurrentFilter>("");
  
  const ALL_Filters: {id: number, name: string, value: CurrentFilter}[] = [
    { id: 1, name: "All", value: "" },
    { id: 2, name: "Status", value: "status" },
    { id: 3, name: "Platform", value: "platform" },
    { id: 4, name: "Created by", value: "createdBy" },
  ];
  const filters = {
    status: [
      { id: 1, name: "All Roles", value: "" },
      { id: 2, name: "Pending", value: Statuses.pending },
      { id: 3, name: "Active", value: Statuses.active },
      { id: 4, name: "Inactive", value: Statuses.inactive },
    ],
    platform: [
      { id: 1, name: "All Agencies", value: "" },
      { id: 2, name: "Top Reality", value: "top reality" },
      { id: 3, name: "Best Homes", value: "best homes" },
    ],
    createdBy: [
      { id: 1, name: "All", value: "" },
      { id: 2, name: "john.doe@example.com", value: "john.doe@example.com" },
      { id: 3, name: "jane.smith@example.com", value: "jane.smith@example.com" },
      { id: 4, name: "mark.wilson@example.com", value: "mark.wilson@example.com" },
      { id: 5, name: "sarah.parker@example.com", value: "sarah.parker@example.com" },
    ]
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
        case "platform":
          handleChangeFilter("status", "")
          handleChangeFilter("createdBy", "")
          break;
        case "status":
          handleChangeFilter("platform", "")
          handleChangeFilter("createdBy", "")
          break;
        case "createdBy":
          handleChangeFilter("platform", "")
          handleChangeFilter("status", "")
          break;

      }
    } else{
      handleChangeFilter("platform", "")
      handleChangeFilter("status", "")
      handleChangeFilter("createdBy", "")
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
