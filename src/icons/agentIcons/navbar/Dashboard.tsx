import { SvgIcon, SvgIconProps } from "@mui/material";

const Dashboard = (props: SvgIconProps) => {
  return (
    <SvgIcon width="38" height="28" viewBox="0 0 38 28" {...props}>
      <rect x="1" y="1" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="1" y="16" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="21" y="1" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="21" y="16" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    </SvgIcon>
  );
};

export default Dashboard;
