import { FC, Fragment, ReactNode, SyntheticEvent } from "react";
import { Outlet } from "react-router-dom";
import {
  Tab,
  Card,
  styled,
} from "@mui/material";
import TabList from "@mui/lab/TabList";
// CUSTOM COMPONENTS

const StyledTabList = styled(TabList)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: 16,
  paddingRight: 16,
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": { justifyContent: "center" },
  },
}));

// =======================================================================
type LayoutProps = {
  children: ReactNode;
  handleTabList: (_: SyntheticEvent, value: string) => void;
};
// =======================================================================

const Layout: FC<LayoutProps> = ({ children, handleTabList }) => {
  return (
    <Fragment>
      <Card sx={{ position: "relative", paddingLeft: 3 }}>
        <StyledTabList variant="scrollable" onChange={handleTabList}>
          <Tab disableRipple label="Agent Analytics" value="1" />
          <Tab disableRipple label="Marketing Analytics" value="2" />
        </StyledTabList>
      </Card>

      {children || <Outlet />}
    </Fragment>
  );
};

export default Layout;

