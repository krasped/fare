import { FC, Fragment, ReactNode, SyntheticEvent } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Tab,
  Card,
  Stack,
  styled,
  IconButton,
  SvgIconProps,
  Typography,
} from "@mui/material";
import CameraAlt from "@mui/icons-material/CameraAlt";
import TabList from "@mui/lab/TabList";
// CUSTOM COMPONENTS
import { AvatarBadge } from "@/components/avatar-badge";
import { H6, Paragraph } from "@/components/typography";
import { FlexBetween, FlexBox } from "@/components/flexbox";
// ICON COMPONENTS
import DateRange from "@/icons/DateRange";
import Bratislava from "@/icons/Bratislava";
import MapMarkerIcon from "@/icons/MapMarkerIcon";
// CUSTOM UTILS METHOD
import { AvatarLoading } from "@/components/avatar-loading";

// STYLED COMPONENTS
const ContentWrapper = styled("div")({
  zIndex: 1,
  padding: 24,
  // marginTop: 55,
  position: "relative",
});

const CoverPicWrapper = styled("div")({
  top: 0,
  left: 0,
  height: 125,
  width: "100%",
  overflow: "hidden",
  position: "absolute",
});

const StyledFlexBetween = styled(FlexBetween)({
  margin: "auto",
  flexWrap: "wrap",
});

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
          <Tab disableRipple label="Wallet Management" value="1" />
          <Tab disableRipple label="Invoice Tracking" value="2" />
          <Tab disableRipple label="Refund Approvals" value="3" />
        </StyledTabList>
      </Card>

      {children || <Outlet />}
    </Fragment>
  );
};

export default Layout;

// ============================================================================================
type ListItemProps = {
  title: string;
  Icon: (props: SvgIconProps) => JSX.Element;
};

// ============================================================================================

function ListItem({ title, Icon }: ListItemProps) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Icon sx={{ fontSize: 14, color: "text.secondary" }} />
      <Paragraph color="text.secondary">{title}</Paragraph>
    </FlexBox>
  );
}

