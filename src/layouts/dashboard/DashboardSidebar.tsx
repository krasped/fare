import { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
// LAYOUT BASED HOOK
import useLayout from "./context/useLayout";
// CUSTOM COMPONENTS
import { Link } from "@/components/link";
import { Scrollbar } from "@/components/scrollbar";
import { FlexBetween } from "@/components/flexbox";
import MultiLevelMenu from "./MultiLevelMenu";
import UserAccount from "../layout-parts/UserAccount";
// CUSTOM ICON COMPONENT
import ArrowLeftToLine from "@/icons/duotone/ArrowLeftToLine";
// STYLED COMPONENTS
import { SidebarWrapper } from "../layout-parts/styles/sidebar";
import { Roles } from "@/components/auth/RoleBasedGuard";
import useAuth from "@/hooks/useAuth";
import { Palette } from "lucide-react";
import { isDark } from "@/utils/constants";

const TOP_HEADER_AREA = 70;

const DashboardSidebar = () => {
  const { sidebarCompact, handleSidebarCompactToggle } = useLayout();
  const [onHover, setOnHover] = useState(false);
  const { user } = useAuth();
  const theme = useTheme()
  // ACTIVATE COMPACT WHEN TOGGLE BUTTON CLICKED AND NOT ON HOVER STATE
  const COMPACT = sidebarCompact && !onHover ? 1 : 0;

  return (
    <SidebarWrapper
      sx={{
         backgroundColor: isDark(theme)
              ? theme.palette.grey[800]
              : theme.palette.primary[25],
      }}
      compact={sidebarCompact ? 1 : 0}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => sidebarCompact && setOnHover(false)}
    >
      <FlexBetween padding="1.5rem 1rem .5rem 2rem" height={TOP_HEADER_AREA}>
        {/* LOGO */}
        <Link href="/">
          <Box
            component="img"
            src="/static/logo/logo-svg.svg"
            alt="logo"
            width={30}
          />
          
        </Link>
        {!COMPACT ? <Box 
          sx={{
            display: 'flex', 
            alignItems: 'center', 
            height: '100%'
          }} 
          component={"span"}>
            {user?.role == Roles.agent ? "Travel Agency" : 
              (user?.role == Roles.admin ? "Admin Panel": "Marketer CRM")
            }
           
          </Box> : null}
        {/* SIDEBAR COLLAPSE BUTTON */}
        {!COMPACT ? (
          <IconButton onClick={handleSidebarCompactToggle}>
            <ArrowLeftToLine />
          </IconButton>
        ) : null}
      </FlexBetween>

      <Scrollbar
        autoHide
        clickOnTrack={false}
        sx={{
          overflowX: "hidden",
          maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
        }}
      >
        <Box height="100%" px={2}>
          {/* NAVIGATION ITEMS */}
          <MultiLevelMenu sidebarCompact={!!COMPACT} />

          {/* USER ACCOUNT INFO */}
          {/* {!COMPACT ? <UserAccount /> : null} */}
        </Box>
      </Scrollbar>
    </SidebarWrapper>
  );
};

export default DashboardSidebar;
