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
import { format } from "@/utils/currency";
import { AvatarLoading } from "@/components/avatar-loading";

const agentProfile = {
  name: "John Smith",
  type: "Agency",
  location: "Paris",
  joinDate: "March 15, 2023",
  avatar: "/placeholder.svg",
  summary: "Experienced travel agency with over 10 years in luxury travel planning. Specializing in European destinations and customized tour packages.",
  agents: [
    { name: "Sarah Johnson", role: "Junior Agent", avatar: "/placeholder.svg", location: "Paris" },
    { name: "Mike Wilson", role: "Senior Agent", avatar: "/placeholder.svg", location: "Lyon" },
  ],
  documents: [
    { name: "Bank Account Approval", status: "Verified", date: "2023-04-01" },
    { name: "Company Registration", status: "Verified", date: "2023-03-15" },
    { name: "Insurance Certificate", status: "Pending", date: "2024-03-20" },
  ],
};

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
        < Box sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '2.5rem', lineHeight: 1.2 }}>
            Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your profile information
          </Typography>
        </Box>
      <Card sx={{ position: "relative", paddingTop: 3, paddingLeft: 3 }}>
        {/* <CoverPicWrapper>
          <img
            width="100%"
            height="100%"
            alt="Team Member"
            src="/static/cover/user-cover-pic.png"
            style={{ objectFit: "cover" }}
          />
        </CoverPicWrapper> */}

        <ContentWrapper>
          <FlexBox justifyContent="center">
            <AvatarBadge
              badgeContent={
                <label htmlFor="icon-button-file">
                  <input
                    type="file"
                    accept="image/*"
                    id="icon-button-file"
                    style={{ display: "none" }}
                  />

                  <IconButton aria-label="upload picture" component="span">
                    <CameraAlt
                      sx={{ fontSize: 16, color: "background.paper" }}
                    />
                  </IconButton>
                </label>
              }
            >
              <AvatarLoading
                alt={agentProfile.name}
                borderSize={2}
                percentage={60}
                src={agentProfile.avatar}
                sx={{ width: 100, height: 100 }}
              />
            </AvatarBadge>
          </FlexBox>

          <Box mt={2}>
            <H6 fontSize={18} textAlign="center">
              {agentProfile.name}
            </H6>

            <StyledFlexBetween paddingTop={1} maxWidth={340}>
              <ListItem title={agentProfile.type} Icon={Bratislava} />
              <ListItem title={agentProfile.location} Icon={MapMarkerIcon} />
              <ListItem title={agentProfile.joinDate} Icon={DateRange} />
            </StyledFlexBetween>
          </Box>

          
        </ContentWrapper>

        <StyledTabList variant="scrollable" onChange={handleTabList}>
          <Tab disableRipple label="Overview" value="1" />
          <Tab disableRipple label="Agency" value="2" />
          <Tab disableRipple label="Documents" value="3" />
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

