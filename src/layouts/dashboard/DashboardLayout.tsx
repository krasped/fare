import { FC, PropsWithChildren } from "react";
import { Theme, useMediaQuery } from "@mui/material";
// CUSTOM COMPONENTS
import MobileSidebar from "./MobileSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import LayoutBodyWrapper from "../layout-parts/LayoutBodyWrapper";
// DASHBOARD LAYOUT BASED CONTEXT PROVIDER
import LayoutProvider from "./context/layoutContext";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return (
    <LayoutProvider>
      {/* CONDITIONALLY RENDER THE SIDEBAR */}
      {downLg ? <MobileSidebar /> : <DashboardSidebar />}

      <LayoutBodyWrapper>
        {/* DASHBOARD HEADER SECTION */}
        <DashboardHeader />

        {/* MAIN CONTENT RENDER SECTION */}
        {children}
      </LayoutBodyWrapper>
    </LayoutProvider>
  );
};

export default DashboardLayout;
