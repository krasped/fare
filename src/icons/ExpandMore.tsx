import { SvgIcon, SvgIconProps } from "@mui/material";

const ExpandMore = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 12 7" fill="none" {...props}>
      <path
        d="M11.7451 2.29701L6.56292 6.76889C6.40609 6.93139 6.20153 7.00014 6.00038 7.00014C5.79923 7.00014 5.59535 6.93176 5.43784 6.79507L0.255665 2.29701C-0.0726531 2.00951 -0.0862904 1.53451 0.223618 1.23451C0.534889 0.931387 1.05481 0.922012 1.38074 1.20639L6.00038 5.21576L10.62 1.20326C10.946 0.919075 11.4638 0.929825 11.7771 1.23256C12.086 1.53451 12.0724 2.00951 11.7451 2.29701Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default ExpandMore;
