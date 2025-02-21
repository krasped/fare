import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM DEFINED HOOK
import useAuth from "@/hooks/useAuth";
// CUSTOM COMPONENTS
import ErrorView from "@/page-sections/permission/ErrorView";

export enum Roles {
  admin = "admin",
  agent = "agent",
  subAgent = "subAgent",
  manager = "manager",
  marketing = "marketing",
}

// ==============================================================
interface Props extends PropsWithChildren {
  roles: any[]; //Roles[]
}
// ==============================================================

const RoleBasedGuard = ({ children, roles }: Props) => {
  const { user } = useAuth();

  const loggedInUserRole = user?.role;

  if (loggedInUserRole && roles.includes(loggedInUserRole))
    return <>{children || <Outlet />}</>;

  return <ErrorView />;
};

export default RoleBasedGuard;
