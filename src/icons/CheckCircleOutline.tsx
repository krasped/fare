import { SvgIcon, SvgIconProps } from "@mui/material";

const CheckCircleOutline = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 14 15" fill="none" {...props}>
      <path
        d="M6.43398 9.55898C6.26445 9.73125 5.98555 9.73125 5.81602 9.55898L4.06602 7.80898C3.89375 7.63945 3.89375 7.36055 4.06602 7.19102C4.23555 7.01875 4.51445 7.01875 4.68398 7.19102L6.125 8.63203L9.31602 5.44102C9.48555 5.26875 9.76445 5.26875 9.93398 5.44102C10.1062 5.61055 10.1062 5.88945 9.93398 6.05898L6.43398 9.55898ZM14 7.5C14 11.3664 10.8664 14.5 7 14.5C3.13359 14.5 0 11.3664 0 7.5C0 3.63359 3.13359 0.5 7 0.5C10.8664 0.5 14 3.63359 14 7.5ZM7 1.375C3.61758 1.375 0.875 4.11758 0.875 7.5C0.875 10.8824 3.61758 13.625 7 13.625C10.3824 13.625 13.125 10.8824 13.125 7.5C13.125 4.11758 10.3824 1.375 7 1.375Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default CheckCircleOutline;
