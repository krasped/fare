import { SvgIcon, SvgIconProps } from "@mui/material";

const Inbox = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 14 13" fill="none" {...props}>
      <path
        d="M12.6875 1C13.1112 1 13.5 1.37058 13.5 1.88462C13.5 2.17315 13.3713 2.43636 13.1642 2.60061L7.21588 7.30701C7.21573 7.30713 7.21558 7.30724 7.21543 7.30736C7.0853 7.4094 6.9147 7.4094 6.78458 7.30736C6.78442 7.30724 6.78427 7.30713 6.78412 7.30701L0.835971 2.60078C0.835862 2.60069 0.835753 2.6006 0.835645 2.60052C0.628784 2.43605 0.5 2.17275 0.5 1.88462C0.5 1.37051 0.888623 1 1.3125 1H12.6875Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <path
        opacity="0.4"
        d="M0.525 3.91531L6.475 8.623C6.78672 8.86819 7.21328 8.86819 7.525 8.623L13.475 3.91531C13.8059 3.65281 14 3.24319 14 2.80762V10.6538C14 11.672 13.2152 12.4999 12.25 12.4999H1.75C0.783399 12.4999 0 11.672 0 10.6538V2.80762C0 3.24319 0.194496 3.65281 0.525 3.91531Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default Inbox;
