import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Loadable from "./Loadable";

import { AuthRoutes } from "./auth";
import { PublicRoutes } from "./public";
import { DashboardRoutes } from "./dashboard";
import { AgentRoutes } from "./agent";
import { ComponentRoutes } from "./components";
import { AdminRoutes } from "./admin";
import { Roles } from "@/components/auth/RoleBasedGuard";
import useAuth from "@/hooks/useAuth";

// GLOBAL ERROR PAGE
const ErrorPage = Loadable(lazy(() => import("@/pages/404")));
// LANDING / INITIAL PAGE
const Landing = Loadable(lazy(() => import("@/pages/landing")));

const RoleRedirect = () => {
  const {user} = useAuth()

  console.log(user?.role);
  switch (user?.role) {
    case Roles.admin:
      return <Navigate to="/admin" />;
    case Roles.agent:
      return <Navigate to="/agent" />;
    default:
      return <Landing />;
  }
};

export const routes = (): RouteObject[] => {
  return [
    // INITIAL / INDEX PAGE
    { path: "/", element: <RoleRedirect /> },

    // GLOBAL ERROR PAGE
    { path: "*", element: <ErrorPage /> },

    // AUTHENTICATION PAGES ROUTES & DIFFERENT AUTH DEMO PAGES ROUTES
    ...AuthRoutes,

    // COMPONENTS PAGES ROUTES
    ...ComponentRoutes,

    // INSIDE DASHBOARD PAGES ROUTES
    ...DashboardRoutes,

    // INSIDE AGENT PAGES ROUTES
    ...AgentRoutes,

    // INSIDE AGENT PAGES ROUTES
    ...AdminRoutes,

    // PAGES ROUTES
    ...PublicRoutes,
  ];
};
