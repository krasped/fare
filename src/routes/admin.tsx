import { lazy } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";
import { AuthGuard, RoleBasedGuard } from "@/components/auth";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { Roles } from "@/components/auth/RoleBasedGuard";
import { UrlHelper } from "./constants";

// ALL DASHBOARD PAGES

const Dashboard = Loadable(lazy(() => import("@/pages/admin/dashboard")));
const Users = Loadable(lazy(() => import("@/pages/admin/users")));
const Leads = Loadable(lazy(() => import("@/pages/admin/leads")));
const Analytics = Loadable(lazy(() => import("@/pages/admin/analytics")));
const Billing = Loadable(lazy(() => import("@/pages/admin/billing")));
const Settings = Loadable(lazy(() => import("@/pages/admin/settings")));
const Support = Loadable(lazy(() => import("@/pages/admin/support")));


export const AdminRoutes = [
  {
    path: UrlHelper.admin,
    element: (
      <AuthGuard>
        <DashboardLayout>
          <RoleBasedGuard roles={[Roles.admin]}>
            <Outlet />
          </RoleBasedGuard>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: UrlHelper.users, element: <Users /> },
      { path: UrlHelper.leads,  element: <Leads /> },
      { path: UrlHelper.analytics, element: <Analytics /> },
      { path: UrlHelper.billing, element: <Billing /> },
      { path: UrlHelper.settings, element: <Settings /> },
      { path: UrlHelper.support, element: <Support /> },
    ],
  },
];
