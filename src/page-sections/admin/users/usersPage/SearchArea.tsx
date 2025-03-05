import { ChangeEvent } from "react";
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

// ==========================================================================================
type SearchAreaProps = {
  // value?: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleChangeFilter: (key: string, value: string) => void;
  filter: { role: string; search: string; agency: string };
};
// ==========================================================================================

const SearchArea = (props: SearchAreaProps) => {
  const ALL_ROLES = [
    { id: 1, name: "All Roles", value: "" },
    { id: 2, name: "Admin", value: Roles.admin },
    { id: 3, name: "Agent", value: Roles.agent },
    { id: 4, name: "Manager", value: Roles.manager },
  ];
  const ALL_AGENCIES = [
    { id: 1, name: "All Agencies", value: "" },
    { id: 2, name: "Top Reality", value: "top reality" },
    { id: 3, name: "Best Homes", value: "best homes" },
  ];
  const { handleChangeFilter, filter } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeColor = (path: string) =>
    pathname === path ? "primary.main" : "grey.400";

  return (
    <FlexBetween gap={1} my={3}>
      {/* SEARCH BOX */}
      <TextField
        fullWidth
        value={filter.search}
        onChange={(e) => handleChangeFilter("search", e.target.value)}
        placeholder="Search..."
        InputProps={{ startAdornment: <Search /> }}
        sx={{ maxWidth: 400, width: "100%" }}
      />

      <TextField
        select
        fullWidth
        label="Roles"
        value={filter.role}
        onChange={(e) => handleChangeFilter("role", e.target.value)}
      >
        {ALL_ROLES.map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        fullWidth
        label="Agencies"
        value={filter.agency}
        onChange={(e) => handleChangeFilter("agency", e.target.value)}
      >
        {ALL_AGENCIES.map(({ id, name, value }) => (
          <MenuItem key={id} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>

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
