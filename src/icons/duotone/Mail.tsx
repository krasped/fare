import { SvgIcon, SvgIconProps } from "@mui/material";

const Mail = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 14 12" fill="none" {...props}>
      <path
        d="M0.58333 2.60707C0.615197 2.60707 0.666661 2.63641 0.666661 2.70975V8.33475C0.666661 9.81581 1.8329 11.0446 3.30554 11.0446H11.0833C11.1151 11.0446 11.1666 11.0739 11.1666 11.1472C11.1666 11.2206 11.1151 11.2499 11.0833 11.2499H3.30554C1.7716 11.2499 0.5 9.95999 0.5 8.33475V2.70975C0.5 2.63641 0.551464 2.60707 0.58333 2.60707Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <path
        opacity="0.4"
        d="M2.35002 1.8736L7.69722 5.96679C7.83333 6.06975 7.9986 6.12751 8.16631 6.12751C8.33402 6.12751 8.4993 6.07226 8.63541 5.96679L13.9826 1.8736C13.8732 1.09514 13.2267 0.5 12.4441 0.5H3.88856C3.10592 0.5 2.4594 1.09514 2.35002 1.8736ZM13.9996 2.86049L9.09964 6.60965C8.82985 6.81808 8.50173 6.92857 8.16631 6.92857C7.8309 6.92857 7.50277 6.81808 7.23298 6.60965L2.33301 2.86049V7.73214C2.33301 8.61858 3.03057 9.33928 3.88856 9.33928H12.4441C13.302 9.33928 13.9996 8.61858 13.9996 7.73214V2.86049Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default Mail;
